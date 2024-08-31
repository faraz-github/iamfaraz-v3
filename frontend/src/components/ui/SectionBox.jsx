import { Box } from "@mui/material";

const SectionBox = ({ id, children }) => {
  return <Box id={id} component="section">{children}</Box>;
};

export default SectionBox;