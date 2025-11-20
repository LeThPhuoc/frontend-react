/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useState } from "react"
import { CreateProject } from "./createProject"
import { DataProject, getListProjectApi } from "../../api/project/getListProjectApi"
import { ProjectItem } from "../../features/project/component/projectItem"
import { flex, flexCol, gap } from "../../style/style"
import { Button } from "../../components/Button/button"

export const Project = () => {
    const [isCreateProject, setIsCreateProject] = useState(false)
    const [listProject, setListProject] = useState<DataProject[]>([])

    useEffect(() => {
        if (!isCreateProject) {
            getListProjectApi({
                success: (data) => {
                    setListProject(data ?? [])
                }
            })
        }
    }, [isCreateProject])

    return (
        <div css={container}>
            <div css={header}>
                <div>
                    danh sách
                </div>
                <div css={headerTool}>
                    <label htmlFor="">tìm kiếm</label>
                    <TextField onChange={(e) => console.log(e.target.value)} value={''} />
                    <Button onClick={() => setIsCreateProject(!isCreateProject)}>tạo mơi dự án</Button>
                </div>
            </div>
            {isCreateProject && (
                <CreateProject isOpen={isCreateProject} onClose={() => setIsCreateProject(false)} />
            )}
            <div css={[flex, flexCol, gap(10)]}>
                {listProject.map((item) => {
                    return (
                        <ProjectItem item={item} key={item.id} />
                    )
                })}
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
    align-items: center;
    justify-content: space-between;
`

const headerTool = css`
    display: flex;
    gap: 8px;
    align-items: center;
`