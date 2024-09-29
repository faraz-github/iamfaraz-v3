import { HashLink } from "react-router-hash-link";
import { Typography } from "@mui/material";
import { useColorTheme } from "../../contexts/themeContext";

const NavigationHashLink = ({ to, label, handler }) => {
  const { theme } = useColorTheme();

  return (
    <HashLink
      smooth
      to={to}
      style={{ textDecoration: "none" }}
      onClick={handler}
    >
      <Typography
        variant="h6"
        fontSize={32}
        color={theme === "light" ? "primary.light" : "primary.dark"}
        textTransform="lowercase"
        sx={{
          "&:hover": {
            color: "primary.main",
          },
        }}
      >
        {label}
      </Typography>
    </HashLink>
  );
};

export default NavigationHashLink;
