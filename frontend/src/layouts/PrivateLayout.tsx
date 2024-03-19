import { Layout, theme } from "antd";

import { MdLogout } from "react-icons/md";
import useAuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

// import MainMenu from "../components/MainMenu/MainMenu";
// import { Message } from "../components/Message/Message";
// import TopHeader from "../components/Header/TopHeader";
// import useAuth from "../hooks/useAuth";

const { Header, Content, Footer, Sider } = Layout;

interface PrivateLayoutPropsType {
  children: React.ReactNode;
}

export const PrivateLayout = ({
  children,
  ...restProps
}: PrivateLayoutPropsType): JSX.Element => {
  const { logout } = useAuthService();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const handleLogout = async (values: any) => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to login!");
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Layout
        style={{
          maxHeight: "100vh",
          maxWidth: "100%",
          overflowY: "hidden",
          overflowX: "auto",
          background: "#F2EFEA",
        }}
      >
        <Header
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            height: 50,
            padding: 5,
            // background: "#F4E1D2",
            boxShadow: " 0px 7px 5px rgba(0, 0, 0, 0.2)",
            marginBottom: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#FFB59E" }}>Book World</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <MdLogout
              onClick={handleLogout}
              style={{
                margin: "16px",
                width: "20px",
                height: "20px",
                cursor: "pointer",
                color:"#F2EFEA"
              }}
            />
          </div>
        </Header>
        <Content style={{ maxHeight: "100vh", margin: "0 16px" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
