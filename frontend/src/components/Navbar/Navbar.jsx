import { Link } from "react-router-dom";
import { Box, Grid, IconButton, Stack } from "@mui/material";

import LayoutContainer from "../ui/LayoutContainer";
import FarazAhmad from "./FarazAhmad";
import StatusIndicator from "./StatusIndicator";
import NavigationHashLink from "./NavigationHashLink";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <Box marginY={2}>
      <Stack direction={"row"}>
        <Box
          className={"faraz-ahmad-left-border"}
          border={"1px dashed"}
          borderColor={"primary.main"}
          borderLeft={0}
          borderRight={0}
        ></Box>
        <LayoutContainer>
          <Grid container>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={6}>
                  <FarazAhmad />
                </Grid>
                <Grid item xs={6}>
                  <StatusIndicator />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <Grid container height={"100%"}>
                <Grid
                  item
                  xs={6}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <IconButton
                    component={Link}
                    to={"/aboutme"}
                    aria-label="logo"
                  >
                    <img
                      src="/assets/navbarLogo.svg"
                      alt="Logo"
                      style={{ width: 40, height: "auto" }}
                    />
                  </IconButton>
                </Grid>
                <Grid item xs={6}>
                  <Grid container height={"100%"}>
                    <Grid
                      item
                      xs={9}
                      display={"flex"}
                      justifyContent={"space-around"}
                      alignItems={"center"}
                    >
                      <NavigationHashLink
                        to={"/#projects"}
                        label={"Projects"}
                      />
                      <NavigationHashLink to={"/#skills"} label={"Skills"} />
                      <NavigationHashLink to={"/#contact"} label={"Contact"} />
                    </Grid>
                    <Grid
                      item
                      xs={3}
                      display={"flex"}
                      justifyContent={"flex-end"}
                      position={"relative"}
                    >
                      <Stack direction={"row"} spacing={1} position={"absolute"}  top={"-20px"}>
                        <ThemeSwitch mode={"darkMode"} />
                        <ThemeSwitch mode={"lightMode"} />
                      </Stack>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LayoutContainer>
        <Box className={"faraz-ahmad-left-border"} visibility={"hidden"}></Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
