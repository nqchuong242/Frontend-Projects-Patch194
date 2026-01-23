import { Button, Pagination, Space, Table } from "antd"
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { IProduct } from "../../../types/product.type";

const columns: TableProps<IProduct>['columns'] = [
  {
    title: <span style={{ fontSize: 16, fontWeight: 700 }}>Hình ảnh</span>,
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    render: (s) => (
    <img
      src={s}
      style={{
        width: 60,
        height: 60,
        objectFit: "cover",
        borderRadius: 8
      }}
    />
    ),
  },
  {
    title: <span style={{ fontSize: 16, fontWeight: 700 }}>Tên sản phẩm</span>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <strong>{text}</strong>,
  },
  {
    title: <span style={{ fontSize: 16, fontWeight: 700 }}>Giá</span>,
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: <span style={{ fontSize: 16, fontWeight: 700 }}>Tình trạng</span>,
    dataIndex: 'isAvailable',
    key: 'isAvailable',
  },
  {
    title: '',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Button type="link" icon={<EditOutlined />}>Edit</Button>
        <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
      </Space>
    ),
  },
];


const ProductsList = ({
    isLoading = false,
    data=[],
    totalRecords = 0, //totalRecords là tổng số bản ghi 
    onHandelChangePage
}:{
    isLoading: boolean,
    data: IProduct[],
    totalRecords: number,
    onHandelChangePage: (page: number)=> void
}) => {
    


  return (
    <>
    <Table 
        loading={isLoading} 
        columns={columns} 
        dataSource={data} 
        pagination={false}
    />

    <Pagination //defaultCurrent và total là mặc định của Pagination
        defaultCurrent={1} 
        pageSize={5}
        total={totalRecords} 
        onChange={(page)=>{ //onChange là một cb trong Pagination để lấy page và pageSize, bắt sự kiện user bấm số trang
            onHandelChangePage(page);
            console.log('<<=== 🚀 page ===>>', page);
        }}
        /* page,pageSize là 2 phần từ mặc định, số thứ tự của trang và số lượng sp 1 trang */
    />

    </>
  )
}

export default ProductsList