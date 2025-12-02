import api from "../../config_api/axiosConfig"

type Props = {
    search?: string,
    page?: number
    success?: (data: ListStaffResonponse) => void,
    failure?: (error: any) => void
}

export const getListStaffApi = async ({ search, page, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    const bossId = JSON.parse(localStorage.getItem('user') ?? '').id
    if (role === 'boss') {
        await api.get(`/get_list_staff/${bossId}`,
            {
                params: {
                    search,
                    page
                }
            }
        )
            .then((response) => {
                success && success(response.data)
            }).catch((error) => {
                console.log(error)
                failure && failure(error)
            })
    }
}

type ListStaffResonponse = {
    data: Staff[],
    page: number
    last_page: number
}

export type Staff = {
    id: number,
    name: string,
    address: string,
    login_name: string,
    email: string,
    tel: string,
}
