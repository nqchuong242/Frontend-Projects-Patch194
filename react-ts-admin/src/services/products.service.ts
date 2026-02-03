import apiClient from "../libs/axiosClient";

/**LẤY TẤT CẢ SẢN PHẨM */
export const getAllProducts = async () => {
    const res = await apiClient.get('/products');
    return res.data;
}


/**XOÁ SẢN PHẨM */
export const deleteProductById = async ({ category, id }: { category: string, id: number }) => {
    const res = await apiClient.get("/products");
    const data = res.data;

    //Chỉ giữ những sản phẩm không phải là id nhập vào của mãng category 
    data[category] = data[category].filter((p: any) => p.id !== id);

    //Vì là database thô nên dùng put để cập nhật toàn bộ database
    await apiClient.put("/products", data);
};


/**THÊM SẢN PHẨM */
export const createProduct = async ({ category, product }: { category: string, product: any }) => {
    const res = await apiClient.get("/products");
    const data = res.data;

    const maxId: number = Math.max(0, ...data[category].map((p: any) => p.id)) || 0
    //Math.max(0, ...) để không bị Infinity, hỏng database

    const newProduct = {
        id: maxId + 1,
        ...product
    };

    //database thô nên push vào 1 mãng của category nhập vào
    data[category].push(newProduct);

    //Vì là database thô nên dùng put để cập nhật toàn bộ database
    await apiClient.put("/products", data);
};


/**SỬA SẢN PHẨM */
export const updateProduct = async ({ category, id, product }: { category: string, id: number, product: any }) => {
    const res = await apiClient.get("/products");
    const data = res.data;

    const list = data[category];

    const index = list.findIndex((p: any) => p.id === id) //tìm vị trí trong mảng
    if (index === -1){console.log('<<=== 🚀Không tìm thấy sản phẩm ===>>')}
    /**findIndex() duyệt mảng và:
    Nếu tìm thấy phần tử thỏa điều kiện → trả về vị trí (index)
    Nếu không tìm thấy → trả về -1 */

    list[index] = product; //gán data nhập vào cho data của mảng

    //Vì là database thô nên dùng put để cập nhật toàn bộ database
    await apiClient.put("/products", data);
    
};


/**LẤY 1 SẢN PHẨM */
export const getProductById = async ({ category, id }: { category: string, id: number }) => {
    const res = await apiClient.get("/products");
    const data = res.data;

    //Chỉ giữ những sản phẩm là id nhập vào của mãng category 
    const product = data[category].find((p: any) => p.id === id);
    if(!product){console.log('<<=== 🚀 Không tìm thấy sản phẩm  ===>>')}

    return product
}