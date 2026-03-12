import { Card, Table, type TableColumnsType } from "antd";
import { useState } from "react";
import type { OrderHistory, OrderItems } from "../../types/orderHistory.dashboard.type";
import ModalOrderReports from "./components/ModalOrderReports";


const ReportsPage = () => {

  const history =
    JSON.parse(localStorage.getItem("ordersHistory") || "[]")

  const today = new Date().toISOString().slice(0, 10)

  const todayOrders =
    history.filter((o: any) => o.date === today)

  //console.log('<<=== 🚀 todayOrders ===>>', todayOrders);

  //tính tổng tiền
  const totalMoney = todayOrders.reduce((sum: number, item: any) => {
    return sum + item.total
  }, 0);

  //state mở modal thông tin từng bàn 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<OrderItems[]>([])




  const columns: TableColumnsType<OrderHistory> = [
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Bàn</span>,
      dataIndex: 'tableId',
      onCell: () => ({
        style: { minWidth: 200 }
      }),
    },
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Giờ vào</span>,
      dataIndex: 'time',
      onCell: () => ({
        style: { minWidth: 200 }
      }),
    },
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Số tiền</span>,
      dataIndex: 'total',
      onCell: () => ({
        style: { minWidth: 200 }
      }),
      render: (price) => (
        <span className="font-semibold text-green-600">
          {price.toLocaleString()} đ
        </span>),
    },
  ]


  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>Doanh thu</span>}
    >
      <title>Doanh thu</title>

      <div className="p-5 w-200">
        <Table<OrderHistory>
          size="middle"
          columns={columns}
          dataSource={todayOrders}
          pagination={false}
          bordered
          rowClassName={(_, index) =>
            index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'
          }
          rowKey="key"
          onRow={(record: OrderHistory) => ({
            onClick: () => {
              console.log('record:', record),
                setIsModalOpen(true),
                setSelectedItems(record.items)

            }
          })}

          footer={() => (
            <div className='flex justify-between text-xl font-semibold'>
              <p>Tổng tiền:</p>
              <p className="text-red-600">{totalMoney.toLocaleString()} đ</p>
            </div>
          )}

          style={{ marginTop: -40 }}
        />
      </div>

      <ModalOrderReports
        data={selectedItems}
        isModalOpen={isModalOpen}
        handleOk={() => {
          setIsModalOpen(false);
        }}
        handleCancel={() => {
          setIsModalOpen(false);
        }}


      />


    </Card>
  )
}

export default ReportsPage