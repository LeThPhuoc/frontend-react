/** @jsxImportSource @emotion/react */


import { css } from "@emotion/react"
import { Modal } from "../../../components/modal/modal"
import { flex, flexCol, gap } from "../../../style/style"
import { BossProject, StaffProject } from "../../../api/project/getListProjectApi"
import { TextField } from "../../../components/input/TextField"

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
                <TextField label="Tên :" value={data?.name ?? ''} disabled />
                <TextField label="tên đăng nhập :" value={data?.login_name ?? ''} disabled />
                <TextField label="tel :" value={data?.tel ?? ''} disabled />
                <TextField label="email :" value={data?.email ?? ''} disabled />
                <TextField label="địa chỉ :" value={data?.address ?? ''} disabled />
                <TextField label="vai trò :" value={data?.role ?? ''} disabled />
                {data?.user === 'staff' && (
                    <TextField label="mức lương :" value={data?.salary ?? ''} disabled />
                )}
            </div>
        </Modal>
    )
}