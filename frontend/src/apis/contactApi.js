import axiosClient from "../untils/axiosClient";

//get all Order
export const loadContactApi = async () =>
    await axiosClient.get("contact/getAll")

//create Order
export const createContactApi = async (contact) =>
    await axiosClient.post("contact/createContact", contact)

// //delete Order
export const deleteContactApi = async (id) =>
    await axiosClient.delete(`contact/deleteContact/${id}`)

