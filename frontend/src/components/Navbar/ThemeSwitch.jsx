import { Box, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import { useColorTheme } from "../../contexts/themeContext";
import { lightTheme, darkTheme } from "../../MUI/theme";

const ThemeSwitch = ({ mode }) => {
  const { theme, setDarkTheme, setLightTheme } = useColorTheme();

  const secondaryColor = lightTheme.palette.secondary.main;
  const lightColor  = darkTheme.palette.primary.main;
  const darkColor = lightTheme.palette.primary.main;

  return (
    <Box
      width={40}
      height={
        mode === "darkMode" && theme === "dark"
          ? 60
          : mode === "lightMode" && theme === "light"
          ? 60
          : 40
      }
      bgcolor={"primary.main"}
      position={"relative"}
      sx={{ transition: "height 0.5s ease" }}
    >
      <center>
        {mode === "darkMode" ? (
          <DarkModeIcon
            fontSize="medium"
            htmlColor={theme === "dark" ? secondaryColor : lightColor}
            onClick={setDarkTheme}
            sx={{ cursor: "pointer", my:1 }}
          />
        ) : mode === "lightMode" ? (
          <LightModeIcon
            fontSize="medium"
            htmlColor={theme === "light" ? secondaryColor : darkColor}
            onClick={setLightTheme}
            sx={{ cursor: "pointer", my:1 }}
          />
        ) : null}
      </center>
      <Stack direction={"row"} position={"absolute"} bottom={-20}>
        <Box
          borderTop={"20px solid"}
          borderColor={(theme)=> theme.palette.primary.main}
          borderRight={"20px solid transparent"}
          borderRadius={"0 0 0 10px"}
        ></Box>
        <Box
          borderTop={"20px solid"}
          borderColor={(theme)=> theme.palette.primary.main}
          borderLeft={"20px solid transparent"}
          borderRadius={"0 0 10px 0"}
        ></Box>
      </Stack>
    </Box>
  );
};

export default ThemeSwitch;
