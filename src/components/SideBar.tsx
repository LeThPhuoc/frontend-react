/** @jsxImportSource @emotion/react */

import React, { use, useState } from "react";
import { css } from "@emotion/react";

const listRender = [
    {
        label: 'Quản trị viên', items: [
            { label: 'Quản lý tài khoản', link: '/create_employ' },
            { label: 'Quản lý công trình', link: '' },
            { label: 'Quản lý vật tư', link: '' },
        ]
    }
]

type Prop = {
}

export const SideBar = () => {
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
        </div>
    )
}

const container = css`
    width: 250px;
    height: 100vh;
    display: flex;
    color: white;
    flex-direction: column;
    background-color: #131357;
    ul {

        list-style: none;
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