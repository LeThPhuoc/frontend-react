/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Boss, Staff } from "../../../api/project/getListProjectApi"

type Prop = {
    data: Boss | Staff
    onClick: () => void
}

export const ProjectPersoninfoCard = ({ data, onClick }: Prop) => {
    return (
        <div css={content} onClick={onClick}>
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
    )
}

const content = css`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    cursor: pointer;
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-weight: 500;
    }
    
`