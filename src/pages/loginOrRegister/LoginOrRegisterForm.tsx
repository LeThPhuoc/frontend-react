/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css, keyframes } from '@emotion/react';
import api from '../../config_api/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/redux/authSlide'
import { useAlert } from '../../components/Alert/AlertProvider';
import { onlyNumber } from '../../hooks/onlyNumber';

// ─── Icons (inline SVG) ──────────────────────────────────────────────────────
const UserIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const LockIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

const MailIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);

const PhoneIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
);

const MapPinIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const EyeIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const EyeOffIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
        <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
);

const BuildingIcon = () => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
        <path d="M9 22v-4h6v4" />
        <path d="M8 6h.01M16 6h.01M12 6h.01M8 10h.01M16 10h.01M12 10h.01M8 14h.01M16 14h.01M12 14h.01" />
    </svg>
);

// ─── Field config with icons ─────────────────────────────────────────────────
const fieldIcons: Record<string, React.ReactNode> = {
    login_name: <UserIcon />,
    password: <LockIcon />,
    name: <UserIcon />,
    tel: <PhoneIcon />,
    address: <MapPinIcon />,
    email: <MailIcon />,
};

const listFieldRegister: {
    label: string,
    name: keyof FormikValues,
    type: string,
    placeholder: string
}[] = [
        { label: 'Tên đăng nhập', name: 'login_name', type: 'text', placeholder: 'Nhập tên đăng nhập' },
        { label: 'Tên đầy đủ', name: 'name', type: 'text', placeholder: 'Nhập họ và tên' },
        { label: 'Số điện thoại', name: 'tel', type: 'number', placeholder: 'Nhập số điện thoại' },
        { label: 'Địa chỉ', name: 'address', type: 'text', placeholder: 'Nhập địa chỉ' },
        { label: 'Email', name: 'email', type: 'text', placeholder: 'Nhập email' },
        { label: 'Mật khẩu', name: 'password', type: 'password', placeholder: 'Nhập mật khẩu' },
    ]

const listFieldLogin: {
    label: string,
    name: keyof FormikValues,
    type: string,
    placeholder: string
}[] = [
        { label: 'Tên đăng nhập', name: 'login_name', type: 'text', placeholder: 'Nhập tên đăng nhập' },
        { label: 'Mật khẩu', name: 'password', type: 'password', placeholder: 'Nhập mật khẩu' }
    ]

type FormikValues = {
    login_name: string,
    password: string,
    name: string,
    tel: string,
    address: string,
    email: string,
    is_admin: string
}

const validationSchemaLogin = Yup.object({
    login_name: Yup.string().required('Bạn chưa nhập tên đăng nhập'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
});

const validationSchemaRegister = Yup.object({
    login_name: Yup.string().required('Bạn chưa nhập tên đăng nhập'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
    name: Yup.string().required('Bạn chưa nhập tên đầy đủ'),
    tel: Yup.string().required('Bạn chưa nhập số điện thoại').min(10, 'Số điện thoại tối thiểu 10 số').max(11, 'Số điện thoại tối đa 11 số'),
    address: Yup.string().required('Bạn chưa nhập địa chỉ'),
    email: Yup.string().required('Bạn chưa nhập địa chỉ email').email('Email không hợp lệ'),
    is_admin: Yup.string().nullable(),
});

export const LoginOrRegister = () => {
    const { showAlert } = useAlert()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik<FormikValues>({
        initialValues: {
            login_name: '',
            password: '',
            name: '',
            tel: '',
            address: '',
            email: '',
            is_admin: '0'
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: formType === 'login' ? validationSchemaLogin : validationSchemaRegister,
        onSubmit: async values => {
            setIsLoading(true);
            if (formType === 'login') {
                await api.post('/login', {
                    login_name: values.login_name,
                    password: values.password
                }).then((response) => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('role', response.data.role);
                    dispatch(loginSuccess(response.data))
                    showAlert('Đăng nhập thành công', 'success');
                    navigate('/', { state: response.data.token });
                }).catch((error) => {
                    showAlert(error.response.data.message, 'error');
                })
            } else {
                await api.post('/store', {
                    login_name: values.login_name,
                    name: values.name,
                    tel: values.tel,
                    address: values.address,
                    email: values.email,
                    is_admin: values.is_admin,
                    password: values.password
                }).then((response) => {
                    showAlert('Đăng kí thành công', 'success');
                    setFormType('login')

                }).catch((error) => {
                    console.log(error)
                    showAlert(error.response.data.message, 'error');
                })
            }
            setIsLoading(false);
        }
    })

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (formType) {
            formik.setValues({
                login_name: '', password: '', name: '', tel: '', address: '', email: '', is_admin: '0'
            })
            formik.setErrors({});
        }
    }, [formType])

    const currentFields = formType === 'login' ? listFieldLogin : listFieldRegister;

    return (
        <div css={pageWrapper}>
            {/* Animated background shapes */}
            <div css={bgShape1} />
            <div css={bgShape2} />
            <div css={bgShape3} />

            <div css={[cardStyle, formType === 'register' && cardRegisterStyle]} key={formType}>
                {/* Header */}
                <div css={headerSection}>
                    <div css={logoContainer}>
                        <BuildingIcon />
                    </div>
                    <h1 css={titleStyle}>
                        {formType === 'login' ? 'Chào mừng trở lại' : 'Tạo tài khoản mới'}
                    </h1>
                    <p css={subtitleStyle}>
                        {formType === 'login'
                            ? 'Đăng nhập để tiếp tục quản lý dự án'
                            : 'Đăng ký để bắt đầu sử dụng hệ thống'}
                    </p>
                </div>

                {/* Form fields */}
                <div css={formSection}>
                    {currentFields.map((item, index) => (
                        <div css={fieldGroupStyle} key={`${formType}-${item.name}`}
                            style={{ animationDelay: `${index * 0.06}s` }}
                        >
                            <label css={labelStyle}>{item.label}</label>
                            <div css={[
                                inputWrapperStyle,
                                formik.errors[item.name] && inputWrapperErrorStyle
                            ]}>
                                <span css={inputIconStyle}>
                                    {fieldIcons[item.name]}
                                </span>
                                <input
                                    css={inputStyle}
                                    placeholder={item.placeholder}
                                    value={formik.values[item.name as keyof FormikValues]}
                                    type={item.name === 'password' ? (isShowPassword ? 'text' : 'password') : item.type}
                                    onChange={(e) =>
                                        formik.setFieldValue(item.name,
                                            item.type == 'number' ? onlyNumber(e.target.value) : e.target.value)
                                    }
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') formik.submitForm();
                                    }}
                                />
                                {item.name === 'password' && (
                                    <span
                                        css={eyeToggleStyle}
                                        onClick={() => setIsShowPassword(!isShowPassword)}
                                    >
                                        {isShowPassword ? <EyeOffIcon /> : <EyeIcon />}
                                    </span>
                                )}
                            </div>
                            {formik.errors[item.name] && (
                                <span css={errorStyle}>{formik.errors[item.name]}</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Submit button */}
                <button
                    css={submitBtnStyle}
                    onClick={() => formik.submitForm()}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <span css={spinnerStyle} />
                    ) : (
                        formType === 'register' ? 'Đăng ký' : 'Đăng nhập'
                    )}
                </button>

                {/* Footer toggle */}
                <div css={footerStyle}>
                    <span css={footerTextStyle}>
                        {formType === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                    </span>
                    <span
                        css={footerLinkStyle}
                        onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
                    >
                        {formType === 'login' ? 'Đăng ký ngay' : 'Đăng nhập'}
                    </span>
                </div>
            </div>
        </div>
    )
}

// ─── Animations ──────────────────────────────────────────────────────────────
const fadeInUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const floatAnimation = keyframes`
    0%, 100% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(30px, -30px) rotate(5deg); }
    50% { transform: translate(-20px, 20px) rotate(-5deg); }
    75% { transform: translate(20px, 10px) rotate(3deg); }
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

// ─── Styles ──────────────────────────────────────────────────────────────────

const pageWrapper = css`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%);
    position: relative;
    overflow: hidden;
    padding: 20px;
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
`;

const bgShape1 = css`
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    animation: ${floatAnimation} 20s ease-in-out infinite;
`;

const bgShape2 = css`
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
    bottom: -50px;
    left: -50px;
    animation: ${floatAnimation} 25s ease-in-out infinite reverse;
`;

const bgShape3 = css`
    position: absolute;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: ${floatAnimation} 18s ease-in-out infinite;
`;

const cardStyle = css`
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 440px;
    background: rgba(30, 41, 59, 0.8);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(148, 163, 184, 0.1);
    border-radius: 24px;
    padding: 40px 36px;
    box-shadow:
        0 25px 50px rgba(0, 0, 0, 0.4),
        0 0 0 1px rgba(148, 163, 184, 0.05),
        inset 0 1px 0 rgba(255, 255, 255, 0.05);
    animation: ${fadeInUp} 0.6s ease-out;
    transition: max-height 0.3s ease;
`;

const cardRegisterStyle = css`
    max-width: 480px;
`;

const headerSection = css`
    text-align: center;
    margin-bottom: 32px;
`;

const logoContainer = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 56px;
    height: 56px;
    border-radius: 16px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    margin-bottom: 16px;
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
`;

const titleStyle = css`
    font-size: 24px;
    font-weight: 700;
    color: #f1f5f9;
    margin: 0 0 6px 0;
    letter-spacing: -0.02em;
`;

const subtitleStyle = css`
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
    font-weight: 400;
`;

const formSection = css`
    display: flex;
    flex-direction: column;
    gap: 18px;
    margin-bottom: 24px;
`;

const fieldGroupStyle = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    animation: ${fadeInUp} 0.4s ease-out both;
`;

const labelStyle = css`
    font-size: 13px;
    font-weight: 600;
    color: #cbd5e1;
    letter-spacing: 0.02em;
    text-transform: uppercase;
`;

const inputWrapperStyle = css`
    display: flex;
    align-items: center;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(148, 163, 184, 0.15);
    border-radius: 12px;
    padding: 0 14px;
    transition: all 0.25s ease;
    &:focus-within {
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        background: rgba(15, 23, 42, 0.8);
    }
`;

const inputWrapperErrorStyle = css`
    border-color: #ef4444;
    &:focus-within {
        border-color: #ef4444;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
    }
`;

const inputIconStyle = css`
    display: flex;
    align-items: center;
    color: #64748b;
    margin-right: 10px;
    flex-shrink: 0;
`;

const inputStyle = css`
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    padding: 13px 0;
    font-size: 15px;
    color: #f1f5f9;
    font-family: inherit;
    &::placeholder {
        color: #475569;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus {
        -webkit-text-fill-color: #f1f5f9;
        -webkit-box-shadow: 0 0 0px 1000px rgba(15, 23, 42, 0.8) inset;
        transition: background-color 5000s ease-in-out 0s;
    }
`;

const eyeToggleStyle = css`
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #64748b;
    padding: 4px;
    border-radius: 6px;
    transition: all 0.2s ease;
    &:hover {
        color: #94a3b8;
        background: rgba(148, 163, 184, 0.1);
    }
`;

const errorStyle = css`
    font-size: 12px;
    color: #f87171;
    font-weight: 500;
    padding-left: 2px;
`;

const submitBtnStyle = css`
    width: 100%;
    padding: 14px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, #3b82f6, #6366f1);
    color: white;
    font-size: 15px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    letter-spacing: 0.02em;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    margin-bottom: 20px;
    &:hover:not(:disabled) {
        transform: translateY(-1px);
        box-shadow: 0 8px 25px rgba(59, 130, 246, 0.35);
        background: linear-gradient(135deg, #2563eb, #4f46e5);
    }
    &:active:not(:disabled) {
        transform: translateY(0);
    }
    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`;

const spinnerStyle = css`
    width: 22px;
    height: 22px;
    border: 2.5px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: ${spin} 0.7s linear infinite;
`;

const footerStyle = css`
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
`;

const footerTextStyle = css`
    font-size: 14px;
    color: #94a3b8;
`;

const footerLinkStyle = css`
    font-size: 14px;
    font-weight: 600;
    color: #60a5fa;
    cursor: pointer;
    transition: color 0.2s ease;
    &:hover {
        color: #93bbfc;
        text-decoration: underline;
    }
`;