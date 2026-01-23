import { Layout, Menu } from "antd";
import {
  DashboardOutlined,
  AppstoreOutlined,
  TableOutlined,
  BarChartOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { NavLink, Outlet, useLocation } from "react-router";

const { Header, Sider, Content, Footer } = Layout;

export default function DefaultLayout() {
  const location = useLocation();

  const menuItems = [
    {
      key: "/dashboard",
      icon: <DashboardOutlined />,
      label: <NavLink to="/dashboard">Dashboard</NavLink> // NavLink là 1 element có role click
    },
    {
      key: "/products",
      icon: <AppstoreOutlined />,
      label: <NavLink to="/products">Món ăn</NavLink>
    },
    {
      key: "/tables",
      icon: <TableOutlined />,
      label: <NavLink to="/tables">Bàn & Order</NavLink>
    },
    {
      key: "/reports",
      icon: <BarChartOutlined />,
      label: <NavLink to="/reports">Doanh thu</NavLink>
    },
    {
      key: "/settings",
      icon: <SettingOutlined />,
      label: <NavLink to="/settings">Cài đặt</NavLink>
    }
  ];

  return (
    <Layout className="default-layout" style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider className="sidebar"
        breakpoint="lg"
        collapsedWidth="80"
        style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}
      >
        <div className="user"
          style={{
            height: 64,
            margin: 16,
            borderRadius: 12,
            background: "rgba(255, 255, 255, 0.15)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 600,
            fontSize: 16,
            color: "#fff",
            letterSpacing: 1
          }}
        >
          ADMIN
        </div>
        <Menu className="menu" //Menu.Item được render thành element có role click
          theme="dark"
          mode="inline" //menu dọc
          selectedKeys={[location.pathname]} //danh sách key của các menu item đang được chọn, pathname = phần đường dẫn của URL
          items={menuItems}
        />
      </Sider>

      {/* Main Layout */}
      <Layout className="main-layout" style={{ marginLeft: 200 }}>
        {/* Header */}
        <Header className="header"
          style={{
            padding: "0 24px",
            background: "#fff",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 16
          }}
        >
          {/* User */}
          <div className="user-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#555",
              fontWeight: 500
            }}
          >
            {/* User icon */}
            <UserOutlined />
            <span>Admin</span>
          </div>

          {/* Logout button */}
          <div className="logout"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "2px 2px",
              borderRadius: 8,
              cursor: "pointer",
              color: "#ff4d4f",
            }}
          >
            {/* Logout icon */}
            <LogoutOutlined />
            <span>Logout</span>
          </div>
        </Header>

        {/* Content */}
        <Content className="content" style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div className="outlet"
            style={{
              padding: 24,
              background: "#fff",
              minHeight: 360
            }}
          >
            {/* Nơi hiển thị nội dung của các trang con */}
            <Outlet />
          </div>
        </Content>

        {/* Footer */}
        <Footer className="footer" style={{ textAlign: "center" }}>
          Fontend Projects - Patch194 ©2026
        </Footer>
      </Layout>
    </Layout>
  );
}
