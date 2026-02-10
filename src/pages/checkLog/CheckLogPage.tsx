/** @jsxImportSource @emotion/react */

import { css, keyframes } from "@emotion/react"
import { TextField } from "../../components/input/TextField"
import { useEffect, useMemo, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAlert } from "../../components/Alert/AlertProvider"
import { useFormik } from "formik"
import { Loading } from "../../components/Loading"
import { Button } from "../../components/Button/button"
import { DataProjectCheckLog, getProjectCheckLogDetail } from "../../api/checkLog/getProjectCheckLogDetailApi"
import { checkinApi } from "../../api/checkLog/checkinApi"
import { checkoutApi } from "../../api/checkLog/checkoutApi"
import { onlyNumber } from "../../hooks/onlyNumber"
import { DataProjectTimeSheet, getDetailProjectTimeSheetApi } from "../../api/timesheet/getDetailTimeSheetApi"

type FormikType = {
    project_detail: DataProjectCheckLog | null,
    project_timesheet: DataProjectTimeSheet | null,
}

export const CheckLogPage = () => {
    const { showAlert } = useAlert()
    const [isLoading, setIsLoading] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()
    const idUser = JSON.parse(localStorage.getItem('user') ?? '').id
    const roleUser = localStorage.getItem('role')
    const [changeTimeSheet, setChangeTimeSheet] = useState<Record<number, string | number>>({});
    const [isEditTimeSheet, setIsEditTimeSheet] = useState<Record<number, boolean>>({});
    const [searchStaff, setSearchStaff] = useState<string>('');

    const formik = useFormik<FormikType>({
        initialValues: {
            project_detail: null,
            project_timesheet: null
        },
        validateOnMount: false,
        validateOnChange: false,
        validateOnBlur: false,
        onSubmit: async values => {

        }
    })

    const fetchData = async () => {
        setIsLoading(true)
        if (roleUser == 'staff') {
            await getProjectCheckLogDetail({
                project_id: id ?? '',
                success: (data) => {
                    let listStaff = data.staff ?? []
                    if (idUser && roleUser === 'staff' && data.staff) {
                        const firstStaff = data.staff.find((m) => m.id == idUser)
                        listStaff = firstStaff ? [firstStaff, ...data.staff?.filter((m) => m.id != idUser)] : data.staff
                    }
                    formik.setFieldValue('project_detail', data)
                }
            })
        } else {
            await getDetailProjectTimeSheetApi({
                project_id: id ?? '',
                success: (data) => {
                    formik.setFieldValue('project_timesheet', data)
                }
            })
        }
        setIsLoading(false)
    }

    const handleCheckin = async (staff_id: number) => {
        if (!id) return;
        setIsLoading(true)
        await checkinApi({
            project_id: id,
            staff_id: staff_id.toString(),
        }
        )
        setIsLoading(false)
        fetchData()
    }

    const handleCheckout = async (staff_id: number) => {
        if (!id) return;
        setIsLoading(true)
        await checkoutApi({
            project_id: id,
            staff_id: staff_id.toString(),
        }
        )
        setIsLoading(false)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleSearchTimeSheetStaff = useMemo(() => {
        if (searchStaff !== '') {
            return [...formik.values.project_timesheet?.staff ?? []].filter((staff) => staff.name.toLowerCase().includes(searchStaff.toLowerCase()))
        }
        return formik.values.project_timesheet?.staff
    }, [searchStaff, formik.values.project_timesheet])

    const projectData = formik.values.project_detail || formik.values.project_timesheet

    return (
        <div css={container}>
            {isLoading && <Loading />}

            {/* Header Section */}
            <div css={header}>
                <div css={headerLeft}>
                    <button css={backButton} onClick={() => navigate('/checkin_page')}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <div css={pageIcon}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                        </svg>
                    </div>
                    <div>
                        <h1 css={pageTitle}>Chi tiết Check-in</h1>
                        <p css={pageSubtitle}>{projectData?.name || 'Đang tải...'}</p>
                    </div>
                </div>
                <div css={headerRight}>
                    <div css={statusBadge}>
                        <span css={statusDot}></span>
                        Đang hoạt động
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div css={mainContent}>
                {/* Project Info Card */}
                <div css={projectInfoCard}>
                    <div css={cardHeader}>
                        <div css={cardHeaderIcon}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                        </div>
                        <h2 css={cardTitle}>Thông tin dự án</h2>
                    </div>
                    <div css={cardDivider}></div>
                    <div css={projectInfoContent}>
                        <div css={infoItem}>
                            <div css={infoIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                                </svg>
                            </div>
                            <div css={infoContent}>
                                <span css={infoLabel}>Tên dự án</span>
                                <span css={infoValue}>{projectData?.name || 'N/A'}</span>
                            </div>
                        </div>
                        <div css={infoItem}>
                            <div css={infoIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="17" y1="10" x2="3" y2="10"></line>
                                    <line x1="21" y1="6" x2="3" y2="6"></line>
                                    <line x1="21" y1="14" x2="3" y2="14"></line>
                                    <line x1="17" y1="18" x2="3" y2="18"></line>
                                </svg>
                            </div>
                            <div css={infoContent}>
                                <span css={infoLabel}>Mô tả</span>
                                <span css={infoValue}>{projectData?.description || 'Chưa có mô tả'}</span>
                            </div>
                        </div>
                        <div css={infoItem}>
                            <div css={infoIcon}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                                    <circle cx="12" cy="10" r="3"></circle>
                                </svg>
                            </div>
                            <div css={infoContent}>
                                <span css={infoLabel}>Địa chỉ</span>
                                <span css={infoValue}>{projectData?.address || 'Chưa cập nhật'}</span>
                            </div>
                        </div>
                        <div css={dateRow}>
                            <div css={dateBox}>
                                <div css={dateIconWrapper}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <div>
                                    <span css={dateLabel}>Bắt đầu</span>
                                    <span css={dateValue}>{projectData?.start_date || 'N/A'}</span>
                                </div>
                            </div>
                            <div css={dateArrow}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </div>
                            <div css={dateBox}>
                                <div css={dateIconWrapper}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                </div>
                                <div>
                                    <span css={dateLabel}>Kết thúc</span>
                                    <span css={dateValue}>{projectData?.end_date || 'N/A'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Timesheet Section */}
                <div css={timesheetCard}>
                    <div css={timesheetHeader}>
                        <div css={timesheetHeaderLeft}>
                            <div css={cardHeaderIcon}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                            </div>
                            <h2 css={cardTitle}>Bảng chấm công</h2>
                        </div>
                        <div css={searchContainer}>
                            <svg css={searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.35-4.35"></path>
                            </svg>
                            <TextField
                                value={searchStaff}
                                placeholder="Tìm kiếm nhân viên..."
                                onChange={(e) => {
                                    const value = e.target.value.toLowerCase();
                                    setSearchStaff(value);
                                }}
                            />
                        </div>
                    </div>
                    <div css={cardDivider}></div>
                    <div css={tableWrapper}>
                        <table css={tableStyle}>
                            {roleUser == 'staff' ? (
                                <>
                                    <thead>
                                        <tr>
                                            <th>Nhân viên</th>
                                            <th>Vai trò</th>
                                            <th>Tổng giờ trong dự án</th>
                                            <th>Thời gian hôm nay</th>
                                            <th>Check-in</th>
                                            <th>Check-out</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formik.values.project_detail?.staff?.map((m, index) => {
                                            const isCurrentUser = m.id == idUser && roleUser === 'staff'
                                            return (
                                                <tr key={m.id} css={tableRow(index % 2 === 0)}>
                                                    <td>
                                                        <div css={staffCell}>
                                                            <div css={staffAvatar(isCurrentUser)}>
                                                                {m.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div css={staffInfo}>
                                                                <span css={staffName}>{m.name}</span>
                                                                {isCurrentUser && <span css={youBadge}>Bạn</span>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span css={roleBadge}>{m.role}</span></td>
                                                    <td>
                                                        <div css={timeDisplay}>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12 6 12 12 16 14"></polyline>
                                                            </svg>
                                                            {m.total_hours} giờ
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div css={timeDisplay}>
                                                            {`${Math.floor(Number(m.total_hours_today) / 60)} giờ ${Number(m.total_hours_today) % 60} phút`}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div css={actionCell}>
                                                            {idUser == m.id && roleUser == 'staff' && (
                                                                m.checkin_time && !m.checkout_time
                                                                    ? <span css={timeStamp}>{m.checkin_time}</span>
                                                                    : <Button
                                                                        isFullWidth
                                                                        onClick={() => handleCheckin(m.id)}
                                                                        disabled={(!!m.checkin_time && !m.checkout_time) || (m.id !== idUser)}
                                                                    >
                                                                        <span css={buttonContent}>
                                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                                <polyline points="9 11 12 14 22 4"></polyline>
                                                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                                                                            </svg>
                                                                            Check-in
                                                                        </span>
                                                                    </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div css={actionCell}>
                                                            {idUser == m.id && roleUser == 'staff' && (
                                                                <Button
                                                                    isFullWidth
                                                                    onClick={() => handleCheckout(m.id)}
                                                                    disabled={(!m.checkin_time || !!m.checkout_time) || (m.id !== idUser)}
                                                                >
                                                                    <span css={buttonContent}>
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                                                                            <polyline points="16 17 21 12 16 7"></polyline>
                                                                            <line x1="21" y1="12" x2="9" y2="12"></line>
                                                                        </svg>
                                                                        Check-out
                                                                    </span>
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </>
                            ) : (
                                <>
                                    <thead>
                                        <tr>
                                            <th>Nhân viên</th>
                                            <th>Vai trò</th>
                                            <th>Tổng giờ làm</th>
                                            <th>Thời gian hôm nay</th>
                                            <th>Tổng số công</th>
                                            <th>Số công hôm nay</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {handleSearchTimeSheetStaff?.map((m, index) => {
                                            const isCurrentUser = m.id == idUser && roleUser === 'staff'
                                            return (
                                                <tr key={m.id} css={tableRow(index % 2 === 0)}>
                                                    <td>
                                                        <div css={staffCell}>
                                                            <div css={staffAvatar(false)}>
                                                                {m.name.charAt(0).toUpperCase()}
                                                            </div>
                                                            <div css={staffInfo}>
                                                                <span css={staffName}>{m.name}</span>
                                                                {isCurrentUser && <span css={youBadge}>Bạn</span>}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td><span css={roleBadge}>{m.role}</span></td>
                                                    <td>
                                                        <div css={timeDisplay}>
                                                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                <circle cx="12" cy="12" r="10"></circle>
                                                                <polyline points="12 6 12 12 16 14"></polyline>
                                                            </svg>
                                                            {m.total_hours} giờ
                                                        </div>
                                                    </td>
                                                    <td css={css`
                                                            width: 120px
                                                        `}>
                                                        <div css={timeDisplay}>
                                                            {`${Math.floor(Number(m.total_hours_today) / 60)} giờ ${Number(m.total_hours_today) % 60} phút`}
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div css={statsCell}>
                                                            <span css={statsNumber}>{m.total_timekeeping_number}</span>
                                                            <span css={statsLabel}>công</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div css={editableCell}>
                                                            {isEditTimeSheet[m.id] ? (
                                                                <TextField
                                                                    isFocus
                                                                    size="sm"
                                                                    isFullWidth
                                                                    value={changeTimeSheet[m.id] ?? ''}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value;
                                                                        setChangeTimeSheet((prev) => ({
                                                                            ...prev,
                                                                            [m.id]: onlyNumber(value),
                                                                        }));
                                                                    }}
                                                                />
                                                            ) : (
                                                                <div css={statsCell}>
                                                                    <span css={statsNumber}>{m.total_timekeeping_number_today}</span>
                                                                    <span css={statsLabel}>công</span>
                                                                </div>
                                                            )}
                                                            <div css={editActions}>
                                                                {isEditTimeSheet[m.id] && (
                                                                    <button
                                                                        css={saveButton}
                                                                        disabled={
                                                                            changeTimeSheet[m.id] === m.total_timekeeping_number_today?.toString() ||
                                                                            !changeTimeSheet[m.id]
                                                                        }
                                                                        onClick={() => console.log(changeTimeSheet[m.id], m.total_timekeeping_number_today)}
                                                                    >
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <polyline points="20 6 9 17 4 12"></polyline>
                                                                        </svg>
                                                                    </button>
                                                                )}
                                                                <button
                                                                    css={editButton(isEditTimeSheet[m.id])}
                                                                    onClick={() => {
                                                                        setIsEditTimeSheet({ [m.id]: isEditTimeSheet[m.id] ? false : true })
                                                                        if (
                                                                            !!m.total_timekeeping_number_today &&
                                                                            m.total_timekeeping_number_today !== '' &&
                                                                            Number(m.total_timekeeping_number_today) !== 0
                                                                        ) {
                                                                            setChangeTimeSheet({
                                                                                [m.id]: m.total_timekeeping_number_today ?? '',
                                                                            });
                                                                        }
                                                                    }}
                                                                >
                                                                    {isEditTimeSheet[m.id] ? (
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <line x1="18" y1="6" x2="6" y2="18"></line>
                                                                            <line x1="6" y1="6" x2="18" y2="18"></line>
                                                                        </svg>
                                                                    ) : (
                                                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                                                        </svg>
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </>
                            )}
                        </table>
                        {(roleUser == 'staff' ? formik.values.project_detail?.staff?.length : handleSearchTimeSheetStaff?.length) === 0 && (
                            <div css={emptyState}>
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <p>Không tìm thấy nhân viên nào</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

// Animations
const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`

const pulse = keyframes`
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
`

// Styles
const container = css`
    padding: 24px 32px;
    height: 100%;
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

const backButton = css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    cursor: pointer;
    color: #64748b;
    transition: all 0.2s ease;

    &:hover {
        border-color: #6366f1;
        color: #6366f1;
        background: #f0f0ff;
    }
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

const statusBadge = css`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #16a34a;
    font-size: 13px;
    font-weight: 600;
    border-radius: 20px;
`

const statusDot = css`
    width: 8px;
    height: 8px;
    background: #16a34a;
    border-radius: 50%;
    animation: ${pulse} 2s ease-in-out infinite;
`

const mainContent = css`
    display: flex;
    height: calc(100% - 80px);
    gap: 24px;
    flex: 1;
    animation: ${fadeIn} 0.5s ease-out 0.1s backwards;

    @media (max-width: 1200px) {
        flex-direction: column;
    }
`

const projectInfoCard = css`
    width: 300px;
    flex-shrink: 0;
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    align-self: flex-start;

    @media (max-width: 1200px) {
        width: 100%;
    }
`

const cardHeader = css`
    display: flex;
    align-items: center;
    gap: 12px;
`

const cardHeaderIcon = css`
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
    border-radius: 12px;
    color: #0284c7;
`

const cardTitle = css`
    font-size: 16px;
    font-weight: 600;
    color: #1e293b;
    margin: 0;
`

const cardDivider = css`
    height: 1px;
    background: linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%);
    margin: 16px 0;
`

const projectInfoContent = css`
    display: flex;
    flex-direction: column;
    gap: 16px;
`

const infoItem = css`
    display: flex;
    align-items: flex-start;
    gap: 12px;
`

const infoIcon = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    border-radius: 8px;
    color: #64748b;
    flex-shrink: 0;
`

const infoContent = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`

const infoLabel = css`
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const infoValue = css`
    font-size: 14px;
    color: #334155;
    word-break: break-word;
`

const dateRow = css`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
    padding-top: 16px;
    border-top: 1px dashed #e2e8f0;
`

const dateBox = css`
    flex: 1;
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 10px;
    background: #f8fafc;
    border-radius: 12px;
`

const dateIconWrapper = css`
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: 8px;
    color: #6366f1;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`

const dateLabel = css`
    display: block;
    font-size: 10px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const dateValue = css`
    display: block;
    font-size: 12px;
    font-weight: 600;
    color: #334155;
`

const dateArrow = css`
    color: #cbd5e1;
`

const timesheetCard = css`
    flex: 1;
    background: white;
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    display: flex;
    flex-direction: column;
    min-width: 0;
`

const timesheetHeader = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
`

const timesheetHeaderLeft = css`
    display: flex;
    align-items: center;
    gap: 12px;
`

const searchContainer = css`
    position: relative;
    display: flex;
    align-items: center;
    
    input {
        padding-left: 36px !important;
        border-radius: 10px !important;
        border: 2px solid #e2e8f0 !important;
        background: #f8fafc !important;
        transition: all 0.3s ease !important;
        font-size: 14px !important;
        
        &:focus {
            border-color: #6366f1 !important;
            background: white !important;
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

const tableWrapper = css`
    flex: 1;
    overflow: auto;
    margin-top: 8px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;

    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f5f9;
    }

    &::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 3px;
        
        &:hover {
            background: #94a3b8;
        }
    }
`

const tableStyle = css`
    width: 100%;
    border-collapse: collapse;
    min-width: 700px;

    thead {
        position: sticky;
        top: 0;
        z-index: 10;

        tr {
            background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
        }

        th {
            padding: 14px 16px;
            text-align: left;
            font-size: 12px;
            font-weight: 600;
            color: white;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;

            &:first-of-type {
                border-radius: 12px 0 0 0;
            }

            &:last-of-type {
                border-radius: 0 12px 0 0;
            }
        }
    }

    tbody td {
        padding: 12px 16px;
        font-size: 14px;
        color: #334155;
        border-bottom: 1px solid #f1f5f9;
    }
`

const tableRow = (isEven: boolean) => css`
    background: ${isEven ? '#fafbfc' : 'white'};
    transition: background 0.2s ease;

    &:hover {
        background: #f0f9ff;
    }

    &:last-of-type td {
        border-bottom: none;

        &:first-of-type {
            border-radius: 0 0 0 12px;
        }

        &:last-of-type {
            border-radius: 0 0 12px 0;
        }
    }
`

const staffCell = css`
    display: flex;
    align-items: center;
    gap: 12px;
`

const staffAvatar = (isCurrentUser: boolean) => css`
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isCurrentUser
        ? 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)'
        : 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)'};
    color: ${isCurrentUser ? 'white' : '#0284c7'};
    font-size: 14px;
    font-weight: 600;
    border-radius: 10px;
    flex-shrink: 0;
`

const staffInfo = css`
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const staffName = css`
    font-weight: 500;
    color: #1e293b;
`

const youBadge = css`
    font-size: 10px;
    color: #6366f1;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
`

const roleBadge = css`
    display: inline-block;
    padding: 4px 10px;
    background: #f1f5f9;
    color: #475569;
    font-size: 12px;
    font-weight: 500;
    border-radius: 6px;
`

const timeDisplay = css`
    display: flex;
    align-items: center;
    gap: 6px;
    color: #64748b;

    svg {
        color: #94a3b8;
    }
`

const actionCell = css`
    min-width: 100px;
`

const timeStamp = css`
    display: inline-block;
    padding: 6px 12px;
    background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
    color: #16a34a;
    font-size: 12px;
    font-weight: 600;
    border-radius: 8px;
`

const buttonContent = css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
`

const statsCell = css`
    display: flex;
    align-items: baseline;
    gap: 4px;
`

const statsNumber = css`
    font-size: 18px;
    font-weight: 700;
    color: #6366f1;
`

const statsLabel = css`
    font-size: 12px;
    color: #94a3b8;
`

const editableCell = css`
    display: flex;
    align-items: center;
    gap: 12px;
    justify-content: space-between;
`

const editActions = css`
    display: flex;
    gap: 6px;
`

const saveButton = css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%);
    border: none;
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
        transform: scale(1.05);
        box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`

const editButton = (isActive: boolean) => css`
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${isActive ? '#fef2f2' : '#f8fafc'};
    border: 2px solid ${isActive ? '#fecaca' : '#e2e8f0'};
    border-radius: 8px;
    color: ${isActive ? '#ef4444' : '#64748b'};
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        border-color: ${isActive ? '#ef4444' : '#6366f1'};
        color: ${isActive ? '#ef4444' : '#6366f1'};
        background: ${isActive ? '#fee2e2' : '#f0f0ff'};
    }
`

const emptyState = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    color: #94a3b8;
    text-align: center;

    svg {
        margin-bottom: 16px;
        opacity: 0.5;
    }

    p {
        font-size: 15px;
        margin: 0;
    }
`