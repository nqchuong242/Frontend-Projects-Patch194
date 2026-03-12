import { Card } from "antd";
import TablesList from "./components/TablesList";
import { useEffect, useState } from "react";
import OrdersList from "./components/OrdersList";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteOrderByTable, getAllOrders } from "../../services/order.service";

const TableOrdersPage = () => {

  /********CODE FETCH DỮ LIỆU TỪ COMPONENT CHA *******/

  /******ORDERS LIST *******/
  const queryOrders = useQuery({
    queryKey: ['orders'],
    queryFn: () => getAllOrders(),
    refetchInterval: 1000,
  });
  console.log('<<=== 🚀 queryOrders.data ===>>', queryOrders.data);
  const dataOrders = queryOrders.data || []
  /******END ORDERS LIST *******/


  /*******DELETE ORDER *******/
  // Mutations - muốn xóa order nào thì gọi hàm này
  const deleteOrderMutation = useMutation({
    mutationFn: ({ tableId }: { tableId: number }) =>
      deleteOrderByTable({ tableId }),
    //khi xóa thành công thì gọi hàm fetch làm tươi lại dữ liệu
    onSuccess: () => {
      // Làm tươi lại danh sách
      queryOrders.refetch();

      //Thông báo xóa thành công
      console.log('<<=== 🚀 Xoá Order thành công  ===>>');
    },
    onError: (error) => {
      //Thông báo lỗi
      console.error('<<=== 🚀 Lỗi xoá Order ===>>', error);
    }
  });
  /*********END DELETE ORDER *******/

  /********state mở modal OrderList *******/
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const onModalTableOrders = (tableId: number) => {
    setSelectedTableId(tableId);
    setIsModalOpen(true);
  };
  console.log('<<=== 🚀 selectedTableId ===>>', selectedTableId);

  const offModalTableOrders = () => {
    setIsModalOpen(false);
  };

  
  /********state tổng tiền từng bàn *******/
  const [tableTotals, setTableTotals] = useState<Record<number, number>>({});

  useEffect(() => { // khi dataOrders thay đổi, chạy lại hàm tính tổng tiền mỗi bàn
    if (!dataOrders) return;

    //object rỗng để lưu tổng tiền của từng bàn.
    const totals: Record<number, number> = {}; //key = number (tableId) & value = number (totalMoney)

    dataOrders.forEach((o: any) => { //duyệt từng order trong danh sách.
      const tableId = Number(o.table.id);

      const orderTotal = o.items.reduce( //reduce: gộp nhiều phần tử thành 1 giá trị.
        (sum: number, item: any) => sum + item.price * item.quantity,
        0
      );

      //Kiểm tra xem bàn đã tồn tại trong object totals chưa.
      if (!totals[tableId]) {
        totals[tableId] = 0;
      }

      totals[tableId] += orderTotal; //Cộng thêm tiền order
    });

    setTableTotals(totals);

  }, [dataOrders]); //chỉ chạy lại khi dataOrders thay đổi

  //hàm xử lí cập nhật lại tổng tiền
  const handleUpdateTableTotals = (tableId: number, total: number) => {
    setTableTotals(prev => ({
      ...prev,
      [tableId]: total
    }));
  };


  /********state tính giờ vào từng bàn *******/
  const [tableTimes, setTableTimes] = useState<Record<number, string>>({});

  //hàm tính giờ đầu tiên của mỗi bàn
  useEffect(() => {
    if (!dataOrders) return;

    const timeOrder: Record<number, string> = {};

    dataOrders.forEach((o: any) => {
      const tableId = Number(o.table.id);

      // nếu bàn chưa có time thì lấy time đầu tiên
      if (!timeOrder[tableId]) {
        timeOrder[tableId] = o.time;
      }
    });

    setTableTimes(timeOrder);

  }, [dataOrders]);


  /********state trạng thái từng bàn *******/
  const [tableStatus, setTableStatus] = useState<Record<number, string>>({});
  const handleUpdateTableStatus = (tableId: number, status: string) => {
    setTableStatus(prev => ({
      ...prev,
      [tableId]: status
    }));
  };
  
  //hàm xử lí trạng thài từng bàn
  useEffect(() => {
    if (!dataOrders) return;

    const status: Record<number, string> = {};

    dataOrders.forEach((o: any) => {
      const tableId = Number(o.table.id);

      //Nếu bàn có order → trạng thái là "pending"
      if (!status[tableId]) {
        status[tableId] = "pending"; // chỉ cần có order là pending
      }
    });

    setTableStatus(status);

  }, [dataOrders]);


  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>Quản lý bàn & Order</span>}
    >
      <title>Bàn & Order</title>

      <TablesList
        onModalTableOrders={onModalTableOrders}
        tableTotals={tableTotals}
        tableTimes={tableTimes}
        tableStatus={tableStatus}
      />

      <OrdersList
        dataOrders={dataOrders}
        isModalOpen={isModalOpen}
        isModalOk={offModalTableOrders}
        isModalCancel={offModalTableOrders}
        tableId={selectedTableId}
        onDeleteOrderList={(tableId: number) => deleteOrderMutation.mutate({ tableId })}
        onUpdateTableTotals={handleUpdateTableTotals}
        onUpdateTableStatus={handleUpdateTableStatus}
      />

    </Card>
  )
}

export default TableOrdersPage