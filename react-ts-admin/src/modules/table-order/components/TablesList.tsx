import { Tag } from "antd";
import { useTableCount } from "../../../store/useTableCount";

const TablesList = ({
  onModalTableOrders,
  tableTotals,
  tableTimes,
  tableStatus,
}: {
  onModalTableOrders: (tableId: number) => void;
  tableTotals: Record<number, number>;
  tableTimes: Record<number, string>;
  tableStatus: Record<number, string>;
}) => {

  const { tableCount } = useTableCount()

  const tableData = Array.from({ length: tableCount }).map((_, i) => {
    const id =  i + 1;
    const time = tableTimes[id] || "--:--";
    const total = tableTotals[id] ?? 0;

    return {
      id,
      time,
      total
    } 
  });

  return (
    <div className="table-list grid grid-cols-7 gap-4">
      {tableData.map((t) => {
        const isEmpty = t.total === 0; //bàn trống thì bằng 0

        return (
          <div key={t.id} onClick={() => onModalTableOrders(t.id)} className="table-child border border-gray-200 rounded-2xl hover:bg-blue-100 p-2">
            <h3 className="table-id text-base font-semibold">Bàn {t.id} </h3>
            <p className="time-checkin">Giờ vào: {isEmpty ? "--:--" : t.time}</p>
            {isEmpty ? (
              <Tag color="green">🟢 Trống</Tag>
            ) : tableStatus[t.id] === "pending" ? (
              <Tag color="red">🔴 Chưa xong</Tag>
            ) : (
              <Tag color="gold">🟡 {t.total.toLocaleString()} đ</Tag>
            )}
          </div>

        );
      })}
    </div>
  )
}

export default TablesList