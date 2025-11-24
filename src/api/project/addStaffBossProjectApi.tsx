import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string | number
    data: {
        staffs: Staff,
        bosses: Boss
    }
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const addStaffBossProjectApi = async ({ project_id, data, success, failure }: Props) => {
    await api.post(`/project/${project_id}/add_staff_boss`, {
        staffs: data.staffs,
        bosses: data.bosses
    }).then((response) => {
        success && success(response)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })
}

type Staff = {
    id: number,
    role: string,
    salary: string
}

type Boss = {
    id: number,
    role: string,
}