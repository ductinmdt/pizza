import axiosClient from "../untils/axiosClient";
const formDataConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
//get all categories
export const loadCategoryApi = async () =>
    await axiosClient.get("category/getAll")

//create product
export const createCategoryApi = async (category) =>
    await axiosClient.post("category/createCategory", category, formDataConfig)

//delete category
export const deleteCategoryApi = async (id) =>
    await axiosClient.delete(`category/deleteCategory/${id}`)

//get category with id
export const getCategoryById = async (id) => {
    // const { data } = await axiosClient.get(`category/getCategory/${id}`)
    return await axiosClient.get(`category/getCategory/${id}`);
}

//UPDATE category
export const updateCategoryApi = async (id, categoryInfo) =>
    await axiosClient.patch(`category/updateCategory/${id}`, categoryInfo)