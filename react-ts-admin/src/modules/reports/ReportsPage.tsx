import { Card, Table, type TableColumnsType } from "antd";

interface DataType {
  key: React.Key;
  time: number;
  price: number;
}


const ReportsPage = () => {

  //fake data
  const data: DataType[] = [
    { key: 1, time: 8, price: 500000 },
    { key: 2, time: 10, price: 350000 },
    { key: 3, time: 10, price: 700000 },
    { key: 4, time: 11, price: 800000 },
  ];

  //tính tổng tiền
  const totalMoney = data.reduce((sum, item) => {
    return sum + item.price
  }, 0);

  const columns: TableColumnsType<DataType> = [
    {
      title: <span style={{ fontSize: 16, fontWeight: 700 }}>Bàn</span>,
      dataIndex: 'key',
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
      dataIndex: 'price',
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
        <Table<DataType>
          size="middle"
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
          rowClassName={(_, index) =>
            index % 2 === 0 ? 'bg-gray-200' : 'bg-blue-200'
          }
          rowKey="key"
          footer={() => (
            <div className='flex justify-between text-xl font-semibold'>
              <p>Tổng tiền:</p>
              <p className="text-red-600">{totalMoney.toLocaleString()} đ</p>
            </div>
          )}

          style={{ marginTop: -40 }}
        />
      </div>


    </Card>
  )
}

export default ReportsPage