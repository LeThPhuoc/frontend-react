import api from "../../config_api/axiosConfig"

type Props = {
    idProject: string | number
    dataListStaffId: DataDeleteStaffFromProject[],
    dataListBossId: DataDeleteStaffFromProject[],
    success?: (data: any) => void,
    failure?: (error: any) => void
}

export const DeleteStaffFromProjectApi = async ({ idProject, dataListStaffId, dataListBossId, success, failure }: Props) => {
    await api.post(`/project/${idProject}/delete_staff_boss`, {
        staff_id: dataListStaffId,
        boss_id: dataListBossId
    }).then((response) => {
        success && success(response)
    }).catch((error) => {
        console.log(error)
        failure && failure(error)
    })
}

export type DataDeleteStaffFromProject = {
    id: string | number
}