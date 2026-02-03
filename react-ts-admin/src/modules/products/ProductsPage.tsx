import { useMutation, useQuery } from "@tanstack/react-query"
import { createProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from "../../services/products.service";
import { Button, Card } from 'antd';
import ProductsList from "./components/ProductsList";
import { useNavigate, useSearchParams } from "react-router";
import ProductCategorySelect, { type Category } from "./components/ProductCategorySelect";
import { useState } from "react";
import ProductAdd from "./components/ProductAdd";
import ProductEdit from "./components/ProductEdit";
import type { IProduct } from "../../types/product.type";


const ProductsPage = () => {

  const navigate = useNavigate(); //gắn định tuyến khi thay đổi phân trang  
  //Lấy param từ url
  const [params] = useSearchParams();
  const page = Number(params.get('page') || 1);
  const limit = Number(params.get('limit') || 5);


  /********CODE FETCH DỮ LIỆU TỪ COMPONENT CHA *******/

  /******PRODUCTS LIST *******/
  const queryProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  console.log('<<=== 🚀 queryProducts.data ===>>', queryProducts.data);

  //state để lấy danh sách chọn từ component Select, mặc định là dimsum
  const [category, setCategory] = useState<Category>('dimsum');

  //Hàm xử lí phân trang
  const onHandelChangePage = (page: number, pageSize: number) => {
    navigate(`?category=${category}&page=${page}&limit=${pageSize}`); //dùng để hiển thị trên url
  }
  const allProducts = queryProducts?.data?.[category] || [];
  const start = (page - 1) * limit;
  const end = page * limit;

  const products = allProducts.slice(start, end); //slice: Cắt một phần của mảng ra để hiển thị
  /******END PRODUCTS LIST *******/


  /*******DELETE PRODUCT *******/
  // Mutations - muốn xóa sp nào thì gọi hàm này
  const deleteProductMutation = useMutation({
    mutationFn: ({ category, id }: { category: string; id: number }) =>
      deleteProductById({ category, id }),
    //khi xóa thành công thì gọi hàm fetch làm tươi lại dữ liệu
    onSuccess: () => {
      // Làm tươi lại danh sách
      queryProducts.refetch();
      //Thông báo xóa thành công
      console.log('<<=== 🚀 Xoá sản phẩm thành công  ===>>');
    },
    onError: (error) => {
      //Thông báo lỗi
      console.error('<<=== 🚀 Lỗi xoá sản phẩm ===>>', error);
    }
  });
  /*********END DELETE PRODUCT *******/


  /******** ADD PRODUCT ********/
  //state mở modal thêm mới sản phẩm
  const [isModalAddOpen, setIsModalAddOpen] = useState(false);

  // Mutations - muốn thêm sp nào thì gọi hàm này
  const addProductMutation = useMutation({
    mutationFn: ({ category, product }: { category: string; product: any }) =>
      createProduct({ category, product }),
    //khi xóa thành công thì gọi hàm fetch làm tươi lại dữ liệu
    onSuccess: () => {
      // Làm tươi lại danh sách
      queryProducts.refetch();
      //Thông báo xóa thành công
      console.log('<<=== 🚀 Thêm sản phẩm thành công  ===>>');
    },
    onError: (error) => {
      //Thông báo lỗi
      console.error('<<=== 🚀 Lỗi thêm sản phẩm ===>>', error);
    }
  });
  /******** END ADD PRODUCT ********/


  /******** EDIT PRODUCT ********/
  //state mở modal sửa sản phẩm
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

  const queryProductDetails = useQuery({
    enabled: !!selectedProduct, //enabled để kiểm soát có tự động chạy hàm query hay không và chỉ chạy khi có selectedProduct
    queryKey: ['product-details', category, selectedProduct?.id],
    queryFn: () => getProductById({ category, id: selectedProduct!.id }) //selectedProduct! là khẳng định nó không phải là null
  })
  console.log('<<=== 🚀 queryProductDetails.data ===>>', queryProductDetails.data);

  // Mutations - muốn sửa sp nào thì gọi hàm này
  const editProductMutation = useMutation({
    mutationFn: ({ category, id, product }: { category: string; id: number; product: any }) =>
      updateProduct({ category, id, product }),
    //khi sửa thành công thì gọi hàm fetch làm tươi lại dữ liệu
    onSuccess: () => {
      // Làm tươi lại danh sách
      queryProducts.refetch();
      //Thông báo sửa thành công
      console.log('<<=== 🚀 Sửa sản phẩm thành công  ===>>');
    },
    onError: (error) => {
      //Thông báo lỗi
      console.error('<<=== 🚀 Lỗi sửa sản phẩm ===>>', error);
    }
  });

  /******** END EDIT PRODUCT ********/



  return (
    <Card
      title={
        <span style={{ fontSize: 20, fontWeight: 700 }}>Danh sách món ăn</span>}
      extra={
        <div style={{ display: 'flex', gap: 12 }}>
          <ProductCategorySelect
            value={category}
            onChange={(c)=>{
              setCategory(c);
              navigate(`?category=${c}&page=1&limit=${limit}`)
            }}
          />

          <Button
            type="primary"
            onClick={() => { setIsModalAddOpen(true) }}
          >Thêm món ăn</Button>
        </div>
      }
    >

      {/* PRODUCTS LIST */}
      <title>Danh sách món ăn</title>
      <ProductsList
        isLoading={queryProducts.isLoading} //trong useQuery có sẵn isLoading
        data={products ?? []}
        totalRecords={allProducts.length ?? 0}
        onHandelChangePage={onHandelChangePage}
        onDeleteProduct={(id: number) => deleteProductMutation.mutate({ category, id })}
        onEditProduct={(product) => {
          setSelectedProduct(product);
          setIsModalEditOpen(true);
        }}
        currentPage={page}
      />
      {/* END PRODUCTS LIST */}

      {/* ADD PRODUCT */}
      <ProductAdd
        isModalOpen={isModalAddOpen}
        handleOk={() => {
          setIsModalAddOpen(false);
        }}
        handleCancel={() => {
          setIsModalAddOpen(false);
        }}
        onAddProduct={(product) => {
          console.log('<<=== 🚀 new product ===>>', product);
          addProductMutation.mutate({ category, product });
        }}
      />
      {/* END ADD PRODUCT */}

      {/* EDIT PRODUCT */}
      {queryProductDetails.data && selectedProduct && (
        <ProductEdit
          isModalOpen={isModalEditOpen}
          handleOk={() => {
            setIsModalEditOpen(false);
          }}
          handleCancel={() => {
            setIsModalEditOpen(false);
          }}
          onEditProduct={(product) => {
            console.log('<<=== 🚀 updated product ===>>', product);
            editProductMutation.mutate({ category, id: selectedProduct!.id, product });
          }}
          product={queryProductDetails.data}//dữ liệu chi tiết sản phẩm
        />
      )}
      {/* END EDIT PRODUCT */}

    </Card>

  )
}

export default ProductsPage