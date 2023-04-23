import axiosClient from "../untils/axiosClient";


export const getUserAdmin = async (user) => {
    const { data } = await axiosClient.post('auth/login',user)
    return data;
}

export const getUserUI = async (user) => {
    const { data } = await axiosClient.post('auth/login',user)
    // console.log('data :>> ', data);
    return data;
}

export const refreshToken = () => {
    const path = `/auth/refresh_token`;
    return axiosClient.get(path);
}