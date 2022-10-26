import { Container } from "@mui/material";

const Layout = (props) => {
  return <Container maxWidth="lg">{props.children}</Container>;
};

export default Layout;
