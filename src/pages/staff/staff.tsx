/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import api from "../../config_api/axiosConfig";
import { CreateStaff } from "./createStaff";
import { getListStaffApi, Staff as StaffType } from "../../api/staff/getListStaffApi";
import { Button } from "../../components/Button/button";
import { TextField } from "../../components/input/TextField";

export const Staff = () => {
    const [listStaff, setListStaff] = useState<StaffType[]>([])
    const [isOpenCreateStaff, setIsOpenCreateStaff] = useState(false)
    const [isReload, setIsReLoad] = useState(false)

    useEffect(() => {
            getListStaffApi({
                success: (data) => {
                    setListStaff(data)
                }
            })
    }, [])

    return (
        <div css={container}>
            <div css={header}>
                <h3>Danh sách nhân viên</h3>
                <div css={toolbar}>
                    <TextField
                        positionLabel="left"
                        label="Tìm kiếm" 
                        value=''
                    />
                    <Button onClick={() => setIsOpenCreateStaff(!isOpenCreateStaff)}>Thêm nhân viên</Button>
                </div>
            </div>
            {isOpenCreateStaff &&
                <CreateStaff
                    isOpen={isOpenCreateStaff}
                    onClose={() => setIsOpenCreateStaff(false)}
                />}
            <table css={listStaffStyle}>
                <thead>
                    <tr>
                        <td>Tên</td>
                        <td>Tên đăng nhập</td>
                        <td>Số điện thoại</td>
                        <td>Email</td>
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
    align-items: center;
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