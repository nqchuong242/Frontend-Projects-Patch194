import type { FormProps } from "antd";
import { Form, Input, Modal, InputNumber, Select, Upload, Button, message } from "antd";
import type { IProductDTO } from "../../../types/product.type";


const ProductAdd = ({
    isModalOpen,
    handleOk,
    handleCancel,
    onAddProduct,
}: {
    isModalOpen: boolean;
    // handleOk receives created product payload optionally
    handleOk?: (values?: IProductDTO) => void;
    handleCancel: () => void;
    onAddProduct: (product: IProductDTO) => void;
}) => {

    const [form] = Form.useForm<IProductDTO>();

    //Thêm sản phẩm thành công
    const onFinish: FormProps<IProductDTO>["onFinish"] = async (values) => {
        console.log("Success:", values);

        //GỌI API ĐỂ THÊM SẢN PHẨM
        await onAddProduct(values);
        // bubble up values if parent needs them
        handleOk?.(values);
        form.resetFields();
    };

    //Thêm sản phẩm thất bại
    const onFinishFailed: FormProps<IProductDTO>["onFinishFailed"] = (
        errorInfo
    ) => {
        console.log("Failed:", errorInfo);
    };

    //Phần upload
    //mã hoá lại tên
    const fileName = (str: string) => {
        return str
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/Đ/g, "D")
            .replace(/[^a-zA-Z0-9.-]/g, "-")
            .toLowerCase();
    };

    const beforeUpload = (file: File) => {
        // check size
        const fileSize = file.size / 1024 / 1024 <= 2;
        if (!fileSize) {
            message.error("Ảnh phải nhỏ hơn 2MB");
            return Upload.LIST_IGNORE;
        }

        const safeFileName = fileName(file.name);

        // set vào input
        form.setFieldValue("thumbnail", `uploads/${safeFileName}`);

        return false; 
    };









    return (
        <Modal
            width={800}
            title="THÊM MÓN ĂN"
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            getContainer={false}
            style={{ top: 50 }}
            // gửi form khi nút OK "Thêm" được kích
            onOk={() => form.submit()}
            onCancel={() => {
                form.resetFields();
                handleCancel();
            }}
            okText="Thêm món"
        >
            <Form<IProductDTO>
                form={form}
                layout="vertical"
                style={{ maxWidth: 700 }}
                initialValues={{ //initialValues là giá trị mặc định khi form đc load lên
                    name: "",
                    price: 0,
                    thumbnail: "uploads/hinh-anh-mon-an.png",
                    isAvailable: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <div style={{
                    maxHeight: '60vh',
                    overflowY: 'auto',
                }}>
                    <Form.Item
                        label="Tên món ăn"
                        name="name"
                        rules={[{ required: true, message: "Điền tên món ăn" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        name="price"
                        rules={[{ required: true, message: "Điền giá tiền" }]}
                    >
                        <InputNumber style={{ width: "100%" }} min={0} />
                    </Form.Item>

                    <Form.Item 
                        label="Hình ảnh món ăn" 
                        name="thumbnail" 
                        style={{ marginBottom: 8 }}
                    >
                        <Input placeholder="uploads/hinh-anh-mon-an.png" />
                    </Form.Item>

                    <Upload
                        beforeUpload={beforeUpload}
                        maxCount={1}
                        listType="picture"
                        accept=".jpg,.jpeg,.png"
                        style={{ marginBottom: 20 }}
                    >
                        <Button>Chọn ảnh</Button>
                    </Upload>

                    <Form.Item
                        label="Tình trạng món"
                        name="isAvailable"
                    >
                        <Select>
                            <Select.Option value={true}>CÒN MÓN</Select.Option>
                            <Select.Option value={false}>HẾT MÓN</Select.Option>
                        </Select>
                    </Form.Item>
                    
                </div>
            </Form>
        </Modal >
    )
}

export default ProductAdd