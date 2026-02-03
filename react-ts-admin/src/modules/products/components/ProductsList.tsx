import { Button, Pagination, Popconfirm, Space, Table, Tag } from "antd"
import type { TableProps } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import type { IProduct } from "../../../types/product.type";

const ProductsList = ({
  isLoading = false,
  data = [],
  totalRecords = 0, //totalRecords là tổng số bản ghi 
  onHandelChangePage,
  onDeleteProduct,
  onEditProduct,
  currentPage
}: {
  isLoading: boolean,
  data: IProduct[],
  totalRecords: number,
  onHandelChangePage: (page: number, pageSize: number) => void
  onDeleteProduct: (id: number) => void,
  onEditProduct: (product: IProduct) => void,
  currentPage: number
}) => {

  const columns: TableProps<IProduct>['columns'] = [
    {
      title: <span style={{ fontSize: 18, fontWeight: 700 }}>Hình ảnh</span>,
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
      onCell: () => ({
        style: { width: 120 }
      }),
      onHeaderCell: () => ({
        style: {
          padding: "20px 0",
        }
      })
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 700 }}>Tên sản phẩm</span>,
      dataIndex: 'name',
      key: 'name',
      render: (text) => <strong>{text}</strong>,
      onCell: () => ({
        style: { width: 250 }
      })
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 700 }}>Giá</span>,
      dataIndex: 'price',
      key: 'price',
      render: (text) => <strong>{text}</strong>,
      onCell: () => ({
        style: { width: 120 }
      })
    },
    {
      title: <span style={{ fontSize: 18, fontWeight: 700 }}>Tình trạng</span>,
      dataIndex: 'isAvailable',
      key: 'isAvailable',
      render: (isAvailable: boolean) => (
        <Tag color={isAvailable ? "green" : "red"}>
          {isAvailable ? "CÒN MÓN" : "HẾT MÓN"}
        </Tag>
      ),
      onCell: () => ({
        style: { width: 120 }
      })
    },
    {
      title: '',
      key: 'action',
      render: (_, record) => ( //cần nhiều trường thì dùng record
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => onEditProduct(record)}
          >Edit</Button>

          <Popconfirm //1 component từ antd để xác nhận xóa
            title='Xác nhận xoá'
            description={`Bạn đồng ý xoá món ăn "${record.name}" ? `}
            onConfirm={() => { onDeleteProduct(record.id) }} //onConfirm: khi người dùng bấm vào nút Yes
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>Delete</Button>
          </Popconfirm>
        </Space>
      ),

    },
  ];






  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={data}
        pagination={false} //pagination riêng nên để false, còn không là pageSize: 5
        size="small"
      />

      <Pagination //component phân trang, defaultCurrent và total là mặc định của Pagination
        current={currentPage}
        pageSize={5}
        total={totalRecords}
        onChange={(page, pageSize) => { //onChange là một cb trong Pagination để lấy page và pageSize, bắt sự kiện user bấm số trang
          onHandelChangePage(page, pageSize);
          console.log('<<=== 🚀 page, pageSize ===>>', page, pageSize);
        }}
      /* page,pageSize là 2 phần từ mặc định, số thứ tự của trang và số lượng sp 1 trang */
      />

    </>
  )
}

export default ProductsList