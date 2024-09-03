import { Box, Typography } from "@mui/material";

const StyledLine = ({
  color,
  thickness,
  leftOrnament,
  rightOrnament,
  leftMargin,
  rightMargin,
  fat = 1,
  centerText,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        height: thickness + fat,
        borderRadius: thickness + fat,
        flexGrow: 1,
        ml: leftMargin,
        mr: rightMargin,
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {leftOrnament ? (
        <Box
          sx={{
            height: thickness * 5 + fat,
            width: thickness * 5 + fat,
            borderRadius: fat > 10 ? (theme) => theme.shape.borderRadius : 0,
            backgroundColor: color,
            position: "absolute",
            top: (-thickness * 4) / 2,
            left: 0,
            transform: "rotate(45deg)",
          }}
        ></Box>
      ) : null}

      {centerText ? (
        <Typography variant="h5" fontSize="22" color="primary.main">
          {centerText}
        </Typography>
      ) : null}

      {rightOrnament ? (
        <Box
          sx={{
            height: thickness * 5 + fat,
            width: thickness * 5 + fat,
            borderRadius: fat > 10 ? (theme) => theme.shape.borderRadius : 0,
            backgroundColor: color,
            position: "absolute",
            top: (-thickness * 4) / 2,
            right: 0,
            transform: "rotate(45deg)",
          }}
        ></Box>
      ) : null}
    </Box>
  );
};

export default StyledLine;
