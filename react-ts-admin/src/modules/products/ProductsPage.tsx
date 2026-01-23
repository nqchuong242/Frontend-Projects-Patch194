import { useQuery } from "@tanstack/react-query"
import { getAllProducts } from "../../services/products.service";
import { Button, Card } from 'antd';
import ProductsList from "./components/ProductsList";
import { useNavigate, useSearchParams  } from "react-router";


const ProductsPage = () => {
  const navigate = useNavigate(); //gắn định tuyến khi thay đổi phân trang  
  //Lấy param từ url
  const [params] = useSearchParams();
  const page = Number(params.get('page') || 1);
  const limit = 5;


  /********CODE FETCH DỮ LIỆU TỪ COMPONENT CHA *******/

  /******PRODUCTS LIST *******/
  const queryProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  console.log('<<=== 🚀 queryProducts.data ===>>', queryProducts.data);

  //hàm xử lí phân trang
  const onHandelChangePage = (page: number) => {
    navigate(`?page=${page}`); 
  }

  const allProducts = queryProducts?.data?.dimsum || [];
  const start = (page - 1) * limit;
  const end = page * limit;

  const products = allProducts.slice(start, end); //slice: Cắt một phần của mảng ra để hiển thị

  /******END PRODUCTS LIST *******/




  return (
    <Card title="Danh sách món ăn" extra={<Button type="primary">Thêm món ăn</Button>}>
      <title>Danh sách món ăn</title>

      <ProductsList 
        isLoading={queryProducts.isLoading} //trong useQuery có sẵn isLoading
        data={products ?? []}
        totalRecords={allProducts.length ?? 0}
        onHandelChangePage = {onHandelChangePage}
      
      />

    </Card>
    
  )
}

export default ProductsPage