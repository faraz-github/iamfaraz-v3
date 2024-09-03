import { Box } from "@mui/material";

const SectionBox = ({ id, halfScreenHeight, children }) => {
  return (
    <Box
      id={id}
      component="section"
      minHeight={halfScreenHeight ? "50vh" : "90vh"}
      pb={1}
    >
      {children}
    </Box>
  );
};

export default SectionBox;
