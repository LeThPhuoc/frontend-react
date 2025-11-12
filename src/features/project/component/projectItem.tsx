/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { Boss, DataListProject, Staff } from "../../../api/project/getListProjectApi"
import { ProjectPersoninfoCard } from "./projectPersonInfoCard"
import { Modal } from "../../../components/modal/modal"
import { flex, flexCol, gap } from "../../../style/style"
import { useState } from "react"

type Prop = {
    item: DataListProject
}

export const ProjectItem = ({ item }: Prop) => {
    const [showProjectPerson, setShowProjectPerson] = useState<Boss | Staff | null>(null)
    return (
        <div css={project} >
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
            <div css={groupPeople}>
                <div css={staffStyle}>
                    <div className="title">nhân viên thuộc dự án</div>
                    <div css={listProjectPerson}>
                        {item.staff.map((m) => {
                            return (
                                <ProjectPersoninfoCard onClick={() => setShowProjectPerson(m)} key={m.id} data={m} />
                            )
                        })}
                    </div>
                </div>
                <div css={bossStyle}>
                    <div className="title">người quản lí dự án</div>
                    <div css={listProjectPerson}>
                        {item.boss.map((m) => {
                            return (
                                <ProjectPersoninfoCard onClick={() => setShowProjectPerson(m)} key={m.id} data={m} />
                            )
                        })}
                    </div>
                </div>
            </div>
            {!!showProjectPerson && (
                <Modal
                    isOpen={!!showProjectPerson}
                    title="Thông tin"
                    onClose={() => setShowProjectPerson(null)}
                    customCss={css`
                        min-width: 300px;
                    `}
                >
                    <div css={[flex, flexCol, gap(5)]}>
                        <div css={[flex, gap(5)]}>
                            <div>tên :</div>
                            <div>{showProjectPerson.name}</div>
                        </div>
                        <div css={[flex, gap(5)]}>
                            <div>tên đăng nhập :</div>
                            <div>{showProjectPerson.login_name}</div>
                        </div>
                        <div css={[flex, gap(5)]}>
                            <div>tel :</div>
                            <div>{showProjectPerson.tel}</div>
                        </div>
                        <div css={[flex, gap(5)]}>
                            <div>email :</div>
                            <div>{showProjectPerson.email}</div>
                        </div>
                        <div css={[flex, gap(5)]}>
                            <div>địa chỉ :</div>
                            <div>{showProjectPerson.address}</div>
                        </div>
                    </div>
                </Modal>
            )}
            <div className="abc">
                <div>fasdf</div>
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
    min-height: 150px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 0px #ccc;
    transition: all .3s ease-out;
    .abc {
        transition: all 8s ease-out;
        position: absolute;
        top: 20px;
        right: 10px;
        /* opacity: 0; */
        display: none;
        cursor: pointer;
    }
    :hover {
        .abc {
            /* opacity: 1; */
            display: block;
        }
    }
    @media (max-width: ${maxWidth1150px}) {
        flex-direction: column;
        gap: 20px;
    }
`

const groupPeople = css`
    display: flex;
    @media (max-width: ${maxWidth1150px}) {
        width: 100%;
        justify-content: center;
        border-top: 1px solid #ccc;
    }
`

const listProjectPerson = css`
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const staffStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 250px;
    height: 150px;
    border-right: 1px solid #ccc;
    .title {
        text-align: center;
    }
    @media (max-width: ${maxWidth1150px}) {
        width: 100%;
    }
`

const bossStyle = css`
    padding: 0px 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    width: 250px;
    height: 150px;
    .title {
        text-align: center;
    }
    @media (max-width: ${maxWidth1150px}) {
        width: 100%;
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