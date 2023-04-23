import axiosClient from "../untils/axiosClient";

//get all roles
export const loadRoleApi = async () =>
    await axiosClient.get("role/getAll")

//create role
export const createRoleApi = async (role) =>
    await axiosClient.post("role/createRole", role)

//delete role
export const deleteRoleApi = async (id) =>
    await axiosClient.delete(`role/deleteRole/${id}`)

//get role with id
export const getRoleById = async (id) => {
    return await axiosClient.get(`role/getRole/${id}`);
}

//update role
export const updateRoleApi = async (id, roleInfo) => 
    await axiosClient.patch(`role/updateRole/${id}`, roleInfo)

