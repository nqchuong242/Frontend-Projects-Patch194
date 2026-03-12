import { Modal, Table, type TableColumnsType } from "antd"
import type { OrderItems } from "../../../types/orderHistory.dashboard.type";


const ModalOrderReports = ({
  data,
  isModalOpen,
  handleOk,
  handleCancel,
}: {
  data: OrderItems[],
  isModalOpen: boolean,
  handleOk: () => void,
  handleCancel: () => void,
}) => {

  const columns: TableColumnsType<OrderItems> = [
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Tên món</span>,
      dataIndex: 'name',
      onCell: () => ({
        style: { minWidth: 200 }
      }),
    },
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Đơn giá</span>,
      dataIndex: 'price',
      onCell: () => ({
        style: { minWidth: 100 }
      }),
    },
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Số lượng</span>,
      dataIndex: 'quantity',
      onCell: () => ({
        style: { minWidth: 100 }
      })
    }
  ]


  return (
    <Modal
      width={600}
      title="Chi tiết đơn"
      closable={{ "aria-label": "Custom Close Button" }}
      open={isModalOpen}
      getContainer={false}
      style={{ top: 50 }}
      onOk={() => handleOk()}
      onCancel={() => handleCancel()}
      okText="OK"
      cancelButtonProps={{ style: { display: "none" } }}
    >
      <Table<OrderItems>
        size="middle"
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
        rowClassName={(_, index) =>
          index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'
        }
        rowKey="key"
        style={{ marginTop: -40 }}
      />
    </Modal >
  )

}

export default ModalOrderReports