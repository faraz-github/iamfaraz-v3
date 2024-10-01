import { Container } from "@mui/material";

const LayoutContainer = ({ children, disableGutters }) => {
  return (
    <Container maxWidth="lg" fixed disableGutters={disableGutters}>
      {children}
    </Container>
  );
};

export default LayoutContainer;
