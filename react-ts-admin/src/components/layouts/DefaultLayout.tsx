import {Layout} from "antd";
import SidebarApp from "./SidebarApp";
import HeaderApp from "./HeaderApp";
import FooterApp from "./FooterApp";
import ContentApp from "./ContentApp";

const DefaultLayout = () => {
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