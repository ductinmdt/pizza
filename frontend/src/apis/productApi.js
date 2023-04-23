import axiosClient from "../untils/axiosClient";

//get all products
export const loadProductApi = async () =>
    await axiosClient.get("product/getAll")

//create product
export const createProductApi = async (product) =>
    await axiosClient.post("product/createProduct", product)

//delete product
export const deleteProductApi = async (id) =>
    await axiosClient.delete(`product/deleteProduct/${id}`)

//get product with id
export const getProductById = async (id) => {
    // const { data } = await axiosClient.get(`product/getProduct/${id}`)
    return await axiosClient.get(`product/getProduct/${id}`);
}

//update product
export const updateProductApi = async (id, productInfo) => 
    await axiosClient.patch(`product/updateProduct/${id}`, productInfo)