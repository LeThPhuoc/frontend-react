/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useState } from "react"
import { BossProject, DataProject, getListProjectApi, StaffProject } from "../../api/project/getListProjectApi"
import { flex, flexCol, gap } from "../../style/style"
import api from "../../config_api/axiosConfig"
import { useParams } from "react-router-dom"
import { ProjectPersoninfoCard } from "../../features/project/component/projectPersonInfoCard"
import { Modal } from "../../components/modal/modal"
import { ModalDetailStaffBoss } from "../../features/project/modal/modalDetailStaffBoss"

export const ProjectDetail = () => {
    const [project, setProject] = useState<DataProject | null>(null)
    const [projectPersonDetail, setProjectPersonDetail] = useState<BossProject | StaffProject | null>(null)
    const { id } = useParams()


    useEffect(() => {
        const get = () => {
            api.get(`/project/${id}/detail`).then((res) => {
                setProject(res.data)
            })
        }
        get()
    }, [])

    return (
        <div css={container}>
            <button css={editBtn}>
                chỉnh sửa dự án
            </button>
            <div css={projectInfo}>
                <div css={fieldItem}>
                    <div className="title">Tên dự án :</div>
                    <div>{project?.name}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Mô tả của dự án :</div>
                    <div>{project?.description}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Địa chỉ :</div>
                    <div>{project?.address}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Ngày bắt đầu :</div>
                    <div>{project?.start_date ?? 'sẽ cập nhập sớm'}</div>
                </div>
                <div css={fieldItem}>
                    <div className="title">Ngày kết thúc :</div>
                    <div>{project?.end_date ?? 'sẽ cập nhập sớm'}</div>
                </div>
            </div>
            <div css={groupPeople}>
                <div css={staffStyle}>
                    <div className="title">nhân viên thuộc dự án</div>
                    <div css={listProjectPerson}>
                        {project?.staff.map((m) => {
                            return (
                                <ProjectPersoninfoCard 
                                    key={m.id} data={m} 
                                    onClick={() => setProjectPersonDetail({ ...m, user: 'staff' })} 
                                />
                            )
                        })}
                    </div>
                    <button>
                        thêm nhân viên
                    </button>
                </div>
                <div css={bossStyle}>
                    <div className="title">người quản lí dự án</div>
                    <div css={listProjectPerson}>
                        {project?.boss.map((m) => {
                            return (
                                <ProjectPersoninfoCard 
                                    key={m.id} data={m} 
                                    onClick={() => setProjectPersonDetail({ ...m, user: 'boss' })} 
                                />
                            )
                        })}
                    </div>
                    <button>
                        thêm quản lí
                    </button>
                </div>
            </div>
            {!!projectPersonDetail && (
                <ModalDetailStaffBoss 
                    isOpen={!!projectPersonDetail} 
                    onClose={() => setProjectPersonDetail(null)} 
                    data={projectPersonDetail} 
                />
            )}
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

const projectInfo = css`
    display: flex;
    flex-shrink: 0;
    width: 350px;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
`

const fieldItem = css`
    display: flex;
    gap: 5px;
    .title {
        font-size: 14px;
        font-weight: 500;
    }
`


const groupPeople = css`
    display: flex;
    width: 100%;
`

const listProjectPerson = css`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 5px;
`

const staffStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: calc(100% / 2);
    height: 500px;
    border-right: 1px solid #ccc;
    .title {
        text-align: center;
    }
`

const bossStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: calc(100% / 2);
    height: 500px;
    .title {
        text-align: center;
    }
`

const editBtn = css`
    position: absolute;
    top: 20px;
    right: 20px;
    background-color: #b0e99a;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all .3s ease-out;
    &:hover {
        background-color: #9cd87f; 
    }
`