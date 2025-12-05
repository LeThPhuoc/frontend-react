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

export const ProjectDetail = () => {
    const { showAlert } = useAlert()
    const [projectDefault, setProjectDefault] = useState<DataProject | null>(null)
    const [projectPersonDetail, setProjectPersonDetail] = useState<BossProject | StaffProject | null>(null)
    const [listDeleteStaffBoss, setListDeleteStaffBoss] = useState<{ staff_id: number[], boss_id: number[] }>({ staff_id: [], boss_id: [] })
    const [dataModalEditStaffBoss, setDataModalEditStaffBoss] = useState<BossProject | StaffProject | null>(null)
    const [modalAddStaffBoss, setModalAddStaffBoss] = useState<{
        isOpen: boolean,
        title: string,
        role: 'staff' | 'boss' | undefined
    }
    >({ isOpen: false, title: '', role: undefined })
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
        // validationSchema: ,
        onSubmit: async values => {
            setIsLoading(true)
            await editProjectApi({
                project_id: id ?? '',
                data: values,
                success: () => {
                    showAlert('Chỉnh sửa dự án thành công', 'success')
                    handleGetDetailProject()
                },
                failure: (error) => {
                    showAlert(error.response.data.message, 'error')
                }
            })
            setIsLoading(false)
        }
    })

    const handleGetDetailProject = async () => {
        setIsLoading(true)
        await getDetailProjectApi({
            project_id: id ?? '',
            success: (data) => {
                setProjectDefault(data)
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

    const handleDeleteStaffBossFromProject = () => {
        DeleteStaffBossFromProjectApi({
            project_id: id ?? '',
            dataListStaffId: listDeleteStaffBoss.staff_id,
            dataListBossId: listDeleteStaffBoss.boss_id,
            success: () => {
                handleGetDetailProject()
                showAlert('Xóa nhân viên thành công', 'success')
                setListDeleteStaffBoss({ staff_id: [], boss_id: [] })
            }
        })
    }

    const handleResetForm = () => {
        if (projectDefault) {
            formik.setValues({
                address: projectDefault.address,
                name: projectDefault.name,
                description: projectDefault.description,
                start_date: projectDefault.start_date ?? '',
                end_date: projectDefault.end_date ?? '',
                staff: projectDefault.staff,
                boss: projectDefault.boss,
                id: Number(projectDefault.id)
            })
        }
    }

    const isDisableBtnResetValue = useMemo(() => {
        if (!projectDefault) return true
        return (
            projectDefault.address === formik.values.address &&
            projectDefault.name === formik.values.name &&
            projectDefault.description === formik.values.description &&
            (projectDefault.start_date ?? '') === (formik.values.start_date ?? '') &&
            (projectDefault.end_date ?? '') === (formik.values.end_date ?? '')
        )
    }, [formik.values, projectDefault])

    return (
        <div css={container}>
            {isLoading && <Loading/>}
            <h1 css={css`
                text-align: center;
                font-size: 24px;
            `}>Thông tin dự án</h1>
            <div css={projectInfo}>
                <TextField
                    label="Tên dự án :"
                    value={formik.values.name ?? ''}
                    isFullWidth
                    onChange={(e) => {
                        formik.setFieldValue('name', e.target.value)
                    }}
                />
                <TextField
                    label="Mô tả của dự án :"
                    value={formik.values.description ?? ''}
                    isFullWidth
                    onChange={(e) => {
                        formik.setFieldValue('description', e.target.value)
                    }}
                />
                <TextField
                    label="Địa chỉ :"
                    value={formik.values.address ?? ''}
                    isFullWidth
                    onChange={(e) => {
                        formik.setFieldValue('address', e.target.value)
                    }}
                />
                <TextField
                    label="Ngày bắt đầu :"
                    value={formik.values.start_date ?? ''}
                    isFullWidth
                    type="date"
                    onChange={(e) => {
                        formik.setFieldValue('start_date', e.target.value)
                    }}
                />
                <TextField
                    label="Ngày kết thúc :"
                    value={formik.values.end_date ?? ''}
                    isFullWidth
                    type="date"
                    onChange={(e) => {
                        formik.setFieldValue('end_date', e.target.value)
                    }}
                />
                <Button
                    disabled={isDisableBtnResetValue}
                    isFullWidth
                    onClick={handleResetForm}
                    customCss={css`
                        margin-top: 10px;
                    `}
                >
                    Quay về trạng thái ban đầu
                </Button>
                <Button
                    disabled={isDisableBtnResetValue}
                    isFullWidth
                    onClick={() => formik.submitForm()}
                >
                    chỉnh sửa dự án
                </Button>
            </div>
            <div css={groupPeople}>
                <div css={staffStyle}>
                    <div className="title">nhân viên thuộc dự án</div>
                    <div css={listProjectPerson}>
                        {(formik.values.staff ?? []).map((m) => {
                            const isDelete = listDeleteStaffBoss.staff_id.includes(m.id)
                            return (
                                <ProjectPersoninfoCard
                                    key={m.id} data={m}
                                    onClick={() => setProjectPersonDetail({ ...m, user: 'staff' })}
                                    onDelete={() => {
                                        if (listDeleteStaffBoss.staff_id.includes(m.id)) {
                                            setListDeleteStaffBoss({
                                                staff_id: listDeleteStaffBoss.staff_id.filter((id) => id !== m.id),
                                                boss_id: listDeleteStaffBoss.boss_id
                                            })
                                            return
                                        } else {
                                            setListDeleteStaffBoss({
                                                staff_id: [...listDeleteStaffBoss.staff_id, m.id],
                                                boss_id: listDeleteStaffBoss.boss_id
                                            })
                                        }
                                    }}
                                    isDelete={isDelete}
                                    isEdit
                                    onEdit={() => setDataModalEditStaffBoss({ ...m, user: 'staff' })}
                                />
                            )
                        })}
                    </div>
                    <div css={[flex, gap(5)]}>
                        <div css={flex1}>
                            <Button isFullWidth onClick={() => setModalAddStaffBoss({ isOpen: true, title: 'Thêm nhân viên vào dự án', role: 'staff' })}>
                                thêm nhân viên
                            </Button>
                        </div>
                        {listDeleteStaffBoss.staff_id.length > 0 && listDeleteStaffBoss.boss_id.length === 0 && (
                            <div css={flex1}>
                                <Button
                                    isFullWidth
                                    onClick={handleDeleteStaffBossFromProject}
                                    variant="delete"
                                >
                                    Xóa thành viên
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
                <div css={bossStyle}>
                    <div className="title">người quản lí dự án</div>
                    <div css={listProjectPerson}>
                        {(formik.values.boss ?? []).map((m) => {
                            const isDelete = listDeleteStaffBoss.boss_id.includes(m.id)
                            return (
                                <ProjectPersoninfoCard
                                    isEdit
                                    key={m.id} data={m}
                                    onEdit={() => setDataModalEditStaffBoss({ ...m, user: 'boss' })}
                                    onClick={() => setProjectPersonDetail({ ...m, user: 'boss' })}
                                    onDelete={() => {
                                        if (listDeleteStaffBoss.boss_id.includes(m.id)) {
                                            setListDeleteStaffBoss({
                                                staff_id: listDeleteStaffBoss.staff_id,
                                                boss_id: listDeleteStaffBoss.boss_id.filter((id) => id !== m.id)
                                            })
                                            return
                                        } else {
                                            setListDeleteStaffBoss({
                                                staff_id: listDeleteStaffBoss.staff_id,
                                                boss_id: [...listDeleteStaffBoss.boss_id, m.id]
                                            })
                                        }
                                    }}
                                    isDelete={isDelete}
                                />
                            )
                        })}
                    </div>
                    <div css={[flex, gap(5)]}>
                        <div css={flex1}>
                            <Button isFullWidth onClick={() => setModalAddStaffBoss({ isOpen: true, title: 'Thêm quản lý vào dự án', role: 'boss' })}>
                                thêm quản lí
                            </Button>
                        </div>
                        {listDeleteStaffBoss.boss_id.length > 0 && listDeleteStaffBoss.staff_id.length === 0 && (
                            <div css={flex1}>
                                <Button
                                    isFullWidth
                                    onClick={handleDeleteStaffBossFromProject}
                                    variant="delete"
                                >
                                    Xóa quản lí
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {
                listDeleteStaffBoss.staff_id.length > 0 && listDeleteStaffBoss.boss_id.length > 0 && (
                    <Button 
                        variant="delete" 
                        isFullWidth
                        onClick={handleDeleteStaffBossFromProject}
                    >
                        Xóa người đã được chọn trong dự án
                    </Button>
                )
            }
            {!!projectPersonDetail && (
                <ModalDetailStaffBoss
                    isOpen={!!projectPersonDetail}
                    onClose={() => setProjectPersonDetail(null)}
                    data={projectPersonDetail}
                />
            )}
            {!!dataModalEditStaffBoss && (
                <ModalEditStaffBoss
                    data={dataModalEditStaffBoss}
                    isOpen={!!dataModalEditStaffBoss}
                    onClose={() => setDataModalEditStaffBoss(null)}
                    handleGetDetailProject={handleGetDetailProject}
                />
            )}
            {modalAddStaffBoss.isOpen && (
                <ModalAddStaffBossProject
                    project_id={formik.values.id}
                    isOpen={modalAddStaffBoss.isOpen}
                    onClose={() => setModalAddStaffBoss({ isOpen: false, title: '', role: undefined })}
                    title={modalAddStaffBoss.title}
                    role={modalAddStaffBoss.role}
                    handleSubmit={handleGetDetailProject}
                />
            )}
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
    /* width: 350px; */
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-size: 14px;
        font-weight: 500;
    }
`


const groupPeople = css`
    display: flex;
    width: 100%;
`

const listProjectPerson = css`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 5px;
`

const staffStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: calc(100% / 2);
    height: 500px;
    border-right: 1px solid #ccc;
    .title {
        text-align: center;
    }
`

const bossStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: calc(100% / 2);
    height: 500px;
    .title {
        text-align: center;
    }
`

const editBtn = css`
    top: 20px;
    right: 20px;
    background-color: #b0e99a;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s ease-out;
    &:hover {
        background-color: #9cd87f; 
    }
`