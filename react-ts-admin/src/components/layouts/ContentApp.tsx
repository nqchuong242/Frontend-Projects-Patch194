import { Layout } from "antd";
import { Outlet } from "react-router";

const { Content } = Layout;

const ContentApp = () => {
    return (
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

    )
}

export default ContentApp