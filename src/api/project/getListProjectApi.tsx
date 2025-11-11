import api from "../../config_api/axiosConfig"

type Props = {
    success?: (data: DataListProject[]) => void,
    failure?: (error: any) => void
}

export const getListProjectApi = async ({ success, failure }: Props) => {
    const role = localStorage.getItem('role')
    const id = JSON.parse(localStorage.getItem('user') ?? '').id
    if (role === 'boss') {
        await api.get(`/project/get_project/${role}/${id}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}

export type DataListProject = {
    id: number,
    name: string,
    address: string,
    description: string,
    start_date?: string,
    end_date?: string
    staff: Staff[]
    boss: Boss[]
}

export type Staff = {
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
}

export type Boss = {
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
}