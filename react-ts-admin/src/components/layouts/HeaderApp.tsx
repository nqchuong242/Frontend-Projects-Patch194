import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { Layout } from "antd";
import { useAuthStore } from "../../store/useAuthStore";

const { Header } = Layout;

const HeaderApp = () => {

  const { user, logout } = useAuthStore((state) => state);

  return (
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
        <span>{user?.username}</span>
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
        onClick={() => logout()}
      >
        {/* Logout icon */}
        <LogoutOutlined />
        <span>Logout</span>
      </div>

    </Header>
  )
}

export default HeaderApp