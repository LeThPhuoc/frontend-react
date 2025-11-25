import api from "../../config_api/axiosConfig"

type Props = {
    searchTerm?: string,
    project_id: number | string
    success?: (data: Boss[]) => void,
    failure?: (error: any) => void
}

export const getBossNotInProjectApi = async ({ project_id, searchTerm, success, failure }: Props) => {
    await api.get(`/project/get_boss/${project_id}?${searchTerm ? `search=${searchTerm}` : ''}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
}

type Boss = {
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
}