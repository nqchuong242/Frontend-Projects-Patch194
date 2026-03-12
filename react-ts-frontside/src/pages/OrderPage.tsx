import { useMemo, useState, useCallback, memo, useEffect, useRef } from "react";
import { Layout, Button, Card, Row, Col, Badge, Drawer, Table, Space, Statistic, Empty, Divider, Grid, notification, Input, Select } from "antd";
import { ShoppingCartOutlined, SearchOutlined, DeleteOutlined, PlusOutlined, MinusOutlined } from "@ant-design/icons";
import type { CartItem, IProduct, MenuItem, ITable } from "../types";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "../services/product.service";
import { tablesData } from "../data/tables";
import { createOrder } from "../services/order.service";
const { Header, Content, Footer } = Layout;
const { useBreakpoint } = Grid;


// Memoized ProductCard component for performance
const ProductCard = memo(({ item, screens, onAddToCart }: any) => (
  <Card
    hoverable
    className="h-full shadow-md hover:shadow-xl transition-shadow duration-200"
    cover={
      <img
        alt={item.name}
        src={item.thumbnail}
        className="h-40 md:h-48 object-cover"
        style={{ borderRadius: "12px 12px 0 0" }}
        loading="lazy"
      />
    }
    style={{
      borderRadius: 12,
      border: "1px solid #e8e8e8",
    }}
    bodyStyle={{ padding: screens.md ? "12px" : "8px" }}
  >
    <div>
      <h3 className="font-bold text-slate-900 mb-2 line-clamp-2 text-sm md:text-base">
        {item.name}
      </h3>
      <div className="flex items-center justify-between mb-3">
        <Statistic
          value={item.price}
          suffix="đ"
          valueStyle={{
            color: "#D4A574",
            fontSize: screens.md ? 16 : 14,
          }}
        />
      </div>
      <Button
        type="primary"
        block
        size={screens.md ? "middle" : "small"}
        onClick={() => onAddToCart(item)}
        style={{
          backgroundColor: "#D4A574",
          borderColor: "#D4A574",
          borderRadius: 8,
          fontSize: screens.md ? 14 : 12,
        }}
      >
        + Thêm
      </Button>
    </div>
  </Card>
));

export default function OrderPage() {

  const [selectedTable, setSelectedTable] = useState<ITable | null>(tablesData[0]);
  // const [openMenu, setOpenMenu] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState("");
  const [itemSearch, setItemSearch] = useState<IProduct | null>(null);
  const screens = useBreakpoint();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [openCart, setOpenCart] = useState(false);

  /********CODE FETCH DỮ LIỆU TỪ COMPONENT CHA *******/

  /******PRODUCTS LIST *******/
  const queryProducts = useQuery({
    queryKey: ['products'],
    queryFn: () => getAllProducts(),
  });
  //console.log('<<=== 🚀 queryProducts.data ===>>', queryProducts.data);
  const categories = queryProducts.data

  const categoryLabels: Record<string, string> = {
    dimsum: "DIM SUM",
    noodles: "MÌ TƯƠI",
    rice: "CƠM",
    porridge: "CHÁO",
    drink: "NƯỚC UỐNG",
  };

  //món bán chạy
  const bestSellers = (Object.values(categories || {}).flat() as IProduct[]) //.flat() dùng để làm phẳng mảng lồng nhau.
    .filter((i) => i.isBestSeller && i.isAvailable);

  /******END PRODUCTS LIST *******/


  /******SEND ORDER TO ADMIN *******/

  const handleSendOrder = async () => {

    const order = {
      table: selectedTable || '',
      items: cart.map((i) => ({
        name: i.name,
        price: i.price,
        quantity: i.qty
      })),

      time: new Date().toLocaleTimeString().slice(0, 5)
    };

    await createOrder(order);
  };


  const addToCart = useCallback((item: MenuItem) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === item.id);
      if (found)
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      return [...prev, { ...item, qty: 1 }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty + delta } : p))
        .filter((p) => p.qty > 0)
    );
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.qty, 0), [cart]);
  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  const columns = screens.md
    ? [
      {
        title: "Món ăn",
        dataIndex: "name",
        key: "name",
        render: (text: string) => <span className="font-semibold text-sm">{text}</span>,
      },
      {
        title: "Giá",
        dataIndex: "price",
        key: "price",
        render: (price: number) => <span className="text-sm">{price.toLocaleString()}đ</span>,
      },
      {
        title: "SL",
        dataIndex: "qty",
        key: "qty",
        render: (qty: number, record: CartItem) => (
          <Space size={4}>
            <Button
              size="small"
              type="text"
              icon={<MinusOutlined />}
              onClick={() => updateQty(record.id, -1)}
              disabled={qty <= 1}
            />
            <span className="w-6 text-center font-semibold text-xs">{qty}</span>
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => updateQty(record.id, 1)}
            />
          </Space>
        ),
      },
      {
        title: "Tổng",
        key: "total",
        render: (_: any, record: CartItem) => (
          <span className="font-bold text-orange-600 text-sm">
            {(record.price * record.qty).toLocaleString()}đ
          </span>
        ),
      },
      {
        title: "",
        key: "action",
        render: (_: any, record: CartItem) => (
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            onClick={() => removeFromCart(record.id)}
          />
        ),
      },
    ]
    : [
      {
        title: "Món",
        key: "name",
        render: (_: any, record: CartItem) => (
          <div>
            <p className="font-semibold text-xs mb-1">{record.name}</p>
            <p className="text-xs text-gray-500">{record.price.toLocaleString()}đ x {record.qty}</p>
          </div>
        ),
      },
      {
        title: "",
        key: "action",
        width: 60,
        render: (_: any, record: CartItem) => (
          <Space direction="vertical" size={0}>
            <Button
              size="small"
              type="text"
              icon={<PlusOutlined />}
              onClick={() => updateQty(record.id, 1)}
            />
            <Button
              size="small"
              type="text"
              danger
              icon={<DeleteOutlined />}
              onClick={() => removeFromCart(record.id)}
            />
          </Space>
        ),
      },
    ];


  //hàm xử lí tìm kiếm bằng tiếng việt
  const removeVietnameseTones = (str: string) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const allProducts = (Object.values(categories || {}).flat() as IProduct[]);
  //.flat() dùng để làm phẳng mảng lồng nhau. để thao tác tìm kiếm

  const filteredProducts = Array.from(
    new Map(
      allProducts
        .filter((item) =>
          removeVietnameseTones(item.name).includes(
            removeVietnameseTones(search)
          )
        )
        .map((item) => [item.id, item])
      // key là id, Nếu trùng id → ghi đè, chỉ giữ lại 1 bản duy nhất
    ).values()
  ).slice(0, 5);
  console.log('<<=== 🚀 itemSearch ===>>', itemSearch);

  //Bắt click ngoài để tắt search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch(""); // xóa input
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  return (


    <Layout className="min-h-screen" style={{ backgroundColor: "#fafafa" }}>
      {/* Header */}
      <Header
        className="shadow-md sticky top-0 z-50 gap-3"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          padding: screens.md ? "0 24px" : "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid #e8e8e8",
          height: screens.md ? 64 : 56,
        }}
      >
        <div className="flex items-center gap-2" style={{ flex: 1 }}>
          <h1
            className="font-bold m-0"
            style={{
              fontSize: screens.md ? 20 : 16,
              color: "#262626",
            }}
          >
            🥡 DimSum Restaurant
          </h1>
        </div>

        {/* Search Bar */}
        <div ref={searchRef} className="relative">
          <Input
            type="text"
            placeholder="Tìm món..."
            prefix={<SearchOutlined />}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            size="middle"
          />
          {/* Dropdown */}
          {search && filteredProducts.length > 0 && (
            <div className="absolute right-0 mt-2 w-70 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden">
              {filteredProducts.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer transition"
                  onClick={() => { setItemSearch(item); setSearch("") }}
                >
                  <img
                    alt={item.name}
                    src={item.thumbnail}
                    className="w-12 h-12 object-cover rounded-lg"
                    loading="lazy"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {item.name}
                    </p>
                    <p className="text-sm text-red-500 font-semibold">
                      {item.price.toLocaleString()}đ
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Badge count={cartCount} offset={[-5, 5]}>
            <Button
              type="primary"
              size={screens.md ? "large" : "middle"}
              icon={<ShoppingCartOutlined />}
              onClick={() => setOpenCart(true)}
              style={{
                backgroundColor: "#D4A574",
                borderColor: "#D4A574",
              }}
            >
              {screens.md && "Giỏ"}
            </Button>
          </Badge>
        </div>
      </Header>


      {/* Table Selection */}
      <div style={{
        width: 250,
        position: "fixed",
        top: 64,
        right: 0,
      }}>
        <Select
          value={selectedTable?.id}
          onChange={(val) => {
            const table = tablesData.find((t) => t.id === val);
            setSelectedTable(table || null);
          }}
          options={tablesData.map((t) => ({
            label: (
              <span>
                {t.name}
              </span>
            ),
            value: t.id,
          }))}
          style={{ width: "100%" }}
          size="middle"
        />
      </div>


      <Layout>
        <title>DimSum Restaurant </title>

        {/* Main Content */}
        <Content
          style={{
            padding: screens.md ? "24px" : "12px",
          }}
        >
          {/* Home View - Best Sellers */}

          {itemSearch ? (
            <>
              {/* Item Search */}
              <div className="mb-4 md:mb-6">
                <Button
                  type="text"
                  onClick={() => { setItemSearch(null); setActiveCategory(null); }}
                  style={{ marginBottom: 12, color: "#D4A574", paddingLeft: 0 }}
                >
                  ← Quay lại trang chủ
                </Button>
              </div>

              <Row gutter={[screens.md ? 24 : 12, screens.md ? 24 : 12]}>
                <Col
                  key={itemSearch.id}
                  xs={12}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={6}
                  xxl={4}
                >
                  <ProductCard
                    item={itemSearch}
                    screens={screens}
                    onAddToCart={addToCart}
                  />
                </Col>
              </Row>
            </>

          ) : activeCategory ? (
            <>
              {/* Category View */}
              <div className="mb-4 md:mb-6">
                <Button
                  type="text"
                  onClick={() => setActiveCategory(null)}
                  style={{ marginBottom: 12, color: "#D4A574", paddingLeft: 0 }}
                >
                  ← Quay lại trang chủ
                </Button>
                <h2
                  className="font-bold m-0 mb-2"
                  style={{
                    fontSize: screens.md ? 24 : 18,
                    color: "#262626",
                  }}
                >
                  {categoryLabels[activeCategory]}
                </h2>
                <p className="text-gray-500 text-sm m-0">
                  Tổng {categories?.[activeCategory]?.length || 0} món
                </p>
              </div>

              {categories?.[activeCategory]?.length === 0 ? (
                <Empty description="Không tìm thấy" />
              ) : (
                <Row gutter={[screens.md ? 24 : 12, screens.md ? 24 : 12]}>
                  {categories?.[activeCategory]?.filter((i: IProduct) => i.isAvailable).map((item: IProduct) => (
                    <Col
                      key={item.id}
                      xs={12}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      xxl={4}
                    >
                      <ProductCard
                        item={item}
                        screens={screens}
                        onAddToCart={addToCart}
                      />
                    </Col>
                  ))}
                </Row>
              )}
            </>
          ) : (
            <>
              <div>
                <div className="mb-6">
                  <h2
                    className="font-bold m-0 mb-2"
                    style={{
                      fontSize: screens.md ? 28 : 22,
                      color: "#262626",
                    }}
                  >
                    ⭐ Món Bán Chạy
                  </h2>
                  <p className="text-gray-500 text-sm m-0">
                    Những chiếc bánh yêu thích của khách hàng
                  </p>
                </div>
                <Row gutter={[screens.md ? 24 : 12, screens.md ? 24 : 12]}>
                  {bestSellers.map((item) => (
                    <Col
                      key={item.id}
                      xs={12}
                      sm={12}
                      md={8}
                      lg={6}
                      xl={6}
                      xxl={4}
                    >
                      <ProductCard
                        item={item}
                        screens={screens}
                        onAddToCart={addToCart}
                      />
                    </Col>
                  ))}
                </Row>

                <Divider style={{ margin: "32px 0" }} />

                <div className="mb-6">
                  <h2
                    className="font-bold m-0 mb-4"
                    style={{
                      fontSize: screens.md ? 20 : 18,
                      color: "#262626",
                    }}
                  >
                    📖 Chọn danh mục để xem menu đầy đủ
                  </h2>
                  <div className="grid gap-2" style={{ gridTemplateColumns: screens.md ? "1fr 1fr 1fr" : "1fr 1fr" }}>
                    {Object.keys(categories || {}).map((cate) => (
                      <Button
                        key={cate}
                        block
                        size="large"
                        onClick={() => setActiveCategory(cate)}
                        style={{
                          backgroundColor: "#D4A574",
                          borderColor: "#D4A574",
                          color: "#ffffff",
                          fontWeight: 600,
                          height: 48,
                        }}
                      >
                        {categoryLabels[cate] || cate}

                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

        </Content>
      </Layout>

      {/* Cart Drawer */}
      <Drawer
        title={
          <div>
            <span className="text-lg md:text-xl font-bold">
              <ShoppingCartOutlined style={{ marginRight: 8 }} />
              Hóa Đơn
            </span>
          </div>
        }
        placement={screens.md ? "right" : "bottom"}
        onClose={() => setOpenCart(false)}
        open={openCart}
        width={screens.md ? 500 : "100%"}
        height={screens.md ? undefined : "80vh"}
        bodyStyle={{ paddingBottom: 120 }}
      >
        {cart.length === 0 ? (
          <Empty description="Giỏ trống" />
        ) : (
          <>
            <Table
              dataSource={cart}
              columns={columns}
              pagination={false}
              rowKey="id"
              size={screens.md ? "middle" : "small"}
              scroll={{ x: true }}
            />
            <Divider />
            <div className="flex justify-between items-center mb-6">
              <span className="text-base md:text-lg font-bold">Tổng:</span>
              <Statistic
                value={total}
                suffix="đ"
                valueStyle={{ color: "#D4A574", fontSize: screens.md ? 24 : 18 }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                padding: screens.md ? "16px 24px" : "12px 16px",
              }}
              className="bg-white border-t border-gray-200 flex gap-2"
            >
              <Button block size={screens.md ? "large" : "middle"} onClick={() => setOpenCart(false)}>
                Hủy
              </Button>
              <Button
                block
                type="primary"
                size={screens.md ? "large" : "middle"}
                onClick={() => {
                  handleSendOrder();
                  setOpenCart(false);
                  setTimeout(() => {
                    notification.success({
                      message: 'Thành công',
                      description: `Đơn hàng đã gửi! Tổng: ${total.toLocaleString()}đ`,
                      placement: 'top',
                      style: {
                        width: 350,
                        left: '50%',
                        transform: 'translateX(0)',
                        top: 150,
                      },
                    });
                    setCart([]);
                  }, 500);
                }}
                style={{
                  backgroundColor: "#D4A574",
                  borderColor: "#D4A574",
                }}
              >
                Gửi Bếp
              </Button>
            </div>
          </>
        )}
      </Drawer>

      {/* Footer */}
      <Footer
        style={{
          textAlign: "center",
          background: "#ffffff",
          borderTop: "1px solid #e8e8e8",
          padding: screens.md ? "24px 50px" : "16px",
        }}
      >
        <p className="text-gray-600 text-xs md:text-sm m-0">
          🥡 DimSum Restaurant © 2026
        </p>
      </Footer>
    </Layout >
  );
}