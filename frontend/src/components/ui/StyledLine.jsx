import { Box } from "@mui/material";

const StyledLine = ({ color, thickness , leftMargin }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        height: thickness,
        borderRadius: thickness,
        flexGrow: 1,
        ml: leftMargin,
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: thickness * 5,
          width: thickness * 5,
          backgroundColor: color,
          position: "absolute",
          top: (-thickness * 4) / 2,
          right: 0,
          transform: "rotate(45deg)",
        }}
      ></Box>
    </Box>
  );
};

export default StyledLine;