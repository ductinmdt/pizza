import axiosClient from "../untils/axiosClient";

//get all Order
export const loadOrderApi = async () =>
    await axiosClient.get("order/getAll")

//create Order
export const createOrderApi = async (order) =>
    await axiosClient.post("order/createOrder", order)
    
//create Payment URL
export const createPaymentURLApi = async (order) =>
    await axiosClient.post("order/create_payment_url", order)

//get vnpay return
export const vnPayReturnApi = async (params) =>
    await axiosClient.get("order/vnpay_return"+params)

//get vnpay ipn
export const vnPayIpnApi = async (params) =>
    await axiosClient.get("order/vnpay_ipn"+params)

//delete Order
export const deleteOrderApi = async (id) =>
    await axiosClient.delete(`order/deleteOrder/${id}`)

//get order with id
export const getOrderById = async (id) => {
    // const { data } = await axiosClient.get(`order/getOrder/${id}`)
    return await axiosClient.get(`order/getOrder/${id}`);
}

//UPDATE Order
export const updateOrderApi = async (id, orderInfo) =>
    await axiosClient.patch(`order/updateOrder/${id}`, orderInfo)

//get revenue by day
export const getRevenueByDayApi = async ( data) =>
    await axiosClient.post(`order/getRevenueByDay`, data)

//get revenue by year
export const getRevenueByYearApi = async ( data) =>
    await axiosClient.post(`order/getRevenueByYear`, data)