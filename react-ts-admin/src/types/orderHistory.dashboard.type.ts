
interface TableInfo {
    id: string;
    name: string
}

export interface OrderItems {
    name: string;
    price: number;
    quantity: number
}

export interface Order {
  id: number
  table: TableInfo
  items: OrderItems[]
  time: string
}

export type OrderHistory = {
    id: number;
    tableId: string;
    items: OrderItems[];
    total: number;
    date: string;
    time: string
}