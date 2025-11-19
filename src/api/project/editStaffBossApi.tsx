import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string | number,
    role: 'staff' | 'boss',
    id: number | string,
    data: {
        role?: string,
        salary?: string
    },
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const editStaffBossApi = async ({ project_id, role, id, success, failure, data }: Props) => {
    await api.post(`/project/${project_id}/edit_${role}/${id}`, {
        role: data.role,
        salary: data.salary
    }).then((res) => {
        success && success(res)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })

}
