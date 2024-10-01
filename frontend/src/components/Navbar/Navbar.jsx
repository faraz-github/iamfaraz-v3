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
import NavbarMenu from "./NavbarMenu";

import { useAdmin } from "../../contexts/adminContext";
import useDynamicMargin from "../../hooks/useDynamicMargin";
import useCurrentBreakpoint from "../../hooks/useCurrentBreakpoint";

const Navbar = () => {
  const { token, setToken } = useAdmin();
  const margin = useDynamicMargin();
  const currentBreakpoint = useCurrentBreakpoint();

  const logoutAdmin = () => {
    localStorage.removeItem("admin");
    setToken(JSON.parse(localStorage.getItem("admin")));
  };

  return (
    <Box marginY={2}>
      <Stack direction={"row"}>
        <Box
          sx={{ width: margin }}
          border={"1px dashed"}
          borderColor={"primary.main"}
          borderLeft={0}
          borderRight={0}
        />
        <LayoutContainer disableGutters={true}>
          <Grid container>
            <Grid item md={4} sm={8} xs={10}>
              <Grid container>
                <Grid item lg={6} md={8} sm={8} xs={8}>
                  <FarazAhmad />
                </Grid>
                {!token ? (
                  <Grid item lg={6} md={4} sm={4} xs={4}>
                    <StatusIndicator />
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
            <Grid item md={8} sm={4} xs={2}>
              <Grid container height={"100%"}>
                <Grid
                  item
                  md={6}
                  xs={0}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                  sx={{
                    display: {
                      md: "flex", // Show on tablet screens
                      xs: "none", // Hide on small screens
                    },
                  }}
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
                        style={{
                          width: 40,
                          height: "auto",
                        }}
                      />
                    </IconButton>
                  )}
                </Grid>
                <Grid item md={6} xs={12}>
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
                          sx={{
                            display: {
                              lg: "flex", // Show on large screens
                              xs: "none", // Hide on small screens
                            },
                          }}
                        >
                          <Typography variant="h5" fontSize={24}>
                            Log Out
                          </Typography>
                        </Button>
                      </Grid>
                    ) : (
                      <Grid item xs={9}>
                        <Box
                          justifyContent={"space-around"}
                          alignItems={"center"}
                          sx={{
                            display: {
                              lg: "flex", // Show on large screens
                              xs: "none", // Hide on small screens
                            },
                          }}
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
                        </Box>
                      </Grid>
                    )}

                    <Grid
                      item
                      xs={3}
                      display={"flex"}
                      justifyContent={"flex-end"}
                      alignItems={"center"}
                      position={"relative"}
                    >
                      <Stack
                        direction={"row"}
                        spacing={1}
                        position={"absolute"}
                        top={"-20px"}
                        sx={{
                          display: {
                            lg: "flex", // Show on large screens
                            xs: "none", // Hide on small screens
                          },
                        }}
                      >
                        <ThemeSwitch mode={"darkMode"} />
                        <ThemeSwitch mode={"lightMode"} />
                      </Stack>
                      {currentBreakpoint === "xs" ? (
                        <NavbarMenu token={token} logoutAdmin={logoutAdmin} />
                      ) : currentBreakpoint === "sm" ? (
                        <NavbarMenu token={token} logoutAdmin={logoutAdmin} />
                      ) : currentBreakpoint === "md" ? (
                        <NavbarMenu token={token} logoutAdmin={logoutAdmin} />
                      ) : null}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LayoutContainer>
        <Box sx={{ width: margin }} visibility={"hidden"} />
      </Stack>
    </Box>
  );
};

export default Navbar;
