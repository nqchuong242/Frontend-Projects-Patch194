import apiClient from "../libs/axiosClient";

/**LẤY TẤT CẢ ORDER */
export const getAllOrders = async () => {
    const res = await apiClient.get('/orders');
    return res.data;
}


/**TẠO/CẬP NHẬT ORDER MỚI */
export const createOrder = async (order: any) => {

    const res = await apiClient.get('/orders');
    const orders = res.data;

    const maxId = Math.max(0, ...orders.map((o: any) => o.id ?? 0), 0) ;

    const newOrder = {
        id: maxId + 1,
        ...order
    };

    await apiClient.post("/orders", newOrder);
};