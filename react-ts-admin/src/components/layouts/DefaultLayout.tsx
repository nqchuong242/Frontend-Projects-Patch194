import { Layout } from "antd";
import SidebarApp from "./SidebarApp";
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";
import ContentApp from "./ContentApp";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useAuthStore } from "../../store/useAuthStore";

const DefaultLayout = () => {
  const navigate = useNavigate();

  //authentication store
  const { user, isAuthenticated } = useAuthStore((state) => state);

  useEffect(() => {
    if (!user || isAuthenticated == false) {
      //nếu chưa đăng nhập thì chuyển về trang login
      navigate('/login');
    }
  }, [user, navigate, isAuthenticated]);
  
  return (
    <Layout className="default-layout" style={{ minHeight: "100vh" }}>
      <SidebarApp />

      <Layout className="main-layout" style={{ marginLeft: 200 }}>
        <HeaderApp />
        <ContentApp />
        <FooterApp />
      </Layout>

    </Layout>

  )
}

export default DefaultLayout