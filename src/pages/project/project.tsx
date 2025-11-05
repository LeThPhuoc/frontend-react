/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useState } from "react"
import { CreateProject } from "./createProject"

export const Project = () => {
    const [isCreateProject, setIsCreateProject] = useState(false)
    return (
        <div css={container}>
            <div css={header}>
                <div>
                    danh sách
                </div>
                <div css={headerTool}>
                    <label htmlFor="">tìm kiếm</label>
                    <TextField onChange={(e) => console.log(e)} value={''} />
                    <button onClick={() => setIsCreateProject(!isCreateProject)}>{isCreateProject ? 'danh sách dự án' : 'tạo mơi dự án'}</button>
                </div>
            </div>
            {isCreateProject && (
                <CreateProject/>
            )}
        </div>
    )
}

const container = css`
    padding: 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
`

const header =css`
    display: flex;
    justify-content: space-between;
`

const headerTool = css`
    display: flex;
    gap: 8px;
    align-items: center;
`