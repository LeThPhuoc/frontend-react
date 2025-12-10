/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useMemo, useState } from "react"
import { BossProject, DataProject, StaffProject } from "../../api/project/getListProjectApi"
import { flex, flex1, gap } from "../../style/style"
import { useParams } from "react-router-dom"
import { ProjectPersoninfoCard } from "../../features/project/component/projectPersonInfoCard"
import { ModalDetailStaffBoss } from "../../features/project/modal/modalDetailStaffBoss"
import { DeleteStaffBossFromProjectApi } from "../../api/project/deleteStaffFromProjectApi"
import { ModalEditStaffBoss } from "../../features/project/modal/modalEditStaffBoss"
import { getDetailProjectApi } from "../../api/project/getDetailProjectApi"
import { useAlert } from "../../components/Alert/AlertProvider"
import { Button } from "../../components/Button/button"
import { useFormik } from "formik"
import { editProjectApi } from "../../api/project/editProjectApi"
import { ModalAddStaffBossProject } from "../../features/project/modal/modalAddStaffBossProject"
import { Loading } from "../../components/Loading"

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

    const date = new Date()
    console.log(new Date(date.getFullYear(), 12, 0).getDate())

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
                <table css={css`
                    width: 100%;
                `}>
                    <thead>
                        <tr>
                            <th>tên</th>
                            <th>vai trò</th>
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
                                    <td>{m.name}</td>
                                    <td>{m.name}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
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