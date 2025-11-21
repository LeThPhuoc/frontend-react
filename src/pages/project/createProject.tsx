/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useFormik } from "formik"
import * as Yup from 'yup'
import { useAlert } from "../../components/Alert/AlertProvider";
import { createProjectApi, DataCreateProject } from "../../api/project/createProjectApi";
import { Modal } from "../../components/modal/modal";
import { Button } from "../../components/Button/button";

const validationSchema = Yup.object({
    name: Yup.string().required('Bạn chưa nhập tên dự án'),
    description: Yup.string().required('Bạn chưa nhập mô tả dự án'),
    address: Yup.string().required('Bạn chưa nhập địa chỉ dự án'),
});

type Props = {
    isOpen: boolean
    onClose: () => void
}

export const CreateProject = ({ isOpen, onClose }: Props) => {
    const { showAlert } = useAlert()
    const formik = useFormik<DataCreateProject>({
        initialValues: {
            name: '',
            address: '',
            description: '',
            start_date: '',
            end_date: '',
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema,
        onSubmit: async values => {
            createProjectApi({
                data: values, failure: (e) => {
                    showAlert(e.response?.data.message ?? 'Có lỗi vui lòng thử lại', 'error')
                }, success: () => {
                    showAlert('Tạo mới dự án thành công', 'success')
                    onClose()
                }
            })
        }
    })

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="thông tin tạo mới dự án">
            <div css={content}>
                <TextField
                    label="Tên dự án"
                    errorText={formik.errors.name}
                    placeholder="Tên dự án"
                    isFullWidth
                    value={formik.values.name}
                    onChange={(e) => formik.setFieldValue('name', e.target.value)}
                />
                <TextField
                    label="Mô tả dự án"
                    errorText={formik.errors.description}
                    placeholder="Mô tả dự án"
                    isFullWidth
                    value={formik.values.description}
                    onChange={(e) => formik.setFieldValue('description', e.target.value)}
                />
                <TextField
                    label="Địa chỉ dự án"
                    errorText={formik.errors.address}
                    placeholder="Địa chỉ dự án"
                    isFullWidth
                    value={formik.values.address}
                    onChange={(e) => formik.setFieldValue('address', e.target.value)}
                />
                <TextField
                    label="Ngày bắt đầu"
                    type="date"
                    placeholder="ngày bắt đầu"
                    isFullWidth
                    value={formik.values.start_date ?? ''}
                    onChange={(e) => formik.setFieldValue('start_date', e.target.value)}
                />
                <TextField
                    label="Ngày kết thúc"
                    type="date"
                    isFullWidth
                    value={formik.values.end_date ?? ''}
                    onChange={(e) => formik.setFieldValue('end_date', e.target.value)}
                />
                <Button isFullWidth onClick={() => formik.submitForm()}>tạo mới</Button>
            </div>
        </Modal>
    )
}

const content = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
`