/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import api from '../../config_api/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '../../components/Alert';

const listFieldRegister: {
    label: string,
    name: keyof Formik,
    type: string,
    placeholder: string
}[] = [
        { label: 'Tên đăng nhập', name: 'login_name', type: 'text', placeholder: 'Tên đăng nhập' },
        { label: 'Tên đầy đủ', name: 'name', type: 'text', placeholder: 'Tên đầy đủ' },
        { label: 'Số điện thoại', name: 'tel', type: 'text', placeholder: 'Số điện thoại' },
        { label: 'Địa chỉ', name: 'address', type: 'text', placeholder: 'Địa chỉ' },
        { label: 'Email', name: 'email', type: 'text', placeholder: 'Email' },
        { label: 'Mật khẩu', name: 'password', type: 'password', placeholder: 'Mật khẩu' },
        { label: 'Quản trị viên', name: 'is_admin', type: 'checkbox', placeholder: 'Quản trị viên' },
    ]

const listFieldLogin: {
    label: string,
    name: keyof Formik,
    type: string,
    placeholder: string
}[] = [
        { label: 'Tên đăng nhập', name: 'login_name', type: 'text', placeholder: 'Tên đăng nhập' },
        { label: 'Mật khẩu', name: 'password', type: 'password', placeholder: 'Mật khẩu' }
    ]

type Formik = {
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

export const Login = () => {
    const [formType, setFormType] = useState<'login' | 'register'>('login');
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ message: string[] | unknown[], type: 'error' | 'success' } | null>();

    const formik = useFormik<Formik>({
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
            if (formType === 'login') {
                await api.post('/login', {
                    login_name: values.login_name,
                    password: values.password
                }).then((response) => {
                    localStorage.setItem('token', response.data.token);
                    setStatusAlert({ message: ['Đăng nhập thành công'], type: 'success' });

                }).catch((error) => {
                    setStatusAlert({ message: Object.values(error.response.data.errors).flat(), type: 'error' });
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
                    setStatusAlert({ message: ['Đăng kí thành công'], type: 'success' });

                }).catch((error) => {
                    setStatusAlert({ message: Object.values(error.response.data.errors).flat(), type: 'error' });
                })
            }
        }
    })

    useEffect(() => {
        if (statusAlert) {
            const timer = setTimeout(() => {
                setStatusAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusAlert])

    useEffect(() => {
        if (formType) {
            formik.setValues({
                login_name: '', password: '', name: '', tel: '', address: '', email: '', is_admin: '0'
            })
            formik.setErrors({});
            setStatusAlert(null);
        }
    }, [formType])

    return (
        <div css={container}>
            {statusAlert && (
                statusAlert.message.length > 0 && (
                    <Alert type={statusAlert.type} message={statusAlert.message} />
                )
            )}
            <div css={content}>
                <h2>{formType === 'login' ? 'Thông tin đăng nhập' : 'Thông tin đăng kí'}</h2>
                {(formType === 'login' ? listFieldLogin : listFieldRegister).map((item, index) => {
                    return (
                        <div css={item.name === 'is_admin' ? fieldCheckbox : field} key={index}>
                            <label htmlFor={item.name}>{item.label}</label>
                            <input
                                id={item.name}
                                css={fieldInput}
                                type={item.name === 'is_admin' ? 'checkbox' : (item.name === 'password' ? (isShowPassword ? "text" : "password") : item.type)}
                                placeholder={item.placeholder}
                                value={formik.values[item.name as keyof Formik]}
                                onChange={(e) => formik.setFieldValue(item.name, item.name !== 'is_admin' ? e.target.value : e.target.checked ? '1' : '0')}
                            />
                            {formik.errors[item.name as keyof Formik] && <div style={{ color: 'red', fontSize: '13px' }}>{formik.errors[item.name as keyof Formik]}</div>}
                        </div>
                    )

                })}

                <div>
                    <input id='showPassword' type="checkbox" checked={isShowPassword} onChange={() => setIsShowPassword(!isShowPassword)} />
                    <label htmlFor='showPassword'>Hiển thị mật khẩu</label>
                </div>

                <button
                    css={submitBtn}
                    onClick={() => formik.submitForm()}
                >
                    {formType === 'register' ? 'Đăng ký' : 'Đăng nhập'}
                </button>

                <div>
                    {formType === 'login' ? 'Bạn chưa có tài khoản?' : 'Bạn đã có tài khoản?'}
                    <span
                        style={{ color: 'blue', cursor: 'pointer' }}
                        onClick={() => setFormType(formType === 'login' ? 'register' : 'login')}
                    >
                        {formType === 'login' ? 'Đăng kí' : 'Đăng nhập'}
                    </span>
                </div>
            </div>
        </div>
    )
}

const container = css`
    display: flex;
    height: 100vh;
    align-items: center;
    flex-direction: column;
    justify-content: center;
`

const content = css`
    width: 100%;
    display: flex;
    padding: 30px;
    max-width: 460px;
    border-radius: 20px;
    flex-direction: column;
    justify-content: center;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
`

const field = css`
    gap: 5px;
    display: flex;
    margin-bottom: 8px;
    flex-direction: column;
    label {
        font-weight: 500;
        font-size: 17px;
    }
`

const submitBtn = css`
    margin-top: 10px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    &:hover {
        background-color: #00adff;
        color: white;
    }
    transition: all .3s;
`

const fieldInput = css`
    padding: 10px;
    outline: none;
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #ccc;
`

const fieldCheckbox = css`
    gap: 5px;
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    label {
        font-weight: 500;
        font-size: 17px;
    }
    input[type="checkbox"]{
        margin:0px;
        height: 15px;
        width: 15px;
    }
`