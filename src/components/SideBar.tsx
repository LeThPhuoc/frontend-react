/** @jsxImportSource @emotion/react */

import React, { use, useState } from "react";
import { css } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { Button } from "./Button/button";

const listRender = [
    {
        label: 'Quản trị viên', items: [
            { label: 'Quản lý tài khoản nhân viên', link: '/staff' },
            { label: 'Quản lý công trình', link: '/project' },
            { label: 'Quản lý vật tư', link: '' },
        ]
    }
]

type Prop = {
}

export const SideBar = () => {
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(listRender.map(() => false));
    const handleClickShowItems = (index: number) => {
        let newActiveIndex = [...activeIndex];
        newActiveIndex[index] = !newActiveIndex[index];
        setActiveIndex(newActiveIndex);
    }
    return (
        <div css={container}>
            <ul>
                {listRender.map((group, index) => {
                    let showItems = activeIndex[index];
                    return (
                        <li key={index}>
                            <div css={contentGroupLabel} onClick={() => handleClickShowItems(index)}>
                                {group.label}
                            </div>
                            <div >
                                <ul css={groupItem(showItems)}>
                                    {group.items.map((item, index) => {
                                        return (
                                            <li key={index}>
                                                <a href={item.link}>{item.label}</a>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </li>
                    )
                })}
            </ul>
            <Button
                isFullWidth
                onClick={() => {
                    localStorage.removeItem('token')
                    navigate('/login')
                }}
            >
                Đăng xuất
            </Button>
        </div>
    )
}

const container = css`
    width: 250px;
    height: 100vh;
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: space-between;
    background-color: #131357;
    ul {

        list-style: none;
        padding-left: 10px
    }
    ul > li {
        overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
    }
`

const contentGroupLabel = css`
    cursor: pointer;
`

const groupItem = (showItems: boolean) => css`
  overflow: hidden;
  transition: max-height .3s ease-in-out; 
  max-height: ${showItems ? '500px' : '0'};
  li>a {
    text-decoration: none;
    color: white;
  }
`

const btnLogout = css`
    padding: 10px 20px;
    border-radius: 50px;
`