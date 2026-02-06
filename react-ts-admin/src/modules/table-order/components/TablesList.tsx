import { Tag } from "antd";

const TablesList = ({
  onModalTableOrders
}:{
  onModalTableOrders: ()=>void
}) => {
  const fakeData = Array.from({ length: 20 }).map((_, i) => ({
    id: i + 1,
    time: "18:30",
    total: i % 3 === 0 ? 0 : (i + 1) * 50000, //chia hết cho 3 thì bằng 0
  }));

  return (
    <div className="table-list grid grid-cols-7 gap-4">
      {fakeData.map((f) => {
        const isEmpty = f.total === 0; //bàn trống thì bằng 0

        return (
          <div key={f.id} onClick={onModalTableOrders} className="table-child border border-gray-200 rounded-2xl hover:bg-blue-100 p-2">
            <h3 className="table-id text-base font-semibold">Bàn {f.id} </h3>
            <p className="time-checkin">Giờ vào: {isEmpty ? "--:--" : f.time}</p>
            {isEmpty ? (
              <Tag color="green">🟢 Trống</Tag>
            ) : (
              <Tag color="gold">🟡 {f.total.toLocaleString()} đ</Tag>
            )}
          </div>

        );
      })}
    </div>
  )
}

export default TablesList