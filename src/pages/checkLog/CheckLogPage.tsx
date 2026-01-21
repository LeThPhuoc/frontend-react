/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useAlert } from "../../components/Alert/AlertProvider"
import { useFormik } from "formik"
import { Loading } from "../../components/Loading"
import { Button } from "../../components/Button/button"
import { DataProjectCheckLog, getProjectCheckLogDetail } from "../../api/checkLog/getProjectCheckLogDetailApi"
import { checkinApi } from "../../api/checkLog/checkinApi"
import { checkoutApi } from "../../api/checkLog/checkoutApi"
import { onlyNumber } from "../../hooks/onlyNumber"
import { DataProjectTimeSheet, getDetailProjectTimeSheetApi } from "../../api/timesheet/getDetailTimeSheetApi"

type FormikType = {
    project_detail: DataProjectCheckLog,
    project_timesheet: DataProjectTimeSheet,
}

export const CheckLogPage = () => {
    const { showAlert } = useAlert()
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const idUser = JSON.parse(localStorage.getItem('user') ?? '').id
    const roleUser = localStorage.getItem('role')
    const [changeTimeSheet, setChangeTimeSheet] = useState<Record<number, string | number>>({});
    const [isEditTimeSheet, setIsEditTimeSheet] = useState<Record<number, boolean>>({});


    const formik = useFormik<DataProjectCheckLog>({
        initialValues: {
            name: '',
            description: '',
            address: '',
            start_date: '',
            end_date: '',
            staff: [],
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {

        }
    })

    const fetchData = async () => {
        setIsLoading(true)
        if (roleUser == 'staff') {
            await getProjectCheckLogDetail({
                project_id: id ?? '',
                success: (data) => {
                    let listStaff = data.staff ?? []
                    if (idUser && roleUser === 'staff' && data.staff) {
                        const firstStaff = data.staff.find((m) => m.id == idUser)
                        listStaff = firstStaff ? [firstStaff, ...data.staff?.filter((m) => m.id != idUser)] : data.staff
                    }
                    formik.setValues({
                        name: data.name,
                        description: data.description,
                        address: data.address,
                        start_date: data.start_date ?? '',
                        end_date: data.end_date ?? '',
                        staff: listStaff,
                    })
                }
            })
        } else {
            await getDetailProjectTimeSheetApi({
                project_id: id ?? '',
                success: (data) => {
                    formik.setValues({
                        name: data.name,
                        description: data.description,
                        address: data.address,
                        start_date: data.start_date ?? '',
                        end_date: data.end_date ?? '',
                        staff: data.staff ?? [],
                    })
                }
            })
        }
        setIsLoading(false)
    }

    const handleCheckin = async (staff_id: number) => {
        if (!id) return;
        setIsLoading(true)
        await checkinApi({
            project_id: id,
            staff_id: staff_id.toString(),
        }
        )
        setIsLoading(false)
        fetchData()
    }

    const handleCheckout = async (staff_id: number) => {
        if (!id) return;
        setIsLoading(true)
        await checkoutApi({
            project_id: id,
            staff_id: staff_id.toString(),
        }
        )
        setIsLoading(false)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div css={container}>
            {isLoading && <Loading />}
            <div css={css`
                width: calc((100% - 20px) - 70%);
            `}>
                <h1 css={css`
                text-align: center;
                font-size: 24px;
            `}>Chi tiết dự án</h1>
                <div css={projectInfo}>
                    <TextField
                        disabled
                        label="Tên dự án :"
                        value={formik.values.name ?? ''}
                        isFullWidth
                    />
                    <TextField
                        disabled
                        label="Mô tả của dự án :"
                        value={formik.values.description ?? ''}
                        isFullWidth
                    />
                    <TextField
                        disabled
                        label="Địa chỉ :"
                        value={formik.values.address ?? ''}
                        isFullWidth
                    />
                    <TextField
                        disabled
                        label="Ngày bắt đầu :"
                        value={formik.values.start_date ?? ''}
                        isFullWidth
                        type="date"
                    />
                    <TextField
                        disabled
                        label="Ngày kết thúc :"
                        value={formik.values.end_date ?? ''}
                        isFullWidth
                        type="date"
                    />
                </div>
            </div>
            <div css={css`
                width: 1px;
                height: 100%;
                background-color: #ccc;
            `}></div>
            <div css={css`
                width: calc((100% - 20px) - 30%);
            `}>
                <h1 css={css`
                    font-size: 24px;
                    text-align: center;
                `}>bảng chấm công</h1>
                <div css={tableCheckin}>
                    <table>
                        {roleUser == 'staff' ? (
                            <>
                                <thead>
                                    <tr>
                                        <th>tên</th>
                                        <th>vai trò</th>
                                        <th>tổng giờ làm trong dự án</th>
                                        <th>thời gian làm hôm nay</th>
                                        <th>checkin time</th>
                                        <th>checkout time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formik.values.staff?.map((m) => {
                                        return (
                                            <tr key={m.id}>
                                                <td>{m.name} {m.id == idUser && roleUser === 'staff' ? '( Bạn )' : null}</td>
                                                <td>{m.role}</td>
                                                <td>{m.total_hours}giờ</td>
                                                <td>{`${Math.floor(Number(m.total_hours_today) / 60)} giờ ${Number(m.total_hours_today) % 60} phút`}</td>
                                                <td>
                                                    <div css={css`
                                                padding: 0 5px;
                                            `}>
                                                        {idUser == m.id && roleUser == 'staff' && (
                                                            m.checkin_time && !m.checkout_time
                                                                ? m.checkin_time : <Button
                                                                    isFullWidth
                                                                    onClick={() => handleCheckin(m.id)}
                                                                    disabled={(!!m.checkin_time && !m.checkout_time) || (m.id !== idUser)}
                                                                >Checkin</Button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td>
                                                    <div css={css`
                                                padding: 0 5px;
                                            `}>
                                                        {idUser == m.id && roleUser == 'staff' && (
                                                            <Button
                                                                isFullWidth
                                                                onClick={() => handleCheckout(m.id)}
                                                                disabled={(!m.checkin_time || !!m.checkout_time) || (m.id !== idUser)}
                                                            >Checkout</Button>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        ) : (
                            <>
                                <thead>
                                    <tr>
                                        <th>tên</th>
                                        <th>vai trò</th>
                                        <th>tổng giờ làm</th>
                                        <th>thời gian làm hôm nay</th>
                                        <th>tổng số công</th>
                                        <th>số công hôm nay</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formik.values.staff?.map((m) => {
                                        return (
                                            <tr key={m.id}>
                                                <td>{m.name} {m.id == idUser && roleUser === 'staff' ? '( Bạn )' : null}</td>
                                                <td>{m.role}</td>
                                                <td>{m.total_hours}giờ</td>
                                                <td>{`${Math.floor(Number(m.total_hours_today) / 60)} giờ ${Number(m.total_hours_today) % 60} phút`}</td>
                                                <td>{m.total_timekeeping_number}</td>
                                                <td>
                                                    <div css={css`
                                                        display: flex;
                                                        gap: 10px;
                                                        align-items: center;
                                                        justify-content: space-between;
                                                        min-width: 260px;
                                                        max-width: 260px;
                                                        padding: 0px 5px;
                                                    `}>
                                                        {isEditTimeSheet[m.id] ? (
                                                            <TextField
                                                                isFocus
                                                                size="sm"
                                                                isFullWidth
                                                                value={changeTimeSheet[m.id] ?? ''}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    setChangeTimeSheet((prev) => ({
                                                                        ...prev,
                                                                        [m.id]: onlyNumber(value),
                                                                    }));
                                                                }}
                                                            />
                                                        ) : (
                                                            m.total_timekeeping_number_today
                                                        )}
                                                        <div css={css`
                                                            display: flex;
                                                            gap: 10px;
                                                        `}>
                                                            {
                                                                isEditTimeSheet[m.id] && (
                                                                    <Button
                                                                        disabled={
                                                                            changeTimeSheet[m.id] === m.total_timekeeping_number_today?.toString() ||
                                                                            !changeTimeSheet[m.id]
                                                                        }
                                                                        size="s"
                                                                        onClick={() => console.log(changeTimeSheet[m.id], m.total_timekeeping_number_today)}
                                                                    >
                                                                        Lưu
                                                                    </Button>
                                                                )
                                                            }
                                                            <Button
                                                                customCss={css`
                                                                    width: 40px;
                                                                `}
                                                                size="s"
                                                                isFocus={isEditTimeSheet[m.id]}
                                                                onClick={() => {
                                                                    setIsEditTimeSheet({ [m.id]: isEditTimeSheet[m.id] ? false : true })
                                                                    if (
                                                                        !!m.total_timekeeping_number_today &&
                                                                        m.total_timekeeping_number_today !== '' &&
                                                                        Number(m.total_timekeeping_number_today) !== 0
                                                                    ) {
                                                                        setChangeTimeSheet({
                                                                            [m.id]: m.total_timekeeping_number_today ?? '',
                                                                        });
                                                                    }
                                                                }}
                                                            >
                                                                <i className="fa-solid fa-pen"></i>
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}

const container = css`
    padding: 20px;
    height: 100%;
    display: flex;
    justify-content: space-between;
    position: relative;
    align-items: center;
`

const projectInfo = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const tableCheckin = css`
    height: 600px;
    overflow-y: auto;
    table {
        width: 100%;
        border-spacing: 0px;
    }
    thead {
        position: sticky;
        top: 0px;
        z-index: 1;
        tr {
            background-color: #6464b3;
            color: white;
            th {
                padding: 5px;
                font-weight: 400;
            }
        }
    }
    tbody {
        tr {
            td {
                padding: 4px 2px;
                text-align: center; 
            }
        }
        tr:nth-of-type(even) {
    background-color: #f2f2f2; /* A light gray color */
}
    }
`