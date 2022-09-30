import { Container } from "@mui/material";

const Layout = (props) => {
  return <Container maxWidth="xl">{props.children}</Container>;
};

export default Layout;
