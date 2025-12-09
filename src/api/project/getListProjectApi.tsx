import api from "../../config_api/axiosConfig"

type Props = {
    search?: string,
    page?: number
    per_page?: number,
    success?: (data: DataProjectResponse) => void,
    failure?: (error: any) => void
}

export const getListProjectApi = async ({ search, page, per_page, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    const id = JSON.parse(localStorage.getItem('user') ?? '').id
    await api.get(`/project/get_project/${role}/${id}`, {
        params: {
            search, 
            page,
            per_page
        }
    })
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })

}

export type DataProjectResponse = {
    data: DataProject[]
    page: number,
    last_page: number
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