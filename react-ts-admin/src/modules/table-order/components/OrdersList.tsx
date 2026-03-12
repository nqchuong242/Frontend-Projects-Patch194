import { CloseSquareOutlined } from '@ant-design/icons';
import { Modal, Divider, Table, Space, Popconfirm, Button, message } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { useEffect, useState } from 'react';
import type { OrderHistory } from '../../../types/orderHistory.dashboard.type';

interface DataType { //type của form antd
    key: React.Key;
    name: string;
    quantity: number;
    price: number;
}


const OrdersList = ({
    dataOrders,
    tableId,
    isModalOpen,
    isModalOk,
    isModalCancel,
    onDeleteOrderList,
    onUpdateTableTotals,
    onUpdateTableStatus,
}: {
    dataOrders: any,
    tableId: number | null,
    isModalOpen: boolean,
    isModalOk: () => void,
    isModalCancel: () => void,
    onDeleteOrderList: (tableId: number) => void,
    onUpdateTableTotals: (tableId: number, totalMoney: number) => void,
    onUpdateTableStatus: (tableId: number, status: string) => void,

}) => {

    //state kiểm tra đã tích chọn hết các món để thanh toán chưa
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // rowSelection object indicates the need for row selection
    const rowSelection: TableProps<DataType>['rowSelection'] = {
        selectedRowKeys,
        onChange: (keys: React.Key[]) => {
            setSelectedRowKeys(keys);
        },
        getCheckboxProps: (record: DataType) => ({
            disabled: record.name === 'Disabled User', // Column configuration not to be checked
            name: record.name,
        }),
    };


    //useState truyền data vào dataSource của Table
    const [data, setData] = useState<DataType[]>([]);

    useEffect(() => {

        if (!dataOrders || !tableId) return; //nếu chưa có 2 dữ liệu này thì dừng hàm

        const orders = dataOrders
            .filter((o: any) => Number(o.table.id) === tableId)
            .flatMap((o: any) => //gộp ra thành 1 mảng duy nhất.
                o.items.map((item: any, index: number) => ({
                    key: `${o.id} - ${index}`, //vd:  key:"1-0", key:"1-1",
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                }))
            );

        setData(orders);

    }, [dataOrders, tableId]); //useEffect chỉ chạy khi dataOrders, tableId thay đổi


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
        setSelectedRowKeys(prev =>
            prev.filter(k => k !== key)
        );
    };

    //tính tổng tiền
    const totalMoney = data.reduce((sum, item) => { //reduce = gộp nhiều phần tử trong mảng thành 1 giá trị duy nhất
        return sum + item.price * item.quantity;
    }, 0); //Số 0 là giá trị khởi tạo của sum

    //thiết lập trạng thái bàn
    useEffect(() => {
        if (!tableId) return;

        if (selectedRowKeys.length === data.length) {
            onUpdateTableStatus(tableId, "ready");
        } else {
            onUpdateTableStatus(tableId, "pending");
        }

    }, [selectedRowKeys, data, tableId]);

    useEffect(() => {
        if (tableId) {
            onUpdateTableTotals(tableId, totalMoney);
        }
    }, [totalMoney, tableId])


    const columns: TableColumnsType<DataType> = [
        {
            title: <span style={{ fontSize: 16, fontWeight: 700 }}>Tên món</span>,
            dataIndex: 'name',
            onCell: () => ({
                style: { minWidth: 200 }
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
                style: { minWidth: 150 }
            }),
        },
        {
            title: <span style={{ fontSize: 16, fontWeight: 700 }}>Thành tiền</span>,
            dataIndex: 'price',
            render: (_, record) =>
                (record.price * record.quantity).toLocaleString() + " đ",
            onCell: () => ({
                style: { minWidth: 100 }
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


    //hàm lưu lại order đã thanh toán
    const saveOrderHistory = (tableId: string, items: DataType[]) => {

        const today = new Date().toISOString().slice(0, 10)

        const total = items.reduce(
            (sum, i) => sum + i.price * i.quantity,
            0
        )

        const order: OrderHistory = {
            id: Date.now(),
            tableId,
            date: today,
            time: dataOrders
                .find((o: any) => String(o.table.id) === tableId)?.time || "",
            items: items.map(i => ({
                name: i.name,
                price: i.price,
                quantity: i.quantity
            })),
            total
        }


        const old: OrderHistory[] =
            JSON.parse(localStorage.getItem("ordersHistory") || "[]")

        localStorage.setItem(
            "ordersHistory",
            JSON.stringify([...old, order])
        )
    }



    return (
        <Modal className='modal-table-orders'
            width={700}
            title={<span style={{ fontSize: 18, fontWeight: 700 }}>THÔNG TIN BÀN {tableId}</span>}
            closable={{ "aria-label": "Custom Close Button" }}
            open={isModalOpen}
            getContainer={false}
            style={{ top: 50 }}
            onOk={() => {
                if (selectedRowKeys.length !== data.length) {
                    message.warning("Chưa tích chọn hết các món");
                    return;
                }
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
                    offModalPay();
                    setData([]);
                    setSelectedRowKeys([]);
                    if (tableId) {
                        onDeleteOrderList(tableId)
                    }
                    saveOrderHistory(String(tableId), data)
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

export default OrdersList