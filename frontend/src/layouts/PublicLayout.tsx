import { Layout } from "antd";

interface Props {
  children?: React.ReactNode;
}

export const PublicLayout = ({ children, ...restProps }: Props): JSX.Element => {
  return <Layout style={{ minHeight: "100vh", background: "#F2EFEA" }}>{children}</Layout>;
};

export default PublicLayout;
