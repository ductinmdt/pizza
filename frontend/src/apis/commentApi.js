import axiosClient from "../untils/axiosClient";

//get all Order
export const loadCommentApi = async () =>
    await axiosClient.get("comment/getAll")

//create Order
export const createCommentApi = async (comment) =>
    await axiosClient.post("comment/createComment", comment)

// //delete Order
export const deleteCommentApi = async (id) =>
    await axiosClient.delete(`comment/deleteComment/${id}`)

