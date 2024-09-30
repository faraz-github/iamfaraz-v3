import { Box } from "@mui/material";

const SectionBox = ({ id, halfScreenHeight, children }) => {
  return (
    <Box
      id={id}
      component="section"
      minHeight={halfScreenHeight ? "50vh" : "fit-content"}
      pb={4}
    >
      {children}
    </Box>
  );
};

export default SectionBox;
