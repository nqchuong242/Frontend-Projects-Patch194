import { CloseSquareOutlined } from '@ant-design/icons';
import { Modal, Divider, Table, Space, Popconfirm, Button } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useState } from 'react';


interface DataType {
    key: React.Key;
    name: string;
    quantity: number;
    price: number;
}

// rowSelection object indicates the need for row selection
const rowSelection: TableProps<DataType>['rowSelection'] = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record: DataType) => ({
        disabled: record.name === 'Disabled User', // Column configuration not to be checked
        name: record.name,
    }),
};


const TableOrders = ({
    isModalOpen,
    isModalOk,
    isModalCancel,

}: {
    isModalOpen: boolean;
    isModalOk: () => void
    isModalCancel: () => void;

}) => {

    //fake data
    const [data, setData] = useState<DataType[]>([
        { key: 1, name: 'Há cảo tôm', quantity: 1, price: 39000 },
        { key: 2, name: 'Mì sá xíu', quantity: 1, price: 49000 },
        { key: 3, name: 'Bánh bao kim sa', quantity: 1, price: 30000 },
        { key: 4, name: 'Nước coca', quantity: 2, price: 20000 },
    ]);

    //cập nhật lại số lượng order
    const updateQuantity = (key: React.Key, newQuantity: number) => {
        if (newQuantity < 1) return
        setData(prev =>
            prev.map(item =>
                item.key === key
                    ? { ...item, quantity: newQuantity }
                    : item
            )
        );
    };

    //xoá order
    const onDeleteOrder = (key: React.Key) => {
        setData(prev =>
            prev.filter(item => item.key !== key)
        );
    };

    //tính tổng tiền
    const totalMoney = data.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);


    const columns: TableColumnsType<DataType> = [
        {
            title: <span style={{ fontSize: 16, fontWeight: 700 }}>Tên món</span>,
            dataIndex: 'name',
            onCell: () => ({
                style: { minWidth : 200 }
            }),
        },
        {
            title: <span style={{ fontSize: 16, fontWeight: 700 }}>Số lượng</span>,
            dataIndex: 'quantity',
            render: (_, record) => (
                <div className="flex items-center">
                    <button
                        onClick={() =>
                            updateQuantity(record.key, record.quantity - 1)
                        }
                        className="px-2 border rounded"
                    >
                        -
                    </button>

                    <p className='px-2'>{record.quantity}</p>

                    <button
                        onClick={() =>
                            updateQuantity(record.key, record.quantity + 1)
                        }
                        className="px-2 border rounded"
                    >
                        +
                    </button>
                </div>
            ),
            onCell: () => ({
                style: { minWidth : 150 }
            }),
        },
        {
            title: <span style={{ fontSize: 16, fontWeight: 700 }}>Thành tiền</span>,
            dataIndex: 'price',
            render: (_, record) =>
                (record.price * record.quantity).toLocaleString() + " đ",
            onCell: () => ({
                style: { minWidth : 100 }
            }),
        },
        {
      title: '',
      key: 'action',
      render: (_, record) => ( //cần nhiều trường thì dùng record
        <Space size="middle">

          <Popconfirm //1 component từ antd để xác nhận xóa
            title='Xác nhận xoá'
            description={`Bạn đồng ý xoá món ăn "${record.name}" ? `}
            onConfirm={() => { onDeleteOrder(record.key) }} //onConfirm: khi người dùng bấm vào nút Yes
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<CloseSquareOutlined />}></Button>
          </Popconfirm>
        </Space>
      ),

    },
    ];

    //state mở modal Payment
    const [isModalPayOpen, setIsModalPayOpen] = useState(false);
    const onModalPay = () => {
        setIsModalPayOpen(true);
    };

    const offModalPay = () => {
        setIsModalPayOpen(false);
    };
    return (
        <Modal className='modal-table-orders'
            width={700}
            title={<span style={{ fontSize: 18, fontWeight: 700 }}>THÔNG TIN BÀN</span>}
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            getContainer={false}
            style={{ top: 50 }}
            onOk={() => {
                onModalPay();
            }}
            onCancel={() => {
                isModalCancel();
            }}
            okText="Thanh toán"
        >
            <Divider />
            <Table<DataType>
                rowSelection={{ type: 'checkbox', ...rowSelection }}
                columns={columns}
                dataSource={data}
                pagination={false}
                footer={() => (
                    <div className='flex justify-between text-xl font-semibold'>
                        <p>Tổng tiền:</p>
                        <p>{totalMoney.toLocaleString()} đ</p>
                    </div>
                )}

                style={{ marginTop: -40 }}
            />
            <Modal className='modal-payment'
                width={500}
                title={<span style={{ fontSize: 18, fontWeight: 700 }}>Xác nhận thanh toán</span>}
                closable={{ "aria-label": "Custom Close Button" }}
                open={isModalPayOpen}
                getContainer={false}
                style={{ top: 150 }}
                onOk={() => {
                    isModalOk();
                    offModalPay()
                }}
                onCancel={() => {
                    offModalPay();
                }}
                okText="Đồng ý"
            >
            </Modal>

        </Modal>
    )
}

export default TableOrders