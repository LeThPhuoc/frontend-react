import api from "../../config_api/axiosConfig"
import { Staff } from "../staff/getListStaffApi"

type Props = {
    searchTerm?: string,
    project_id: number | string
    success?: (data: Staff[]) => void,
    failure?: (error: any) => void
}

export const getStaffNotInProjectApi = async ({ project_id, searchTerm, success, failure }: Props) => {
    await api.get(`/project/get_staff/${project_id}?${searchTerm ? `search=${searchTerm}` : ''}`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
}
