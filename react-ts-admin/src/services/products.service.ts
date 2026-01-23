import apiClient from "../libs/axiosClient";


export const getAllProducts = async ()=> {
    const res = await apiClient.get('/products');
    return res.data;
}

