import api from "../../config_api/axiosConfig"

type Props = {
    project_id?: string,
    success?: (data: DataProjectCheckLog) => void,
    failure?: (error: any) => void
}

export const getProjectCheckLogDetail = async ({ project_id, success, failure }: Props) => {
    await api.get(`/check_logs/detail/project`, {
        params: {
            project_id: project_id
        }
    })
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
}

export type DataProjectCheckLog = {
    id?: number,
    name: string,
    address: string,
    description: string,
    start_date?: string,
    end_date?: string
    staff?: StaffCheckLog[]
}

export type StaffCheckLog = {
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
    role: string,
    checkin_time?: string,
    checkout_time?: string,
    total_hours?: string
    total_hours_today?: string,
}