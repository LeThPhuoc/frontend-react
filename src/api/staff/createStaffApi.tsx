import api from "../../config_api/axiosConfig"

type Props = {
    data: DataCreateStaff,
    success?: (data: DataCreateStaff) => void,
    failure?: (error: any) => void
}

export const createStaffApi = async ({ data, success, failure }: Props) => {
    const role = localStorage.getItem('role')
    if (role === 'boss') {
        const idBoss = JSON.parse(localStorage.getItem('user') ?? '').id
        await api.post(`/create_staff/${idBoss}`, {
            login_name: data.login_name,
            name: data.name,
            tel: data.tel,
            address: data.address,
            email: data.email,
            password: data.password,
        }).then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
    }
}

export type DataCreateStaff = {
    name: string,
    login_name: string,
    tel: string,
    address: string,
    email: string
    password: string
}