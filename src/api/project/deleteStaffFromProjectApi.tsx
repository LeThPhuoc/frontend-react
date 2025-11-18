import api from "../../config_api/axiosConfig"

type Props = {
    idProject: string | number
    data: DataDeleteStaffFromProject[],
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const DeleteStaffFromProjectApi = async ({ idProject, data, success, failure }: Props) => {
    await api.post(`/project/${idProject}/delete_staff`, {
        staff_id: data
    }).then((response) => {
        success && success(response)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })
}

export type DataDeleteStaffFromProject = {
    id: string | number
}