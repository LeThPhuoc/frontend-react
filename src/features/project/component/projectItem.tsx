/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { BossProject, DataProject, StaffProject } from "../../../api/project/getListProjectApi"
import { ProjectPersoninfoCard } from "./projectPersonInfoCard"
import { Modal } from "../../../components/modal/modal"
import { flex, gap } from "../../../style/style"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Prop = {
    item: DataProject
}

export const ProjectItem = ({ item }: Prop) => {
    const navigate = useNavigate()
    return (
        <div css={project} onClick={() => navigate(`/project/${item.id}/detail`)}>
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
            {/* <div css={groupPeople}>
                <div css={staffStyle}>
                    <div className="title">nhân viên thuộc dự án</div>
                    <div css={listProjectPerson}>
                        {item.staff.map((m) => {
                            return (
                                <ProjectPersoninfoCard onClick={() => setShowProjectPerson({ ...m, user: 'staff' })} key={m.id} data={m} />
                            )
                        })}
                    </div>
                </div>
                <div css={bossStyle}>
                    <div className="title">người quản lí dự án</div>
                    <div css={listProjectPerson}>
                        {item.boss.map((m) => {
                            return (
                                <ProjectPersoninfoCard onClick={() => setShowProjectPerson({ ...m, user: 'boss' })} key={m.id} data={m} />
                            )
                        })}
                    </div>
                </div>
            </div> */}
            {/* {!!showProjectPerson && (
                <Modal
                    isOpen={!!showProjectPerson}
                    title="Thông tin"
                    onClose={() => setShowProjectPerson(null)}
                    customCss={css`
                        min-width: 300px;
                    `}
                >
                    <div css={[flex, gap(10)]}>
                        <div css={[]}>
                            <div>tên :</div>
                            <div>tên đăng nhập :</div>
                            <div>tel :</div>
                            <div>email :</div>
                            <div>địa chỉ :</div>
                            {showProjectPerson.user === 'staff' && (
                                <>
                                    <div>vai trò :</div>
                                    <div>mức lương :</div>

                                </>
                            )}
                        </div>
                        <div css={[]}>
                            <div>{showProjectPerson.name}</div>
                            <div>{showProjectPerson.login_name}</div>
                            <div>{showProjectPerson.tel}</div>
                            <div>{showProjectPerson.email}</div>
                            <div>{showProjectPerson.address}</div>
                            {showProjectPerson.user === 'staff' && (
                                <>
                                    <div>{showProjectPerson.role}</div>
                                    <div>{showProjectPerson.salary}</div>
                                </>
                            )}
                        </div>
                    </div>
                </Modal>
            )} */}
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
    @media (max-width: ${maxWidth1150px}) {
        flex-direction: column;
        gap: 20px;
    }
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