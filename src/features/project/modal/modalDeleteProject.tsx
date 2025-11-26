/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Button } from "../../../components/Button/button"
import { Modal } from "../../../components/modal/modal"

type Props = {
    isOpen: boolean,
    onClose: () => void
    onConfirm: () => void
}

export const ModalDeleteProject = ({ isOpen, onClose, onConfirm }: Props) => {
    return (
        <Modal title="Bạn chắc chắn muốn xóa dự án này chứ !" isOpen={isOpen} onClose={onClose} >
            <div css={content}>
                <Button isFullWidth variant="secondary" onClick={onClose}>cancel</Button>
                <Button isFullWidth variant="delete" onClick={onConfirm}>confirm</Button>
            </div>
        </Modal>
    )
}

const content = css`
    display: flex;
    margin-top: 10px;
    gap: 10px;
`