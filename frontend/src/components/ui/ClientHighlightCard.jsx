import { Box, Typography } from "@mui/material";

import { useColorTheme } from "../../contexts/themeContext";

const ClientHighlightCard = ({ title, description, logo }) => {
  const { theme } = useColorTheme();

  return (
    <Box
      sx={{
        width: {
          md: 250,
          sm: 200,
          xs: 175,
        },
        height: {
          md: 250,
          sm: 200,
          xs: 175,
        },
        backgroundImage:
          theme === "light"
            ? "url(/assets/highlightCardLight.svg)"
            : "url(/assets/highlightCardDark.svg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        position: "relative",
      }}
    >
      <Box
        borderRadius={"50%"}
        sx={{
          width: {
            md: 50,
            sm: 40,
            xs: 30,
          },
          height: {
            md: 50,
            sm: 40,
            xs: 30,
          },
          background: (theme) => theme.palette.background.paper,
          position: "absolute",
          right: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {logo}
      </Box>
      <Box
        py={2}
        sx={{
          px: {
            md: 4,
            sm: 3,
            xs: 2,
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontSize: {
              md: 24,
              sm: 20,
              xs: 18,
            },
          }}
          color={"primary.main"}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: {
              md: 16,
              sm: 14,
              xs: 12,
            },
            mt: {
              md: 3,
              sm: 2,
              xs: 2,
            },
          }}
          color={"primary.main"}
          textAlign={"center"}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientHighlightCard;
