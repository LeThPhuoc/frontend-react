/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { TextField } from '../../components/input/TextField';
import { Modal } from '../../components/modal/modal';
import { createStaffApi } from '../../api/staff/createStaffApi';
import { useAlert } from '../../components/Alert/AlertProvider';
import { Button } from '../../components/Button/button';
import { Loading } from '../../components/Loading';

type Props = {
    isOpen: boolean
    onClose: () => void
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
}

const validationSchemaRegister = Yup.object({
    login_name: Yup.string().required('Bạn chưa nhập tên đăng nhập'),
    password: Yup.string().required('Bạn chưa nhập mật khẩu'),
    name: Yup.string().required('Bạn chưa nhập tên đầy đủ'),
    tel: Yup.string().required('Bạn chưa nhập số điện thoại').min(10, 'Số điện thoại tối thiểu 10 số').max(11, 'Số điện thoại tối đa 11 số'),
    address: Yup.string().required('Bạn chưa nhập địa chỉ'),
    email: Yup.string().required('Bạn chưa nhập địa chỉ email').email('Email không hợp lệ'),
});

export const CreateStaff = ({ isOpen, onClose }: Props) => {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const { showAlert } = useAlert()

    const formik = useFormik<User>({
        initialValues: {
            login_name: '',
            password: '',
            name: '',
            tel: '',
            address: '',
            email: '',
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema: validationSchemaRegister,
        onSubmit: async values => {
            setIsLoading(true)
            await createStaffApi({
                data: values, success: (response) => {
                    showAlert('Tạo mới nhân viên thành công', 'success')
                    onClose && onClose()
                }, failure: (error) => {
                    console.log(error)
                    showAlert(error.response.data.message[0] ?? '', 'error')
                }
            })
            setIsLoading(false)
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} title='Thông tin đăng kí'>
            {isLoading && <Loading />}
            <div css={container}>
                <div css={content}>
                    {listFieldRegister.map((item, index) => {
                        return (
                            <div css={field} key={index}>
                                <label htmlFor={item.name}>{item.label}</label>
                                <TextField
                                    isFullWidth
                                    placeholder={item.placeholder}
                                    value={formik.values[item.name]}
                                    type={item.name === 'password' ? (isShowPassword ? 'text' : 'password') : item.type}
                                    onChange={(text) => formik.setFieldValue(item.name, text.target.value)}
                                />
                                {formik.errors[item.name as keyof User] && <div style={{ color: 'red', fontSize: '13px' }}>{formik.errors[item.name as keyof User]}</div>}
                            </div>
                        )

                    })}

                    <div css={fieldCheckbox}>
                        <input id='showPassword' type="checkbox" checked={isShowPassword} onChange={() => setIsShowPassword(!isShowPassword)} />
                        <label htmlFor='showPassword'>Hiển thị mật khẩu</label>
                    </div>

                    <Button
                        isFullWidth
                        css={submitBtn}
                        onClick={() => formik.submitForm()}
                    >
                        Tạo nhân viên
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

const container = css`
`

const content = css`
    padding: 0px 20px;
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
    width: 100%;
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