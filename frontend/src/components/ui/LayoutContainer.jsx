import { Container } from "@mui/material";

const LayoutContainer = ({ children }) => {
  return <Container maxWidth="lg" disableGutters>{children}</Container>;
};

export default LayoutContainer;