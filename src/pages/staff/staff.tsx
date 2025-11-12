/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import api from "../../config_api/axiosConfig";
import { CreateStaff } from "./createStaff";
import { useAlert } from "../../components/Alert/AlertProvider";

type ListStaff = {
    id: number;
    name: string;
    email: string;
    tel: string;
    login_name: string;
    role: string;
    address: string;
}

export const Staff = () => {
    const { showAlert } = useAlert()
    const [listStaff, setListStaff] = useState<ListStaff[]>([])
    const [isOpenCreateStaff, setIsOpenCreateStaff] = useState(false)
    const [isResetFormikRegister, setIsResetFormikRegister] = useState(false)

    const handleCreateStaff = async (payload: any) => {
        let data = null
        if (payload) {
            data = payload
            await api.post('/create_staff', {
                login_name: data.login_name,
                name: data.name,
                tel: data.tel,
                address: data.address,
                email: data.email,
                password: data.password,
                role: data.role
            }).then((response) => {
                showAlert('Tạo mới nhân viên thành công', 'success')
                setIsResetFormikRegister(true)
            }).catch((error) => {
                console.log(error)
                showAlert(error.response.data.message[0] ?? '', 'error')
                setIsResetFormikRegister(false)

            })
        }
    }

    useEffect(() => {
        if (isResetFormikRegister) {
            const timer = setTimeout(() => {
                setIsResetFormikRegister(!isResetFormikRegister);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [isResetFormikRegister])

    useEffect(() => {
        const getItems = async () => {
            await api.get('/get_list_staff').then((response) => {
                setListStaff(response.data.staffs)
            }).catch((error) => {
                console.log(error);
            })
        }
        getItems();
    }, [])

    return (
        <div css={container}>
            <div css={header}>
                <h3>Danh sách nhân viên</h3>
                <div css={toolbar}>
                    <div css={findTool}>
                        <label htmlFor="">Tìm kiếm nhân viên</label>
                        <input type="text" placeholder="Nhập để tìm kiếm..." />
                    </div>
                    <button onClick={() => setIsOpenCreateStaff(!isOpenCreateStaff)}>Thêm nhân viên</button>
                </div>
            </div>
            {isOpenCreateStaff && <CreateStaff
                isOpen={isOpenCreateStaff}
                onClose={() => setIsOpenCreateStaff(false)}
                resetFormik={isResetFormikRegister}
                handleCreateStaff={(payload) => handleCreateStaff(payload)}
            />}
            <table css={listStaffStyle}>
                <thead>
                    <tr>
                        <td>Tên</td>
                        <td>Tên đăng nhập</td>
                        <td>Số điện thoại</td>
                        <td>Email</td>
                        <td>vị trí</td>
                        <td>Địa chỉ</td>
                    </tr>
                </thead>
                <tbody>
                    {listStaff.length !== 0 &&
                        listStaff.map((staff) => {
                            return (
                                <tr key={staff.id} css={itemStaffStyle}>
                                    <td>{staff.name}</td>
                                    <td>{staff.login_name}</td>
                                    <td>{staff.tel}</td>
                                    <td>{staff.email}</td>
                                    <td>{staff.role}</td>
                                    <td>{staff.address}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const container = css`
    padding: 20px;
    height: calc(100% - 40px);
`

const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const toolbar = css`
    display: flex;
    gap: 10px;
`

const findTool = css`
    display: flex;
    align-items: center;
    gap: 5px;
    label {
        font-weight: 500;
        font-size: 18px;
    }
    input {
        outline: none;
        font-size: 14px;
        padding: 6px 10px;
    }
`

const listStaffStyle = css`
width: 100%;
    thead > tr > td {
        color: white;
        background-color: #73749d;
        padding: 5px 20px;
    }
    tbody > tr > td {
        padding: 5px 20px;
        border: 1px solid;
    }
`

const itemStaffStyle = css`


`