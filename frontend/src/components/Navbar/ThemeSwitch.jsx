import { Box, Stack } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

// TODO fix hard coded color problem
// #F35E3E - secondary.main
// #FFFFFF - common.white
// #252525 - primary.main


const ThemeSwitch = ({ mode, colorMode, setColorMode }) => {
  return (
    <Box
      width={40}
      height={
        mode === "darkMode" && colorMode === "dark"
          ? 40
          : mode === "lightMode" && colorMode === "light"
          ? 40
          : 30
      }
      bgcolor={"primary.main"}
      position={"relative"}
      sx={{ transition: "height 0.5s ease" }}
    >
      <center style={{ paddingTop: "5px" }}>
        {mode === "darkMode" ? (
          <DarkModeIcon
            fontSize="small"
            htmlColor={colorMode === "dark" ? "#F35E3E" : "#FFFFFF"}
            onClick={() => setColorMode("dark")}
            sx={{ cursor: "pointer" }}
          />
        ) : mode === "lightMode" ? (
          <LightModeIcon
            fontSize="small"
            htmlColor={colorMode === "light" ? "#F35E3E" : "#FFFFFF"}
            onClick={() => setColorMode("light")}
            sx={{ cursor: "pointer" }}
          />
        ) : null}
      </center>
      <Stack direction={"row"} position={"absolute"} bottom={-20}>
        <Box
          borderRight={"20px solid transparent"}
          borderTop={"20px solid #252525"}
          borderRadius={"0 0 0 10px"}
        ></Box>
        <Box
          borderLeft={"20px solid transparent"}
          borderTop={"20px solid #252525"}
          borderRadius={"0 0 10px 0"}
        ></Box>
      </Stack>
    </Box>
  );
};

export default ThemeSwitch;
