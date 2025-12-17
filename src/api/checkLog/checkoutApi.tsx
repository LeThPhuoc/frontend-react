import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string,
    staff_id: string
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const checkoutApi = async ({ project_id, staff_id, success, failure }: Props) => {
    await api.post(`/check_logs/checkout`,
        {
            project_id: project_id,
            staff_id
        }
    )
        .then((response) => {
            // success && success(response.data)
        }).catch((error) => {
            console.log(error)
            failure && failure(error)
        })
}