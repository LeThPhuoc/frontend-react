import api from "../../config_api/axiosConfig"

type Props = {
    project_id: string | number
    dataListStaffId: number[],
    dataListBossId: number[],
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const DeleteStaffBossFromProjectApi = async ({ project_id, dataListStaffId, dataListBossId, success, failure }: Props) => {
    await api.post(`/project/${project_id}/delete_staff_boss`, {
        staff_id: dataListStaffId,
        boss_id: dataListBossId
    }).then((response) => {
        success && success(response)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })
}
