import api from "../../config_api/axiosConfig"
import { DataProject } from "./getListProjectApi"

type Props = {
    project_id: string | number,
    success?: (data: DataProject) => void,
    failure?: (error: any) => void
}

export const getDetailProjectApi = async ({ project_id, success, failure }: Props) => {
    await api.get(`/project/${project_id}/detail`)
        .then((response) => {
            success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })

}
