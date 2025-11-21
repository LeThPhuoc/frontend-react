import api from "../../config_api/axiosConfig"

type Props = {
    searchTerm?: string,
    success?: (data: DataProject[]) => void,
    failure?: (error: any) => void
}

export const getListProjectApi = async ({ searchTerm, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    const id = JSON.parse(localStorage.getItem('user') ?? '').id
    if (role === 'boss') {
        await api.get(`/project/get_project/${role}/${id}?${searchTerm ? `search=${searchTerm}` : ''}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}

export type DataProject = {
    id?: number,
    name: string,
    address: string,
    description: string,
    start_date?: string,
    end_date?: string
    staff?: StaffProject[]
    boss?: BossProject[]
}

export type StaffProject = {
    project_id: number,
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
    role: string,
    salary: string
    user: 'staff'
}

export type BossProject = {
    project_id: number,
    id: number,
    name: string,
    tel: string,
    address: string,
    login_name: string,
    email: string
    user: 'boss',
    role: string
}