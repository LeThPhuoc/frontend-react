/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useRef, useState } from "react"
import { CreateProject } from "../../features/project/modal/createProject"
import { ProjectItem } from "../../features/project/component/projectItem"
import { flex, flexCol, gap } from "../../style/style"
import { Button } from "../../components/Button/button"
import { useDebounce } from "../../components/useDebounce"
import { useNavigate } from "react-router-dom"
import { deleteProjectApi } from "../../api/project/deleteProjectApi"
import { ModalDeleteProject } from "../../features/project/modal/modalDeleteProject"
import { useProjectList } from "../../features/project/useProjectList"

export const Project = () => {
    const naviage = useNavigate()
    const ref = useRef(null)
    const [isCreateProject, setIsCreateProject] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm)
    const [isModalDelete, setIsModalDelete] = useState<{ isOpen: boolean, project_id: number | null }>({ isOpen: false, project_id: null })
    const { list } = useProjectList({ rootRef: ref, searchTerm: debouncedValue })

    const handleEditProject = (id: number) => {
        naviage(`/project/${id}/detail`)
    }

    const handleDeleteProject = (id: number) => {
        deleteProjectApi({
            project_id: id,
        })
    }

    return (
        <div css={container}>
            <div css={header}>
                <div>
                    danh sách
                </div>
                <div css={headerTool}>
                    <label htmlFor="">tìm kiếm</label>
                    <TextField onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                    <Button onClick={() => setIsCreateProject(!isCreateProject)}>tạo mơi dự án</Button>
                </div>
            </div>
            {isCreateProject && (
                <CreateProject isOpen={isCreateProject} onClose={() => setIsCreateProject(false)} />
            )}
            <div css={css`
                height: 800px;
                overflow-y: auto;
            `} ref={ref}>
                <div css={[flex, flexCol, gap(10)]}>
                    {list?.map((item) => {
                        return (
                            <ProjectItem
                                onEdit={(id) => handleEditProject(id)}
                                onDelete={(id) => {
                                    setIsModalDelete({ isOpen: true, project_id: id })
                                    handleDeleteProject(id)
                                }
                                }
                                item={item}
                                key={item.id}
                            />
                        )
                    })}
                </div>
            </div>
            {
                isModalDelete.isOpen && (

                    <ModalDeleteProject
                        isOpen={isModalDelete.isOpen}
                        onClose={() => setIsModalDelete({ isOpen: false, project_id: null })}
                        onConfirm={() => {
                            if (isModalDelete.project_id) {

                                handleDeleteProject(isModalDelete.project_id)
                            }
                        }
                        }
                    />
                )
            }
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
    flex-wrap: wrap-reverse;
`

const headerTool = css`
    display: flex;
    gap: 8px;
    align-items: center;
`