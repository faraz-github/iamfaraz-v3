import { Container } from "@mui/material";

const LayoutContainer = ({ children }) => {
  return (
    <Container maxWidth="lg" fixed disableGutters>
      {children}
    </Container>
  );
};

export default LayoutContainer;
