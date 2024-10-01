import { Box } from "@mui/material";

const SectionBox = ({ id, halfScreenHeight, children, paddingBottom }) => {
  return (
    <Box
      id={id}
      component="section"
      minHeight={halfScreenHeight ? "50vh" : "fit-content"}
      pb={paddingBottom ? paddingBottom : 0}
    >
      {children}
    </Box>
  );
};

export default SectionBox;
