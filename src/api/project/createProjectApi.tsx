import api from "../../config_api/axiosConfig"

type Props = {
    data: DataCreateProject,
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const createProjectApi = async ({ data, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    if (role === 'boss') {
        const idBoss = localStorage.getItem('user')
        await api.post(`/project/create_project/${JSON.parse(idBoss ?? '').id}`, {
            name: data.name,
            address: data.address,
            description: data.description,
            end_date: data.end_date,
            start_date: data.start_date
        }).then((response) => {
            success && success(response)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}

export type DataCreateProject = {
    name: string,
    address: string,
    description: string,
    start_date?: string,
    end_date?: string
}