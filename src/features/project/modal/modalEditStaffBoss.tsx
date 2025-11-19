/** @jsxImportSource @emotion/react */


import { css } from "@emotion/react"
import { Modal } from "../../../components/modal/modal"
import { flex, flexCol, gap } from "../../../style/style"
import { TextField } from "../../../components/input/TextField"
import { useFormik } from "formik"
import { Button } from "../../../components/Button/button"
import { editStaffBossApi } from "../../../api/project/editStaffBossApi"
import { useAlert } from "../../../components/Alert/AlertProvider"

type Props = {
    isOpen: boolean
    onClose: () => void
    data: any
    handleGetDetailProject?: () => void
}

export const ModalEditStaffBoss = ({ data, isOpen, onClose, handleGetDetailProject }: Props) => {
    const { showAlert } = useAlert()
    const formik = useFormik<{
        role?: string,
        salary?: string
    }>({
        initialValues: {
            role: data?.role ?? '',
            salary: data?.salary ?? '',
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        // validationSchema: ,
        onSubmit: async values => {
            console.log(values)
            editStaffBossApi({
                project_id: data?.project_id ?? '',
                role: data?.user ?? '',
                id: data?.id ?? '',
                data: {
                    role: values.role,
                    salary: values.salary
                },
                success: () => {
                    onClose()
                    handleGetDetailProject && handleGetDetailProject()
                    showAlert('Chỉnh sửa thành công', 'success')
                },
            })
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div css={[flex, flexCol, gap(20)]}>
                <div css={[flex, gap(5), flexCol]}>
                    <TextField label="Tên :" value={data?.name ?? ''} disabled />
                    <TextField label="tên đăng nhập :" value={data?.login_name ?? ''} disabled />
                    <TextField label="tel :" value={data?.tel ?? ''} disabled />
                    <TextField label="email :" value={data?.email ?? ''} disabled />
                    <TextField label="địa chỉ :" value={data?.address ?? ''} disabled />
                    <TextField
                        emphasis
                        label="vai trò :"
                        value={formik.values?.role ?? ''}
                        onChange={(e) => formik.setFieldValue('role', e.target.value)}
                        placeholder="nhập vai trò mới"
                        isFullWidth
                    />
                    {data?.user === 'staff' && (
                        <TextField
                            emphasis
                            label="mức lương :"
                            value={formik.values?.salary ?? ''}
                            onChange={(e) => formik.setFieldValue('salary', e.target.value)}
                            placeholder="nhập mức lương mới"
                            isFullWidth
                        />
                    )}
                </div>
                <Button size="m" isFullWidth onClick={() => formik.submitForm()}>Lưu thay đổi</Button>
            </div>
        </Modal>
    )
}

const fieldItem = css`
    display: flex;
    align-items: center;
    gap: 5px;
    .title {
        width: 120px;
        font-size: 14px;
        font-weight: 500;
    }
`