/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useRef, useState } from "react"
import { CreateProject } from "../../features/project/modal/createProject"
import { ProjectItem } from "../../features/project/component/projectItem"
import { flex, flexCol, gap } from "../../style/style"
import { Button } from "../../components/Button/button"
import { useDebounce } from "../../components/useDebounce"
import { useNavigate } from "react-router-dom"
import { deleteProjectApi } from "../../api/project/deleteProjectApi"
import { ModalDeleteProject } from "../../features/project/modal/modalDeleteProject"
import { useProjectList } from "../../features/project/useProjectList"
import { Loading } from "../../components/Loading"

export const CheckinPage = () => {
    let role = localStorage.getItem('role');
    const naviage = useNavigate()
    const ref = useRef(null)
    const [isCreateProject, setIsCreateProject] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm)
    const [isModalDelete, setIsModalDelete] = useState<{ isOpen: boolean, project_id: number | null }>({ isOpen: false, project_id: null })
    const { list, isLoading } = useProjectList({ rootRef: ref, searchTerm: debouncedValue, per_page: 10 })

    return (
        <div css={container}>
            {
                isLoading &&
                <Loading />
            }
            <div css={header}>
                <div>
                    danh sách
                </div>
                <div css={headerTool}>
                    <label htmlFor="">tìm kiếm</label>
                    <TextField onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} />
                </div>
            </div>
            <div css={contentListProject} ref={ref}>
                {list?.map((item) => {
                    return (
                        <div css={project} key={item.id}>
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
                        </div>
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
    flex-wrap: wrap-reverse;
`

const headerTool = css`
    display: flex;
    gap: 8px;
    align-items: center;
`

const contentListProject = css`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    height: calc(100vh - 140px);
    overflow-y: auto;
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-size: 14px;
        font-weight: 500;
    }
`

const project = css`
    position: relative;
    display: flex;
    justify-content: space-between;
    width: calc((100% - 20px) / 3);
    height: 200px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px #ccc;
    transition: all .3s ease-out;
`


const projectInfo = css`
    display: flex;
    flex-shrink: 0;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`