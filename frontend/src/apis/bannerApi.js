import axiosClient from "../untils/axiosClient";

//get all banner
export const loadBannerApi = async () =>
    await axiosClient.get("banner/getAll")

//create banner
export const createBannerApi = async (banner) =>
    await axiosClient.post("banner/createBanner", banner)

//delete banner
export const deleteBannerApi = async (bannerId) =>
    await axiosClient.delete(`banner/deleteBanner/${bannerId}`)

//get task with id
export const getBannerById = async (bannerId) => {
    // const { data } = await axiosClient.get(`banner/getBanner/${bannerId}`)
    return axiosClient.get(`banner/getBanner/${bannerId}`);
}

//UPDATE banner
export const updateBannerApi = async (bannerId, bannerInfo) =>
    await axiosClient.patch(`banner/updateBanner/${bannerId}`, bannerInfo)