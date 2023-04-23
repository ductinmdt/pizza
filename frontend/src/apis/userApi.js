import axiosClient from "../untils/axiosClient";

//get all usersAdmin
export const loadUsersAdminApi = async () =>
    await axiosClient.get("user/getUsers")

//create user Admin
export const createUserApi = async (user) =>
    await axiosClient.post("user/create-user", user)

//delete user Admin
export const deleteUserApi = async (userId) =>
    await axiosClient.delete(`user/delete-user/${userId}`)

//get task with id
export const getUserAdminById = async (userId) => {
    const { data } = await axiosClient.get(`user/get-user/${userId}`)
    return data;
}

//UPDATE user Admin
export const updateUserApi = async (userId, userInfo) =>
    await axiosClient.patch(`user/update-user/${userId}`, userInfo)

//get data userAdmin by name
export const getUserByEmail = async (email) => {
    const { data } = await axiosClient.get('user/delete-user', {
        params: { email: email }
    });
    return data[0];
}

//Change password
export const changePasswordApi = async (id, user) =>
    await axiosClient.post(`user/reset-password/${id}`, user)