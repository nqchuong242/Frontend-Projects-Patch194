import { Card } from "antd"

const DashBoardPage = () => {
  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>DashBoard</span>}
    >
      <title>DashBoard</title>

      <div className="dashboard flex justify-between gap-4">
        <div className="kpi-using flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Bàn đang dùng</p>
          <p className="text-3xl font-bold text-yellow-500">3</p>
        </div>

        <div className="kpi-orders flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Đơn hôm nay</p>
          <p className="text-3xl font-bold text-yellow-500">20</p>
        </div>

        <div className="kpi-revenue flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Doanh thu</p>
          <p className="text-3xl font-bold text-yellow-500">1.000.000đ</p>
        </div>
      </div>

    </Card>
  )
}

export default DashBoardPage