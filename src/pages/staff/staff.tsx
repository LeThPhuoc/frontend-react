/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import api from "../../config_api/axiosConfig";

type ListStaff = {
    id: number;
    name: string;
    email: string;
    tel: string;
    login_name: string;
    salary: string;
    address: string;
}

export const Staff = () => {

    const [listStaff, setListStaff] = useState<ListStaff[]>([])

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
                    <button>Thêm nhân viên</button>
                </div>
            </div>
            <table css={listStaffStyle}>
                <thead>
                    <tr>
                        <td>Tên</td>
                        <td>Tên đăng nhập</td>
                        <td>Số điện thoại</td>
                        <td>Email</td>
                        <td>Lương</td>
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
                                    <td>{staff.salary}</td>
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