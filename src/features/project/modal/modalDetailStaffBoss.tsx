/** @jsxImportSource @emotion/react */


import { css } from "@emotion/react"
import { Modal } from "../../../components/modal/modal"
import { flex, flexCol, gap } from "../../../style/style"
import { BossProject, StaffProject } from "../../../api/project/getListProjectApi"

type Props = {
    isOpen: boolean,
    onClose: () => void,
    data: BossProject | StaffProject | null
}

export const ModalDetailStaffBoss = ({ data, isOpen, onClose }: Props) => {
    return (
        <Modal
            isOpen={isOpen}
            title="Thông tin"
            onClose={onClose}
            customCss={css`
                min-width: 400px;
            `}
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
                    {data?.user === 'staff' && (
                        <>
                            <div css={fieldItem}>
                                <div className="title">vai trò :</div>
                                <div>{data?.role}</div>
                            </div>
                            <div css={fieldItem}>
                                <div className="title">mức lương :</div>
                                <div>{data?.salary}</div>
                            </div>
                        </>
                    )}
            </div>
        </Modal>
    )
}

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        min-width: 120px;
        font-size: 14px;
        font-weight: 500;
    }
`