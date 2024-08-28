import { HashLink } from "react-router-hash-link";
import { Typography } from "@mui/material";

const NavigationHashLink = ({ to, label }) => {
  return (
    <HashLink smooth to={to} style={{ textDecoration: "none" }}>
      <Typography
        variant="h6"
        fontSize={32}
        color="primary.light"
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
