import axiosClient from "../untils/axiosClient";

//get all slider
export const loadSliderApi = async () =>
    await axiosClient.get("slider/getAll")

//create slider
export const createSliderApi = async (slider) =>
    await axiosClient.post("slider/createSlider", slider)

//delete slider
export const deleteSliderApi = async (id) =>
    await axiosClient.delete(`slider/deleteSlider/${id}`)

//get task with id
export const getSliderById = async (id) => {
    // const { data } = await axiosClient.get(`slider/getSlider/${id}`)
    return await axiosClient.get(`slider/getSlider/${id}`);
}

//UPDATE slider
export const updateSliderApi = async (id, sliderInfo) =>
    await axiosClient.patch(`slider/updateSlider/${id}`, sliderInfo)