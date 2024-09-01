import { Box, Typography } from "@mui/material";

import { useColorTheme } from "../../contexts/themeContext";

const ClientHighlightCard = ({ title, description, logo }) => {
  const { theme } = useColorTheme();

  return (
    <Box
      sx={{
        width: 250,
        height: 250,
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
        width={50}
        height={50}
        borderRadius={"50%"}
        sx={{
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
      <Box py={2} pl={4} pr={4}>
        <Typography
          variant="h5"
          fontSize={24}
          color={"primary.main"}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          fontSize={16}
          color={"primary.main"}
          mt={3}
          textAlign={"center"}
        >
          {description}
        </Typography>
      </Box>
    </Box>
  );
};

export default ClientHighlightCard;
