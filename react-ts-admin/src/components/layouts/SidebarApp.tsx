import { Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router";
import {
    DashboardOutlined,
    AppstoreOutlined,
    TableOutlined,
    BarChartOutlined,
    SettingOutlined
} from "@ant-design/icons";

const { Sider } = Layout;

const SidebarApp = () => {
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
    )
}

export default SidebarApp