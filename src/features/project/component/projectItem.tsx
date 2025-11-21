/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { DataProject } from "../../../api/project/getListProjectApi"

type Prop = {
    item: DataProject
    onEdit: (id: number) => void
    onDelete: (id: number) => void
}

export const ProjectItem = ({ item, onEdit, onDelete }: Prop) => {
    return (
        <div css={project}>
            <div css={projectInfo}>
                <div css={fieldItem}>
                    <div className="title">Tên dự án :</div>
                    <div>{item.name}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Mô tả của dự án :</div>
                    <div>{item.description}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Địa chỉ :</div>
                    <div>{item.address}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Ngày bắt đầu :</div>
                    <div>{item.start_date ?? 'sẽ cập nhập sớm'}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Ngày kết thúc :</div>
                    <div>{item.end_date ?? 'sẽ cập nhập sớm'}</div>
                </div>
            </div>
            <div css={[action]}>
                <button className="edit" onClick={(e) => {
                    e.stopPropagation()
                    if (item.id) {
                        onEdit(item.id)
                    }
                }}>
                    <i className="fa-solid fa-pen"></i>
                </button>
                <button className="delete" onClick={(e) => {
                    e.stopPropagation()
                    if (item.id) {
                        onDelete(item.id)
                    }
                }}>
                    <i className="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
    )
}

const maxWidth1150px = '1150px'

const project = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    min-height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px #ccc;
    transition: all .3s ease-out;
`


const projectInfo = css`
    display: flex;
    flex-shrink: 0;
    width: 350px;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    @media (max-width: ${maxWidth1150px}) {
        width: 100%;
    }
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-size: 14px;
        font-weight: 500;
    }
`

const action = css`
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    gap: 5px;
    button {
        width: 30px;
        height: 30px;
        padding: 5px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
    }
    .edit {
        color: white;
        background-color: #b0e99a;
    }
    .delete {
        color: white;
        background-color: #f7a8a8;
    }
`