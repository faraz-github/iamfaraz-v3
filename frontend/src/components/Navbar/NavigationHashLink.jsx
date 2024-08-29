import { HashLink } from "react-router-hash-link";
import { Typography } from "@mui/material";
import { useColorTheme } from "../../contexts/themeContext";

const NavigationHashLink = ({ to, label }) => {

  const {theme} = useColorTheme();

  return (
    <HashLink smooth to={to} style={{ textDecoration: "none" }}>
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
