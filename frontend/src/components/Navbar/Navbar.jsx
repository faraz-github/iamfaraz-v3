import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

import LayoutContainer from "../ui/LayoutContainer";
import StyledLine from "../ui/StyledLine";

import FarazAhmad from "./FarazAhmad";
import StatusIndicator from "./StatusIndicator";
import NavigationHashLink from "./NavigationHashLink";
import ThemeSwitch from "./ThemeSwitch";

import { useAdmin } from "../../contexts/adminContext";

const Navbar = () => {
  const { token, setToken } = useAdmin();

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    setToken(JSON.parse(localStorage.getItem("admin")));
  };

  return (
    <Box marginY={2}>
      <Stack direction={"row"}>
        <Box
          className={"horizontalMarginWidth"}
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
                  {token ? (
                    <Stack
                      direction={"row"}
                      minWidth={"200px"}
                      alignItems={"center"}
                    >
                      <StyledLine
                        color={"secondary.main"}
                        thickness={1}
                        leftOrnament
                        rightMargin={1}
                      />
                      <Typography
                        variant="h3"
                        fontSize={32}
                        color={"primary.main"}
                      >
                        Dashboard
                      </Typography>
                      <StyledLine
                        color={"secondary.main"}
                        thickness={1}
                        rightOrnament
                        leftMargin={1}
                      />
                    </Stack>
                  ) : (
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
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Grid container height={"100%"}>
                    {token ? (
                      <Grid
                        item
                        xs={9}
                        display={"flex"}
                        justifyContent={"flex-end"}
                        alignItems={"center"}
                      >
                        <Button
                          variant="contained"
                          size="large"
                          color="secondary"
                          endIcon={<LogoutIcon />}
                          disableElevation
                          onClick={logoutAdmin}
                        >
                          <Typography variant="h5" fontSize={24}>
                            Log Out
                          </Typography>
                        </Button>
                      </Grid>
                    ) : (
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
                        <NavigationHashLink to={"/#skill"} label={"Skills"} />
                        <NavigationHashLink
                          to={"/#contact"}
                          label={"Contact"}
                        />
                      </Grid>
                    )}

                    <Grid
                      item
                      xs={3}
                      display={"flex"}
                      justifyContent={"flex-end"}
                      position={"relative"}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        position={"absolute"}
                        top={"-20px"}
                      >
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
        <Box className={"horizontalMarginWidth"} visibility={"hidden"}></Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
