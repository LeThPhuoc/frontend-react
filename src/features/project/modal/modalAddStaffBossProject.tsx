/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { TextField } from "../../../components/input/TextField"
import { Modal } from "../../../components/modal/modal"
import { flex, flex1, flexCol, gap, mt, position } from "../../../style/style"
import { useEffect, useState } from "react"
import { BossProject, StaffProject } from "../../../api/project/getListProjectApi"
import { useDebounce } from "../../../components/useDebounce"
import { getListStaffApi } from "../../../api/staff/getListStaffApi"
import { useFormik } from "formik"
import { addStaffBossProjectApi } from "../../../api/project/addStaffBossProjectApi"
import { Button } from "../../../components/Button/button"
import { getStaffNotInProjectApi } from "../../../api/project/getStaffNotInProjectApi"
import { useAlert } from "../../../components/Alert/AlertProvider"
import { getBossNotInProjectApi } from "../../../api/project/getBossNotInProjectApi"

type Props = {
    project_id?: number;
    isOpen: boolean
    onClose: () => void
    title: string
    role?: 'staff' | 'boss'
}

export const ModalAddStaffBossProject = ({ project_id, title, isOpen, onClose, role }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const debounce = useDebounce(searchTerm);
    const { showAlert } = useAlert();

    const formik = useFormik<{
        staffs: (StaffProject & { active: boolean })[],
        bosses: (BossProject & { active: boolean })[]
    }>({
        initialValues: {
            staffs: [],
            bosses: [],
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        // validationSchema: ,
        onSubmit: async values => {
            console.log(values)
            if (project_id) {
                addStaffBossProjectApi({
                    project_id: project_id,
                    staffs: values.staffs?.filter((fil) => fil.active === true).map((m) => (
                        { id: m.id.toString(), role: m.role, salary: m.salary }
                    )),
                    bosses: values.bosses?.filter((fil) => fil.active === true).map((m) => (
                        { id: m.id.toString(), role: m.role }
                    )),
                    success: () => {
                        showAlert('Thêm nhân viên thành công', 'success')
                        onClose && onClose()
                    }
                })
            }
        }
    })

    useEffect(() => {
        if (!project_id) return
        if (role == 'staff') {
            getStaffNotInProjectApi({
                project_id: project_id,
                searchTerm: debounce, success: (data: any) => {
                    formik.setFieldValue('staffs', data.map((m: StaffProject) => ({ ...m,user: 'staff', active: false })))
                }
            })
        } else {
            getBossNotInProjectApi({
                project_id: project_id,
                searchTerm: debounce, success: (data: any) => {
                    formik.setFieldValue('bosses', data.map((m: StaffProject) => ({ ...m,user: 'boss', active: false })))
                }
            })
        }
    }, [debounce])

    useEffect(() => {
        if (!isOpen) {
            formik.setValues({
                staffs: [],
                bosses: []
            })
        }
    }, [isOpen])

    return (
        <Modal customCss={css`
            height: 100%;
        `} isOpen={isOpen} onClose={onClose} title={title}>
            <div css={css`
                height: 100%;
                flex-direction: column;
                display: flex;
                gap: 10px;
            `}>
                <TextField
                    value={searchTerm}
                    isFullWidth
                    emphasis
                    placeholder="Nhập để tìm kiếm..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div css={[listItem, flex1]}>
                    {(role == 'staff' ? formik.values.staffs : formik.values.bosses ?? []).map((m) => {
                        return (
                            <div
                                key={m.id}
                                css={contentInfo}
                                onClick={(e) => {
                                    if (role == 'staff') {
                                        formik.setFieldValue('staffs', [...(formik.values.staffs ?? []).map((itemActive) => {
                                            if (itemActive.id === m.id) {
                                                return { ...itemActive, salary: '', active: !itemActive.active, role: '' }
                                            }
                                            return itemActive
                                        })])
                                    } else {
                                        formik.setFieldValue('bosses', [...(formik.values.bosses ?? []).map((itemActive) => {
                                            if (itemActive.id === m.id) {
                                                return { ...itemActive, active: !itemActive.active, role: '' }
                                            }
                                            return itemActive
                                        })])
                                    }
                                    e.stopPropagation()
                                }}>
                                {m?.active && (
                                    <>
                                        <div css={[position('absolute', 0, 0, 0, 0), css`
                                                height: 100%;
                                                width: 100%;
                                                border: 5px solid #b5ffcb;
                                            `]} ></div>
                                        <i css={[position('absolute', 0, 0), css`
                                                background-color: #b5ffcb;
                                                padding: 5px;
                                            `]} className="fa-solid fa-check"></i>
                                    </>
                                )}
                                <div css={fieldItem}>
                                    <div className="title">Tên :</div>
                                    <div>{m.name}</div>
                                </div>
                                <div css={fieldItem}>
                                    <div className="title">Email :</div>
                                    <div>{m.email}</div>
                                </div>
                                <div css={fieldItem}>
                                    <div className="title">Tel :</div>
                                    <div>{m.tel}</div>
                                </div>
                                {
                                    m?.active && (
                                        <div css={css`
                                                z-index: 1;
                                                display: flex;
                                                flex-direction: column;
                                                gap: 5px;
                                            `}>
                                            <TextField
                                                label="Vai trò"
                                                value={m.role ?? ''}
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                }}
                                                onChange={(e) => {
                                                    if (m.user == 'staff') {
                                                        formik.setFieldValue('staffs', [...formik.values.staffs ?? []].map((mChange) => {
                                                            if (mChange.id === m.id) {
                                                                return { ...mChange, role: e.target.value }
                                                            }
                                                            return mChange
                                                        }))
                                                    } else {
                                                        formik.setFieldValue('bosses', [...formik.values.bosses ?? []].map((mChange) => {
                                                            if (mChange.id === m.id) {
                                                                return { ...mChange, role: e.target.value }
                                                            }
                                                            return mChange
                                                        }))
                                                    }
                                                }}
                                                isFullWidth
                                                placeholder="Vai trò"
                                            />
                                            {m.user == 'staff' && (
                                                <TextField
                                                    label="Lương"
                                                    type="number"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                    }}
                                                    isFullWidth
                                                    value={m.salary ?? ''}
                                                    onChange={(e) => {
                                                        formik.setFieldValue('staffs', [...formik.values.staffs ?? []].map((mChange) => {
                                                            if (mChange.id === m.id) {
                                                                return { ...mChange, salary: e.target.value }
                                                            }
                                                            return mChange
                                                        }))
                                                    }}
                                                    placeholder="Lương"
                                                />
                                            )}
                                        </div>
                                    )
                                }
                            </div>
                        )
                    })}
                </div>
                <Button isFullWidth onClick={() => formik.submitForm()}>
                    Thêm
                </Button>
            </div>
        </Modal>
    )
}

const fieldItem = css`
    display: flex;
    gap: 5px;
    z-index: 1;
    .title {
        font-weight: 500;
        width: 60px;
    }
    
`

const contentInfo = css`
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    cursor: pointer;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const listItem = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: auto;
`