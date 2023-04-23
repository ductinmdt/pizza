import axiosClient from "../untils/axiosClient";

//get all OrderDetail
export const loadOrderDetailApi = async () =>
    await axiosClient.get("orderDetail/getAll")

//create OrderDetail
export const createOrderDetailApi = async (orderDetail) =>
    await axiosClient.post("orderDetail/createOrderDetail", orderDetail)

//delete OrderDetail
export const deleteOrderDetailApi = async (id) =>
    await axiosClient.delete(`orderDetail/deleteOrderDetail/${id}`)

//get orderDetail with id
export const getOrderDetailById = async (id) => {
    // const { data } = await axiosClient.get(`orderDetail/getOrderDetail/${id}`)
    return await axiosClient.get(`orderDetail/getOrderDetail/${id}`);
}

//UPDATE OrderDetail
export const updateOrderDetailApi = async (id, orderDetailInfo) =>
    await axiosClient.patch(`orderDetail/updateOrderDetail/${id}`, orderDetailInfo)