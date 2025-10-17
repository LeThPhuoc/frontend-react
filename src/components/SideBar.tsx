/** @jsxImportSource @emotion/react */

import React, { use, useState } from "react";
import { css } from "@emotion/react";

const listRender = [
    {
        label: 'Quản trị viên', items: [
            { label: 'Quản lý tài khoản', link: '/admin/accounts' },
            { label: 'Quản lý công trình', link: '/admin/constructions' },
            { label: 'Quản lý vật tư', link: '/admin/materials' },
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
                        <li key={index} onClick={() => handleClickShowItems(index)} css={group}>
                            {group.label}
                            <ul>
                                {group.items.map((item, index) => {
                                    return (
                                        <li key={index}>
                                            {item.label}
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

const container = css`
    width: 400px;
    display: flex;
    flex-direction: column;
    ul {

        list-style: none;
    }
`

const group = css`
    cursor: pointer;
`