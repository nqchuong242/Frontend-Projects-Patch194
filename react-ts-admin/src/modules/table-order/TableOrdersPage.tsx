import { Card } from "antd";
import TablesList from "./components/TablesList";
import { useState } from "react";
import TableOrders from "./components/TableOrders";

const TableOrdersPage = () => {

  //state mở modal TableOrders
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onModalTableOrders = () => {
    setIsModalOpen(true);
  };

  const offModalTableOrders = () => {
    setIsModalOpen(false);
  };

  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>Quản lý bàn & Order</span>}
    >
      <title>Bàn & Order</title>
      
      <TablesList onModalTableOrders={onModalTableOrders} />

      <TableOrders
        isModalOpen={isModalOpen}
        isModalOk={offModalTableOrders}
        isModalCancel={offModalTableOrders}
      />
    </Card>
  )
}

export default TableOrdersPage