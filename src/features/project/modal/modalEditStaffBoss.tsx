/** @jsxImportSource @emotion/react */


import { css } from "@emotion/react"
import { Modal } from "../../../components/modal/modal"
import { flex, flexCol, gap } from "../../../style/style"
import { TextField } from "../../../components/input/TextField"
import { useFormik } from "formik"
import { Button } from "../../../components/Button/button"

type Props = {
    isOpen: boolean
    onClose: () => void
    data: any
}

export const ModalEditStaffBoss = ({ data, isOpen, onClose }: Props) => {

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
        }
    })

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <div css={[flex, gap(5), flexCol]}>
                <div css={fieldItem}>
                    <div className="title">tên :</div>
                    <div>{data?.name}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">tên đăng nhập :</div>
                    <div>{data?.login_name}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">tel :</div>
                    <div>{data?.tel}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">email :</div>
                    <div>{data?.email}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">địa chỉ :</div>
                    <div>{data?.address}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">vai trò :</div>
                    <TextField
                        value={formik.values?.role ?? ''}
                        onChange={(e) => formik.setFieldValue('role', e.target.value)}
                        placeholder="nhập vai trò mới"
                        isFullWidth
                    />
                </div>
                {data?.user === 'staff' && (

                    <div css={fieldItem}>
                        <div className="title">mức lương :</div>
                        <TextField
                            value={formik.values?.salary ?? ''}
                            onChange={(e) => formik.setFieldValue('salary', e.target.value)}
                            placeholder="nhập mức lương mới"
                            isFullWidth
                        />
                    </div>

                )}
            </div>
            <Button size="m" isFullWidth onClick={() => formik.submitForm()}>Lưu thay đổi</Button>
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