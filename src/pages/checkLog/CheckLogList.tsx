/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useRef, useState } from "react"
import { useDebounce } from "../../components/useDebounce"
import { useNavigate } from "react-router-dom"
import { useProjectList } from "../../features/project/useProjectList"
import { Loading } from "../../components/Loading"

export const CheckLogList = () => {
    const ref = useRef(null)
    const [searchTerm, setSearchTerm] = useState('')
    const debouncedValue = useDebounce(searchTerm)
    const { list, isLoading } = useProjectList({ rootRef: ref, searchTerm: debouncedValue, per_page: 10 })
    const navigate = useNavigate()
    const [hoveredId, setHoveredId] = useState<number | null>(null)

    return (
        <div css={container}>
            {isLoading && <Loading />}

            {/* Header Section */}
            <div css={header}>
                <div css={headerLeft}>
                    <div css={pageIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 css={pageTitle}>Danh sách Check-in</h1>
                        <p css={pageSubtitle}>Quản lý và theo dõi tiến độ công việc</p>
                    </div>
                </div>
                <div css={headerRight}>
                    <div css={searchContainer}>
                        <svg css={searchIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.35-4.35"></path>
                        </svg>
                        <TextField
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            placeholder="Tìm kiếm dự án..."
                        />
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div css={statsContainer}>
                <div css={statCard}>
                    <div css={statIcon('#6366f1')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="3" y1="9" x2="21" y2="9"></line>
                            <line x1="9" y1="21" x2="9" y2="9"></line>
                        </svg>
                    </div>
                    <div css={statInfo}>
                        <span css={statValue}>{list?.length || 0}</span>
                        <span css={statLabel}>Tổng dự án</span>
                    </div>
                </div>
            </div>

            {/* Project List */}
            <div css={contentListProject} ref={ref}>
                {list?.length === 0 && !isLoading && (
                    <div css={emptyState}>
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <path d="M8 15h8M9 9h.01M15 9h.01"></path>
                        </svg>
                        <p>Không tìm thấy dự án nào</p>
                    </div>
                )}

                {list?.map((item) => {
                    const isHovered = hoveredId === item.id
                    return (
                        <div
                            css={projectCard(isHovered)}
                            key={item.id}
                            onClick={() => navigate(`/checkin_page/${item.id}`)}
                            onMouseEnter={() => setHoveredId(item.id ?? null)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Card Header */}
                            <div css={cardHeader}>
                                <div css={cardIcon}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                                    </svg>
                                </div>
                                <div css={cardTitleSection}>
                                    <h3 css={cardTitle}>{item.name}</h3>
                                    <span css={cardBadge}>Đang hoạt động</span>
                                </div>
                            </div>

                            {/* Divider */}
                            <div css={cardDivider}></div>

                            {/* Card Content */}
                            <div css={cardContent}>
                                <div css={fieldItem}>
                                    <div css={fieldIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="17" y1="10" x2="3" y2="10"></line>
                                            <line x1="21" y1="6" x2="3" y2="6"></line>
                                            <line x1="21" y1="14" x2="3" y2="14"></line>
                                            <line x1="17" y1="18" x2="3" y2="18"></line>
                                        </svg>
                                    </div>
                                    <div css={fieldContent}>
                                        <span css={fieldLabel}>Mô tả</span>
                                        <span css={fieldValue}>{item.description || 'Chưa có mô tả'}</span>
                                    </div>
                                </div>

                                <div css={fieldItem}>
                                    <div css={fieldIcon}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                            <circle cx="12" cy="10" r="3"></circle>
                                        </svg>
                                    </div>
                                    <div css={fieldContent}>
                                        <span css={fieldLabel}>Địa chỉ</span>
                                        <span css={fieldValue}>{item.address || 'Chưa cập nhật'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div css={cardFooter}>
                                <div css={dateItem}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{item.start_date || 'N/A'}</span>
                                </div>
                                <span css={dateSeparator}>→</span>
                                <div css={dateItem}>
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    <span>{item.end_date || 'N/A'}</span>
                                </div>
                            </div>

                            {/* Hover Arrow */}
                            <div css={hoverArrow(isHovered)}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

// Animations
const fadeIn = css`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`

const shimmer = css`
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
`

// Styles
const container = css`
    padding: 24px 32px;
    min-height: 100%;
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    display: flex;
    gap: 24px;
    flex-direction: column;
`

const header = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    animation: ${fadeIn} 0.5s ease-out;
`

const headerLeft = css`
    display: flex;
    align-items: center;
    gap: 16px;
`

const pageIcon = css`
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    border-radius: 16px;
    color: white;
    box-shadow: 0 8px 24px rgba(99, 102, 241, 0.35);
`

const pageTitle = css`
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
    margin: 0;
    letter-spacing: -0.5px;
`

const pageSubtitle = css`
    font-size: 14px;
    color: #64748b;
    margin: 4px 0 0 0;
`

const headerRight = css`
    display: flex;
    gap: 12px;
    align-items: center;
`

const searchContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    
    input {
        padding-left: 40px !important;
        border-radius: 12px !important;
        border: 2px solid #e2e8f0 !important;
        background: white !important;
        transition: all 0.3s ease !important;
        
        &:focus {
            border-color: #6366f1 !important;
            box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1) !important;
        }
    }
`

const searchIcon = css`
    position: absolute;
    left: 12px;
    color: #94a3b8;
    z-index: 1;
`

const statsContainer = css`
    display: flex;
    gap: 16px;
    animation: ${fadeIn} 0.5s ease-out 0.1s backwards;
`

const statCard = css`
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 24px;
    background: white;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`

const statIcon = (color: string) => css`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${color}15;
    border-radius: 12px;
    color: ${color};
`

const statInfo = css`
    display: flex;
    flex-direction: column;
`

const statValue = css`
    font-size: 24px;
    font-weight: 700;
    color: #1e293b;
`

const statLabel = css`
    font-size: 12px;
    color: #64748b;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const contentListProject = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    grid-auto-rows: minmax(260px, auto);
    gap: 20px;
    height: calc(100vh - 280px);
    overflow-y: auto;
    padding: 4px;
    animation: ${fadeIn} 0.5s ease-out 0.2s backwards;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 4px;
        
        &:hover {
            background: #94a3b8;
        }
    }
`

const emptyState = css`
    grid-column: 1 / -1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #94a3b8;
    
    p {
        margin-top: 16px;
        font-size: 16px;
    }
`

const projectCard = (isHovered: boolean) => css`
    position: relative;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 16px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    border: 2px solid ${isHovered ? '#6366f1' : 'transparent'};
    box-shadow: ${isHovered
        ? '0 20px 40px rgba(99, 102, 241, 0.2)'
        : '0 4px 12px rgba(0, 0, 0, 0.05)'};
    transform: ${isHovered ? 'translateY(-4px)' : 'none'};
    overflow: hidden;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: 4px;
        background: linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%);
        transform: scaleX(${isHovered ? 1 : 0});
        transition: transform 0.3s ease;
    }
`

const cardHeader = css`
    display: flex;
    align-items: flex-start;
    gap: 14px;
`

const cardIcon = css`
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    color: #0284c7;
    flex-shrink: 0;
`

const cardTitleSection = css`
    flex: 1;
    min-width: 0;
`

const cardTitle = css`
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0 0 6px 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`

const cardBadge = css`
    display: inline-block;
    padding: 4px 10px;
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #16a34a;
    font-size: 11px;
    font-weight: 600;
    border-radius: 6px;
    text-transform: uppercase;
    letter-spacing: 0.3px;
`

const cardDivider = css`
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
    margin: 16px 0;
`

const cardContent = css`
    display: flex;
    flex-direction: column;
    gap: 12px;
    flex: 1;
`

const fieldItem = css`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`

const fieldIcon = css`
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 8px;
    color: #64748b;
    flex-shrink: 0;
`

const fieldContent = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`

const fieldLabel = css`
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const fieldValue = css`
    font-size: 13px;
    color: #475569;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`

const cardFooter = css`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px dashed #e2e8f0;
`

const dateItem = css`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    color: #64748b;
    
    svg {
        color: #94a3b8;
    }
`

const dateSeparator = css`
    color: #cbd5e1;
    font-size: 14px;
`

const hoverArrow = (isHovered: boolean) => css`
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%) translateX(${isHovered ? 0 : '10px'});
    opacity: ${isHovered ? 1 : 0};
    color: #6366f1;
    transition: all 0.3s ease;
`