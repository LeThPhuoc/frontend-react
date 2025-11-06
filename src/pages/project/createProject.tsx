/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useFormik } from "formik"
import * as Yup from 'yup'
import api from "../../config_api/axiosConfig";
import { useAlert } from "../../components/Alert/AlertProvider";

const validationSchema = Yup.object({
    name: Yup.string().required('Bạn chưa nhập tên dự án'),
    description: Yup.string().required('Bạn chưa nhập mô tả dự án'),
});

type Formik = {
    name: string,
    description: string,
    start_date: string,
    end_date: string,
}

export const CreateProject = () => {
    const { showAlert } = useAlert()
    const formik = useFormik<Formik>({
        initialValues: {
            name: '',
            description: '',
            start_date: '',
            end_date: '',
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        validationSchema,
        onSubmit: async values => {
            const role = localStorage.getItem('role')
            if (role === 'boss') {
                const idBoss = localStorage.getItem('user')
                await api.post(`/create_project/${JSON.parse(idBoss ?? '').id}`, {
                    name: values.name,
                    description: values.description,
                    end_date: values.end_date,
                    start_date: values.start_date
                }).then((response) => {
                    formik.resetForm()
                    showAlert('Tạo mới dự án thành công', 'success')
                }).catch((error) => {
                    console.log(error)
                    showAlert(error.response.data.message, 'error')

                })
            }
        }
    })
    
    return (
        <div css={container}>
            <div css={content}>
                <h2>thông tin tạo mới dự án</h2>
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
                    label="Ngày bắt đầu"
                    type="date"
                    placeholder="ngày bắt đầu"
                    isFullWidth
                    value={formik.values.start_date}
                    onChange={(e) => formik.setFieldValue('start_date', e.target.value)}
                />
                <TextField
                    label="Ngày kết thúc"
                    type="date"
                    isFullWidth
                    value={formik.values.end_date}
                    onChange={(e) => formik.setFieldValue('end_date', e.target.value)}
                />
                <button onClick={() => formik.submitForm()}>tạo mới</button>
            </div>
        </div>
    )
}

const container = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const content = css`
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px;
    border-radius: 20px;
    border: 1px solid #EAE9EE;
    box-shadow: 0px 0px 4px 0px #ccc;
`