import { Card } from "antd"
import type { Order } from "../../types/orderHistory.dashboard.type"
import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../services/order.service";

const DashBoardPage = () => {

  /********CODE FETCH DỮ LIỆU TỪ COMPONENT CHA *******/

  /******ORDERS LIST *******/
  const queryOrders = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
    refetchInterval: 2000,
  });
  //console.log('<<=== 🚀 queryOrders.data ===>>', queryOrders.data);
  const dataOrders: Order[] = queryOrders.data || []
  /******END ORDERS LIST *******/

  //số lượng bàn đang được sử dụng
  const tablesUsing =
    new Set(dataOrders.map(o => o.table.id)).size 
    //Set: collection không cho phép trùng lặp.
    // .size lấy số lượng phần tử trong Set

  const history =
    JSON.parse(localStorage.getItem("ordersHistory") || "[]")

  const today = new Date().toISOString().slice(0, 10)

  const todayOrders =
    history.filter((o: any) => o.date === today)

  const ordersToday = todayOrders.length

  //console.log('<<=== 🚀 todayOrders ===>>', todayOrders);

  const revenueToday =
    todayOrders.reduce( //gộp nhiều giá trị thành 1 giá trị
      (sum: number, o: any) => sum + o.total,
      0
    )


  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>DashBoard</span>}
    >
      <title>DashBoard</title>

      <div className="dashboard flex justify-between gap-4">
        <div className="kpi-using flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Bàn đang dùng</p>
          <p className="text-3xl font-bold text-yellow-500">{tablesUsing}</p>
        </div>

        <div className="kpi-orders flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Đơn hôm nay</p>
          <p className="text-3xl font-bold text-yellow-500">{ordersToday}</p>
        </div>

        <div className="kpi-revenue flex-1 flex justify-between items-center border-2 border-gray-400 rounded-2xl p-4">
          <p className="text-xl font-bold">Doanh thu</p>
          <p className="text-3xl font-bold text-yellow-500">{revenueToday.toLocaleString()}đ</p>
        </div>
      </div>

    </Card>
  )
}

export default DashBoardPage