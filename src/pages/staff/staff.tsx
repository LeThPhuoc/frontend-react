/** @jsxImportSource @emotion/react */
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/react";
import { CreateStaff } from "./createStaff";
import { Button } from "../../components/Button/button";
import { TextField } from "../../components/input/TextField";
import { useDebounce } from "../../components/useDebounce";
import { useStaffList } from "../../features/staff/useStaffList";

export const Staff = () => {
    const ref = useRef<HTMLDivElement>(null)
    const [isOpenCreateStaff, setIsOpenCreateStaff] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm)
    const { list } = useStaffList({ rootRef: ref, searchTerm: debouncedValue });

    return (
        <div css={container}>
            <div css={header}>
                <h3>Danh sách nhân viên</h3>
                <div css={toolbar}>
                    <TextField
                        positionLabel="left"
                        label="Tìm kiếm"
                        placeholder="Nhập để tìm kiếm tên"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button onClick={() => setIsOpenCreateStaff(!isOpenCreateStaff)}>Thêm nhân viên</Button>
                </div>
            </div>
            {isOpenCreateStaff &&
                <CreateStaff
                    isOpen={isOpenCreateStaff}
                    onClose={() => setIsOpenCreateStaff(false)}
                />}
            <div
                ref={ref}
                css={css`
                    height: 600px;
                    position: relative;
                    overflow-y: auto;
                `}>

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
                        {list.length !== 0 &&
                            list.map((staff) => {
                                return (
                                    <tr key={staff.id}>
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
        </div>
    )
}

const container = css`
    padding: 20px;
    height: 100%;
`

const header = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`

const toolbar = css`
    display: flex;
    align-items: center;
    gap: 10px;
`

const listStaffStyle = css`
    width: 100%;
    border-spacing: 0px;
    thead {
        position: sticky;
        top: 0px;
    }
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