import { Link } from "react-router-dom";
import { Box, IconButton, Stack, Typography } from "@mui/material";

const FarazAhmad = () => {
  return (
    <Box
      border={"1px dashed"}
      borderColor={"primary.main"}
      borderLeft={0}
      width="fit-content"
      pr={1}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <IconButton
          component={Link}
          to={"/aboutme"}
          aria-label="logo"
          sx={{
            display: {
              md: "none", // Hide on tablet screens
              xs: "flex", // Show on small screens
            },
          }}
        >
          <img
            src="/assets/navbarLogo.svg"
            alt="Logo"
            style={{
              width: 40,
              height: "auto",
            }}
          />
        </IconButton>
        <Typography
          component={Link}
          to={"/"}
          variant="h2"
          sx={{
            fontSize: {
              sm: 48,
              xs: 40,
            },
          }}
          color={"primary.main"}
          textTransform={"lowercase"}
        >
          Faraz Ahmad
        </Typography>
      </Stack>
    </Box>
  );
};

export default FarazAhmad;
