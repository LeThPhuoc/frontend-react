/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import api from '../../config_api/axiosConfig';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Alert } from '../../components/Alert';

type Props = {
    handleCreateStaff: (payload: User) => void
    resetFormik: boolean
}

const listFieldRegister: {
    label: string,
    name: keyof User,
    type: string,
    placeholder: string
}[] = [
        { label: 'Tên đăng nhập', name: 'login_name', type: 'text', placeholder: 'Tên đăng nhập' },
        { label: 'Tên đầy đủ', name: 'name', type: 'text', placeholder: 'Tên đầy đủ' },
        { label: 'Số điện thoại', name: 'tel', type: 'text', placeholder: 'Số điện thoại' },
        { label: 'Địa chỉ', name: 'address', type: 'text', placeholder: 'Địa chỉ' },
        { label: 'Lương', name: 'salary', type: 'text', placeholder: 'Lương' },
        { label: 'Email', name: 'email', type: 'text', placeholder: 'Email' },
        { label: 'Mật khẩu', name: 'password', type: 'password', placeholder: 'Mật khẩu' },
    ]

type User = {
    login_name: string,
    password: string,
    name: string,
    tel: string,
    address: string,
    email: string,
    salary: string,
}

const validationSchemaRegister = Yup.object({
    login_name: Yup.string().required('Bạn chưa nhập tên đăng nhập'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
    name: Yup.string().required('Bạn chưa nhập tên đầy đủ'),
    tel: Yup.string().required('Bạn chưa nhập số điện thoại').min(10, 'Số điện thoại tối thiểu 10 số').max(11, 'Số điện thoại tối đa 11 số'),
    address: Yup.string().required('Bạn chưa nhập địa chỉ'),
    email: Yup.string().required('Bạn chưa nhập địa chỉ email').email('Email không hợp lệ'),
});

export const CreateStaff = ({handleCreateStaff, resetFormik}:Props) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [statusAlert, setStatusAlert] = useState<{ message: string[] | unknown[], type: 'error' | 'success' } | null>();

    const formik = useFormik<User>({
        initialValues: {
            login_name: '',
            password: '',
            name: '',
            tel: '',
            address: '',
            email: '',
            salary: ''
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: validationSchemaRegister,
        onSubmit: async values => {
            handleCreateStaff(values)
            // await api.post('/store', {
            //     login_name: values.login_name,
            //     name: values.name,
            //     tel: values.tel,
            //     address: values.address,
            //     email: values.email,
            //     password: values.password
            // }).then((response) => {
            //     setStatusAlert({ message: ['Đăng kí thành công'], type: 'success' });

            // }).catch((error) => {
            //     console.log(error)
            //     setStatusAlert({ message: (error.response.data.errors ? Object.values(error.response.data.errors).flat() : error.response.data.message), type: 'error' });
            // })

        }
    })

    console.log(resetFormik)
    useEffect(() => {
    if(resetFormik) {
        formik.resetForm()
    }

        
    }, [resetFormik])

    useEffect(() => {
        if (statusAlert) {
            const timer = setTimeout(() => {
                setStatusAlert(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [statusAlert])

    return (
        <div css={container}>
            {statusAlert && (
                statusAlert.message.length > 0 && (
                    <Alert type={statusAlert.type} message={statusAlert.message} />
                )
            )}
            <div css={content}>
                <h2>Thông tin đăng kí</h2>
                {listFieldRegister.map((item, index) => {
                    return (
                        <div css={field} key={index}>
                            <label htmlFor={item.name}>{item.label}</label>
                            <input
                                id={item.name}
                                css={fieldInput}
                                type={(item.name === 'password' ? (isShowPassword ? "text" : "password") : item.type)}
                                placeholder={item.placeholder}
                                value={formik.values[item.name as keyof User]}
                                onChange={(e) => formik.setFieldValue(item.name, e.target.value )}
                            />
                            {formik.errors[item.name as keyof User] && <div style={{ color: 'red', fontSize: '13px' }}>{formik.errors[item.name as keyof User]}</div>}
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
                    Tạo nhân viên
                </button>
            </div>
        </div>
    )
}

const container = css`
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;;
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