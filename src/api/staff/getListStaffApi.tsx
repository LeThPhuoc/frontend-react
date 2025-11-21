import api from "../../config_api/axiosConfig"

type Props = {
    searchTerm?: string,
    success?: (data: Staff[]) => void,
    failure?: (error: any) => void
}

export const getListStaffApi = async ({ searchTerm, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    const bossId = JSON.parse(localStorage.getItem('user') ?? '').id
    if (role === 'boss') {
        await api.get(`/get_list_staff/${bossId}?${searchTerm ? `search=${searchTerm}` : ''}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}

export type Staff = {
    id: number,
    name: string,
    address: string,
    login_name: string,
    email: string,
    tel: string,
}
