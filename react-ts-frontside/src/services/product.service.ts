import apiClient from "../libs/axiosClient";

/**LẤY TẤT CẢ SẢN PHẨM */
export const getAllProducts = async () => {
    const res = await apiClient.get('/products');
    return res.data;
}

