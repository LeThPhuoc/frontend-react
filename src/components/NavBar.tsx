/** @jsxImportSource @emotion/react */

import { css } from "@emotion/react"
import { useEffect, useMemo, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { Button } from "./Button/button"
import { flex, justifyBetween } from "../style/style"
import { useClickOutside } from "./useClickOutSide"

export const NavBar = () => {
    const [showSideBar, setShowSideBar] = useState(false)
    const documentRef = useClickOutside<HTMLDivElement>(() => {
        setShowSideBar(false)
    })
    const navigate = useNavigate()
    let role = localStorage.getItem('role')

    useEffect(() => {
        role = localStorage.getItem('role')
    }, [])

    const list = useMemo(() => {
        const reder = [
            {
                label: 'Quản lý công việc', items: [
                    { label: 'Quản lý tài khoản nhân viên', link: '/staff' },
                    { label: 'Quản lý công trình', link: '/project' },
                    { label: 'Checkin công việc', link: '/checkin_page' },
                ]
            }
        ].map((m) => {
            return {
                ...m, items: m.items.filter((f) => {
                    if (role == 'staff') {
                        return f.link !== '/staff'
                    }
                    return f
                })
            }
        })

        return reder
    }, [role])

    const [activeIndex, setActiveIndex] = useState(list.map(() => false));
    const handleClickShowItems = (index: number) => {
        setActiveIndex((prev) => [...prev].map((m, prevIndex) => {
            if (prevIndex == index) {
                return !m
            }
            return m
        }));
    }

    return <div css={container} ref={documentRef}>
        <div css={[flex, justifyBetween, css`
            height: 100%;
        `]}>

            <button
                css={css`
                background-color: ${showSideBar ? "#3b3dbb" : ''};
                height: 100%;
                width: 40px;
            `}
                onClick={() => setShowSideBar(!showSideBar)}
            >
                <i css={iconSideBar} className="fa-solid fa-list"></i>
            </button>
        </div>

        {showSideBar && (
            <div css={containerSideBar}>
                <ul>
                    {list.map((group, index) => {
                        let showItems = activeIndex[index];
                        return (
                            <li key={index}>
                                <div css={contentGroupLabel} onClick={() => handleClickShowItems(index)}>
                                    {group.label}
                                </div>
                                {showItems && (
                                    <ul css={groupItem}>
                                        {group.items.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    <NavLink to={item.link}>{item.label}</NavLink>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                )}
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
        )}
    </div>
}

const container = css`
    height: 40px;
    width: 100%;
    background-color: #0089e5;
    z-index: 10;
    position: fixed;
    top: 0px;
    left: 0px;
`

const iconSideBar = css`
    font-size: 20px;
    color: white;
`

const containerSideBar = css`
    position: fixed;
    left: 0px;
    top: 40px;
    width: 250px;
    height: calc(100% - 40px);
    display: flex;
    color: white;
    flex-direction: column;
    justify-content: space-between;
    background-color: #0c0c4d;
    z-index: 10;
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

const groupItem = css`
  li>a {
    text-decoration: none;
    color: white;
  }
`