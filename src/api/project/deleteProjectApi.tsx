import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string | number,
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const deleteProjectApi = async ({ project_id, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    if (role === 'boss') {
        await api.delete(`/project/${project_id}/delete`).then((response) => {
            success && success(response)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}
