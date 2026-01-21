import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string | number,
    success?: (data: DataProjectTimeSheet) => void,
    failure?: (error: any) => void
}

export const getDetailProjectTimeSheetApi = async ({ project_id, success, failure }: Props) => {
    await api.get(`/timesheet/get_detail/${project_id}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })

}

export type DataProjectTimeSheet = {
    id?: number,
    name: string,
    address: string,
    description: string,
    start_date?: string,
    end_date?: string
    staff?: StaffTimeSheet[]
}

export type StaffTimeSheet = {
    address: string
    email: string
    id: number
    login_name: string
    name: string
    role: string
    tel: string
    total_hours?: string
    total_hours_today?: string
    total_timekeeping_number?: string
    total_timekeeping_number_today?: string
}