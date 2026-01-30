/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react"
import { useEffect, useMemo, useState } from "react"
import { NavLink, useNavigate, useLocation } from "react-router-dom"
import { useClickOutside } from "./useClickOutSide"

export const NavBar = () => {
    const [showSideBar, setShowSideBar] = useState(false)
    const documentRef = useClickOutside<HTMLDivElement>(() => {
        setShowSideBar(false)
    })
    const navigate = useNavigate()
    const location = useLocation()
    let role = localStorage.getItem('role')

    useEffect(() => {
        role = localStorage.getItem('role')
    }, [])

    const menuItems = useMemo(() => {
        const items = [
            {
                label: 'Quản lý tài khoản',
                link: '/staff',
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                )
            },
            {
                label: 'Quản lý công trình',
                link: '/project',
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="3" y1="9" x2="21" y2="9"></line>
                        <line x1="9" y1="21" x2="9" y2="9"></line>
                    </svg>
                )
            },
            {
                label: role === 'staff' ? 'Checkin công việc' : 'Quản lý checkin',
                link: '/checkin_list',
                icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                    </svg>
                )
            },
        ]

        if (role === 'staff') {
            return items.filter(item => item.link !== '/staff')
        }
        return items
    }, [role])

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

    return (
        <div css={container} ref={documentRef}>
            <div css={navContent}>
                {/* Menu Toggle Button */}
                <button
                    css={menuToggleBtn(showSideBar)}
                    onClick={() => setShowSideBar(!showSideBar)}
                    aria-label="Toggle menu"
                >
                    <div css={hamburgerIcon(showSideBar)}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>

                {/* Logo */}
                <div css={logoContainer}>
                    <div css={logoIcon}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <span css={logoText}>Construction Manager</span>
                </div>

                {/* Right Section */}
                <div css={rightSection}>
                    <div css={userBadge}>
                        <span css={roleBadge}>{role === 'staff' ? 'Nhân viên' : 'Admin'}</span>
                    </div>
                </div>
            </div>

            {/* Sidebar Overlay */}
            {showSideBar && <div css={overlay} onClick={() => setShowSideBar(false)}></div>}

            {/* Sidebar Menu */}
            <div css={sidebarContainer(showSideBar)}>
                {/* Sidebar Header */}
                <div css={sidebarHeader}>
                    <div css={sidebarLogoIcon}>
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                            <polyline points="9 22 9 12 15 12 15 22"></polyline>
                        </svg>
                    </div>
                    <div css={sidebarLogoText}>
                        <span css={sidebarTitle}>Construction</span>
                        <span css={sidebarSubtitle}>Management System</span>
                    </div>
                </div>

                {/* Divider */}
                <div css={divider}></div>

                {/* Menu Label */}
                <span css={menuLabel}>MENU CHÍNH</span>

                {/* Menu Items */}
                <nav css={menuNav}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.link
                        const isHovered = hoveredIndex === index
                        return (
                            <NavLink
                                key={index}
                                to={item.link}
                                css={menuItem(isActive, isHovered)}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                onClick={() => setShowSideBar(false)}
                            >
                                <span css={menuItemIcon(isActive)}>{item.icon}</span>
                                <span css={menuItemText}>{item.label}</span>
                                {isActive && <span css={activeIndicator}></span>}
                            </NavLink>
                        )
                    })}
                </nav>

                {/* Logout Button */}
                <div css={sidebarFooter}>
                    <div css={divider}></div>
                    <button
                        css={logoutButton}
                        onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}
                    >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                            <polyline points="16 17 21 12 16 7"></polyline>
                            <line x1="21" y1="12" x2="9" y2="12"></line>
                        </svg>
                        <span>Đăng xuất</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

// Animations
const slideIn = css`
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
`

const pulse = css`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.6; }
`

const shimmer = css`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`

// Styles
const container = css`
    height: 56px;
    width: 100%;
    background: linear-gradient(135deg, #1e3a5f 0%, #0d1b2a 100%);
    z-index: 100;
    position: fixed;
    top: 0;
    left: 0;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`

const navContent = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    padding: 0 16px;
`

const menuToggleBtn = (isActive: boolean) => css`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
    border: none;
    border-radius: 12px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
        background: rgba(99, 102, 241, 0.4);
        transform: scale(1.05);
    }
`

const hamburgerIcon = (isActive: boolean) => css`
    width: 20px;
    height: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    span {
        display: block;
        width: 100%;
        height: 2px;
        background: white;
        border-radius: 2px;
        transition: all 0.3s ease;
        transform-origin: center;

        &:nth-of-type(1) {
            transform: ${isActive ? 'translateY(6px) rotate(45deg)' : 'none'};
        }
        &:nth-of-type(2) {
            opacity: ${isActive ? 0 : 1};
        }
        &:nth-of-type(3) {
            transform: ${isActive ? 'translateY(-6px) rotate(-45deg)' : 'none'};
        }
    }
`

const logoContainer = css`
    display: flex;
    align-items: center;
    gap: 12px;
`

const logoIcon = css`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 10px;
    color: white;
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
`

const logoText = css`
    font-size: 16px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.5px;

    @media (max-width: 600px) {
        display: none;
    }
`

const rightSection = css`
    display: flex;
    align-items: center;
    gap: 12px;
`

const userBadge = css`
    display: flex;
    align-items: center;
    gap: 8px;
`

const roleBadge = css`
    padding: 6px 14px;
    background: linear-gradient(135deg, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.8) 100%);
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    color: white;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const overlay = css`
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    z-index: 90;
`

const sidebarContainer = (isOpen: boolean) => css`
    position: fixed;
    left: 0;
    top: 56px;
    width: 280px;
    height: calc(100vh - 56px);
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #1a1a4e 0%, #0d0d2b 100%);
    z-index: 95;
    transform: translateX(${isOpen ? '0' : '-100%'});
    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: ${isOpen ? '4px 0 24px rgba(0, 0, 0, 0.3)' : 'none'};
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }
`

const sidebarHeader = css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 24px 20px;
    position: relative;
    z-index: 1;
`

const sidebarLogoIcon = css`
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 14px;
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
`

const sidebarLogoText = css`
    display: flex;
    flex-direction: column;
`

const sidebarTitle = css`
    font-size: 18px;
    font-weight: 700;
    color: white;
    letter-spacing: 0.5px;
`

const sidebarSubtitle = css`
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 500;
    letter-spacing: 0.5px;
`

const divider = css`
    height: 1px;
    margin: 0 20px;
    background: linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%);
`

const menuLabel = css`
    display: block;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
    letter-spacing: 1.5px;
    padding: 20px 20px 12px;
    position: relative;
    z-index: 1;
`

const menuNav = css`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 0 12px;
    flex: 1;
    position: relative;
    z-index: 1;
`

const menuItem = (isActive: boolean, isHovered: boolean) => css`
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 14px 16px;
    border-radius: 12px;
    text-decoration: none;
    color: ${isActive ? 'white' : 'rgba(255, 255, 255, 0.7)'};
    background: ${isActive
        ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)'
        : isHovered
            ? 'rgba(255, 255, 255, 0.08)'
            : 'transparent'};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    overflow: hidden;
    box-shadow: ${isActive ? '0 8px 24px rgba(99, 102, 241, 0.35)' : 'none'};

    &:hover {
        color: white;
        transform: translateX(4px);
    }

    ${isActive && `
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
            background-size: 200% 100%;
            animation: ${shimmer} 2s infinite;
        }
    `}
`

const menuItemIcon = (isActive: boolean) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: ${isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    transition: all 0.3s ease;
    flex-shrink: 0;
`

const menuItemText = css`
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const activeIndicator = css`
    position: absolute;
    right: 16px;
    width: 8px;
    height: 8px;
    background: white;
    border-radius: 50%;
    animation: ${pulse} 2s infinite;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
`

const sidebarFooter = css`
    padding: 16px 12px 24px;
    position: relative;
    z-index: 1;
`

const logoutButton = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    width: 100%;
    padding: 14px 20px;
    margin-top: 16px;
    border: none;
    border-radius: 12px;
    background: linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%);
    color: white;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 16px rgba(239, 68, 68, 0.3);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
    }

    &:active {
        transform: translateY(0);
    }

    svg {
        transition: transform 0.3s ease;
    }

    &:hover svg {
        transform: translateX(4px);
    }
`