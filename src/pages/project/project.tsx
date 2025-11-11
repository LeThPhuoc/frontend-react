/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useState } from "react"
import { CreateProject } from "./createProject"
import api from "../../config_api/axiosConfig"

export const Project = () => {
    const [isCreateProject, setIsCreateProject] = useState(false)
    api.get(`/project/get_project/${localStorage.getItem('role')}/${JSON.parse(localStorage.getItem('user') ?? '').id}`)
    return (
        <div css={container}>
            <div css={header}>
                <div>
                    danh sách
                </div>
                <div css={headerTool}>
                    <label htmlFor="">tìm kiếm</label>
                    <TextField onChange={(e) => console.log(e.target.value)} value={''} />
                    <button onClick={() => setIsCreateProject(!isCreateProject)}>{isCreateProject ? 'danh sách dự án' : 'tạo mơi dự án'}</button>
                </div>
            </div>
            {isCreateProject && (
                <CreateProject />
            )}
            <div css={project}>
                <div>
                    <div>
                        name
                    </div>
                    <div>description</div>
                    <div>start_date</div>
                    <div>end_date</div>
                </div>
                <div>
                    <div>
                        <div>nhân viên thuộc dự án</div>
                    </div>
                    <div>
                        <div>người quản lí dự án</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const container = css`
    padding: 20px;
    height: 100%;
    display: flex;
    gap: 20px;
    flex-direction: column;
`

const header = css`
    display: flex;
    justify-content: space-between;
`

const headerTool = css`
    display: flex;
    gap: 8px;
    align-items: center;
`

const project = css`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px #ccc;
`