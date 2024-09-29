import React, { useState } from "react";

import { Box, IconButton, Drawer, Stack, Button, Typography } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseIcon from "@mui/icons-material/Close";
import LogoutIcon from "@mui/icons-material/Logout";

import NavigationHashLink from "./NavigationHashLink";
import ThemeSwitch from "./ThemeSwitch";
import StyledLine from "../ui/StyledLine";

const NavbarMenu = ({ token, logoutAdmin }) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const closeDrawer = () => {
    setOpen(false);
  };

  const logoutDashboardAdmin = () => {
    logoutAdmin();
    closeDrawer();
  }

  return (
    <>
      <Box>
        <IconButton size="large" onClick={toggleDrawer(true)}>
          <MenuRoundedIcon fontSize="inherit" />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "100vw", // Full width
            height: "100vh", // Full height
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: (theme) => theme.palette.background.default,
          },
        }}
      >
        <IconButton
          color="secondary"
          size="large"
          onClick={toggleDrawer(false)}
          sx={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        {token ? (
          <Button
            variant="contained"
            size="large"
            color="secondary"
            endIcon={<LogoutIcon />}
            disableElevation
            onClick={logoutDashboardAdmin}
          >
            <Typography variant="h5" fontSize={24}>
              Log Out
            </Typography>
          </Button>
        ) : (
          <>
            <NavigationHashLink
              to={"/#projects"}
              label={"Projects"}
              handler={closeDrawer}
            />
            <NavigationHashLink
              to={"/#skill"}
              label={"Skills"}
              handler={closeDrawer}
            />
            <NavigationHashLink
              to={"/#contact"}
              label={"Contact"}
              handler={closeDrawer}
            />
          </>
        )}
        <Stack width={150} mt={5}>
          <StyledLine
            color={"primary.main"}
            thickness={1}
            leftOrnament
            rightOrnament
          />
          <Stack direction={"row"} spacing={1} justifyContent={"center"}>
            <ThemeSwitch mode={"darkMode"} />
            <ThemeSwitch mode={"lightMode"} />
          </Stack>
        </Stack>
      </Drawer>
    </>
  );
};

export default NavbarMenu;
