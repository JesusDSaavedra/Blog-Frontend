import { Layout, Space } from "antd";
import Navbar from "../nav-bar/Navbar";

import './scss/layout.scss'

const { Header, Content } = Layout;

// const headerStyle = {
//   textAlign: "center",
//   color: "#fff",
//   fontWeidth: "500",
//   height: "10vh",
//   paddingInline: 50,
//   lineHeight: "64px",
//   backgroundColor: "#2B2D42",
// };

// const contentStyle = {
//   textAlign: "center",
//   // height: "90vh",
//   lineHeight: "120px",
//   color: "#fff",
//   backgroundColor: "#ffffff",
// };

const LayoutApp = ({ children }) => {
  return (
    <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
      <Layout>
        <Header
        // style={headerStyle}
        >
          <Navbar />
        </Header>
        <Layout>
          <Content
          // style={contentStyle}
          >
            {children}
            {/* <Article/> */}
            {/* <AdminPage/> */}
          </Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default LayoutApp;
