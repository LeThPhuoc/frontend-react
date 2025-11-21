/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { BossProject, StaffProject } from "../../../api/project/getListProjectApi"

type Prop = {
    data: BossProject | StaffProject
    onClick: () => void
    onEdit?: () => void
    onDelete?: () => void
    isDelete?: boolean
    isEdit?: boolean
}

export const ProjectPersoninfoCard = ({ data, onClick, onEdit, onDelete, isDelete, isEdit }: Prop) => {
    const isBoss = JSON.parse(localStorage.getItem('user') ?? '').id

    return (
        <div css={[content, isDelete && css`background-color: #ffd3d3;`]} onClick={onClick}>
            <div>
                <div css={fieldItem}>
                    <div className="title">Tên :</div>
                    <div>{data.name}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Email :</div>
                    <div>{data.email}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Tel :</div>
                    <div>{data.tel}</div>
                </div>
            </div>
            {isEdit && (
                <div css={edit}>
                    <button className="edit" onClick={(e) => {
                        onEdit && onEdit()
                        e.stopPropagation()
                    }}>
                        <i className="fa-solid fa-pen"></i>
                    </button>
                    {
                        isBoss !== data.id && (
                            <button className="delete" onClick={(e) => {
                                onDelete && onDelete()
                                e.stopPropagation()
                            }}>
                                <i className="fa-solid fa-trash"></i>
                            </button>
                        )
                    }
                </div>
            )}
        </div>
    )
}

const content = css`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
    position: relative;
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-weight: 500;
    }
    
`

const edit = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 10px;

    display: flex;
    flex-direction: column;
    gap: 2px;
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