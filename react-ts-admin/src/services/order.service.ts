import apiClient from "../libs/axiosClient";

/**LẤY TẤT CẢ ORDER */
export const getAllOrders = async () => {
    const res = await apiClient.get('/orders');
    return res.data;
}

/**XOÁ ORDER */
export const deleteOrderByTable = async ({ tableId }: { tableId: number }) => {
    const res = await apiClient.get("/orders");
    const data = res.data;

    const ordersOfTable = data.filter(
        (o: any) => Number(o.table.id) === tableId
    );

    for (const order of ordersOfTable) {
        await apiClient.delete(`/orders/${order.id}`);
    }
};

