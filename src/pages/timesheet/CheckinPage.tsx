/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useState } from "react"
import { DataProject } from "../../api/project/getListProjectApi"
import { useParams } from "react-router-dom"
import { getDetailProjectApi } from "../../api/project/getDetailProjectApi"
import { useAlert } from "../../components/Alert/AlertProvider"
import { useFormik } from "formik"
import { Loading } from "../../components/Loading"
import { Button } from "../../components/Button/button"

export const CheckinPage = () => {
    const { showAlert } = useAlert()
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()

    const formik = useFormik<DataProject>({
        initialValues: {
            id: undefined,
            name: '',
            description: '',
            address: '',
            start_date: '',
            end_date: '',
            staff: [],
            boss: []
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {
            
        }
    })

    const handleGetDetailProject = async () => {
        setIsLoading(true)
        await getDetailProjectApi({
            project_id: id ?? '',
            success: (data) => {
                formik.setValues({
                    id: Number(data.id),
                    name: data.name,
                    description: data.description,
                    address: data.address,
                    start_date: data.start_date ?? '',
                    end_date: data.end_date ?? '',
                    staff: (data.staff ?? []).map((m) => ({ ...m, project_id: Number(data.id), user: 'staff' })),
                    boss: (data.boss ?? []).map((m) => ({ ...m, project_id: Number(data.id), user: 'boss' }))
                })
            }
        })
        setIsLoading(false)
    }


    useEffect(() => {
        handleGetDetailProject()
    }, [])

    return (
        <div css={container}>
            {isLoading && <Loading/>}
            <h1 css={css`
                text-align: center;
                font-size: 24px;
            `}>Thông tin checkin dự án</h1>
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
            <div>
                <h1 css={css`
                    font-size: 24px;
                    text-align: center;
                `}>bảng Checkin</h1>
                <div css={tableCheckin}>
                    <table>
                        <thead>
                            <tr>
                                <th>tên</th>
                                <th>vai trò</th>
                                <th>total</th>
                                <th>checkin time</th>
                                <th>checkout time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {formik.values.staff?.map((m) => {
                                return (
                                    <tr key={m.id}>
                                        <td>{m.name}</td>
                                        <td>{m.role}</td>
                                        <td>{m.role}</td>
                                        <td><Button isFullWidth>Checkin</Button></td>
                                        <td><Button isFullWidth>Checkout</Button></td>
                                    </tr>
                                )
                            })}
                        </tbody>
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
    gap: 20px;
    flex-direction: column;
    position: relative;
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
        tr {
            background-color: #6464b3;
            color: white;
            th {
                padding: 5px;
            }
        }
    }
`