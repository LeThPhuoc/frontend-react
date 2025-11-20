import api from "../../config_api/axiosConfig"
import { DataProject } from "./getListProjectApi"

type Props = {
    project_id: string | number,
    data: DataProject,
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const editProjectApi = async ({ project_id, success, failure, data }: Props) => {
    await api.post(`/project/${project_id}/edit`, {
        name: data.name,
        address: data.address,
        description: data.description,
        start_date: data.start_date,
        end_date: data.end_date
    }).then((res) => {
        success && success(res)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })

}
