import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const FarazAhmad = () => {
  return (
    <Box
      border={"1px dashed"}
      borderColor={"primary.main"}
      borderLeft={0}
      width="fit-content"
      pr={1}
    >
      <Typography
        component={Link}
        to={"/"}
        variant="h2"
        fontSize={48}
        color={"primary.main"}
        textTransform={"lowercase"}
      >
        Faraz Ahmad
      </Typography>
    </Box>
  );
};

export default FarazAhmad;
