import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Button, Fab, Grid, Stack, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";
import PhoneAndroidRoundedIcon from "@mui/icons-material/PhoneAndroidRounded";

import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import StyledLine from "./ui/StyledLine";
import MessageMeModal from "./ui/MessageMeModal";
import MeetingModal from "./ui/MeetingModal";

import { statusColor, statusText } from "./Navbar/StatusIndicator";
import useCurrentBreakpoint from "../hooks/useCurrentBreakpoint";

const ContactSection = () => {
  const currentBreakpoint = useCurrentBreakpoint();

  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openMettingModal, setOpenMeetingModal] = useState(false);

  // state
  const [status, setStatus] = useState(null);
  const [contact, setContact] = useState(null);

  // ---API
  useEffect(() => {
    const readPersonalInfo = async () => {
      try {
        const response = await axios.get("/api/info/personal");
        if (response) {
          setStatus(response.data[0]?.status);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    const readContactInfo = async () => {
      try {
        const response = await axios.get("/api/info/contact");
        if (response) {
          setContact(response.data[0]);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readPersonalInfo();
    readContactInfo();
  }, []);

  return (
    <SectionBox id="contact" halfScreenHeight>
      <LayoutContainer>
        {currentBreakpoint === "sm" ? null : currentBreakpoint ===
          "xs" ? null : (
          <StyledLine
            color={"primary.main"}
            thickness={2}
            leftOrnament
            rightOrnament
          />
        )}

        <Grid container>
          <Grid
            item
            md={6}
            xs={12}
            sx={{
              p: {
                md: 10,
                sm: 5,
                xs: 5,
              },
            }}
          >
            <Stack
              spacing={2}
              sx={{
                textAlign: {
                  md: "left",
                  sm: "center",
                  xs: "center",
                },
              }}
            >
              <Typography
                variant="h1"
                color={"primary.main"}
                gutterBottom
                sx={{
                  fontSize: {
                    lg: 40,
                    md: 34,
                    sm: 40,
                    xs: 36,
                  },
                }}
              >
                Are you looking for me?
              </Typography>
              <Typography
                variant="h3"
                color={"primary.main"}
                gutterBottom
                sx={{
                  fontSize: {
                    lg: 32,
                    md: 28,
                    sm: 32,
                    xs: 30,
                  },
                }}
              >
                Let's talk about your project!
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                sx={{
                  justifyContent: {
                    md: "flex-start",
                    sm: "center",
                    xs: "center",
                  },
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ borderRadius: 15 }}
                  onClick={() => setOpenMessageModal(true)}
                >
                  <Typography variant="h3" fontSize={32}>
                    Send Message
                  </Typography>
                </Button>
                <Fab
                  color="secondary"
                  aria-label="add"
                  onClick={() => setOpenMeetingModal(true)}
                >
                  <EventIcon />
                </Fab>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            sx={{
              pb: {
                md: 0,
                sm: 15,
                xs: 10,
              },
            }}
          >
            <Stack width={"100%"}>
              {currentBreakpoint === "sm" ? (
                <StyledLine
                  color={"primary.main"}
                  thickness={2}
                  leftOrnament
                  rightOrnament
                />
              ) : currentBreakpoint === "xs" ? (
                <StyledLine
                  color={"primary.main"}
                  thickness={2}
                  leftOrnament
                  rightOrnament
                  rightMargin={2}
                  leftMargin={2}
                />
              ) : null}
              <Box
                width={400}
                height={300}
                bgcolor={"primary.main"}
                position={"relative"}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                mx={"auto"}
                sx={{
                  width: {
                    sm: 400,
                    xs: 300,
                  },
                  height: {
                    sm: 300,
                    xs: 250,
                  },
                }}
              >
                <Stack alignItems={"center"} spacing={4}>
                  <Stack direction={"row"} spacing={2}>
                    <Box
                      width={30}
                      height={30}
                      border="1px solid"
                      borderColor={statusColor(status)}
                      borderRadius={(theme) => theme.shape.borderRadius}
                      sx={{ transform: "rotate(45deg)" }}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Box
                        width={20}
                        height={20}
                        bgcolor={statusColor(status)}
                        borderRadius={(theme) => theme.shape.borderRadius}
                      ></Box>
                    </Box>
                    <Typography
                      variant="h6"
                      fontSize={24}
                      color={statusColor(status)}
                    >
                      {statusText(status)}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <EmailRoundedIcon
                      fontSize="large"
                      sx={{ color: (theme) => theme.palette.background.paper }}
                    />
                    <Typography
                      variant="body2"
                      color={(theme) => theme.palette.background.paper}
                      sx={{
                        fontSize: {
                          sm: 20,
                          xs: 18,
                        },
                      }}
                    >
                      {contact?.email}
                    </Typography>
                  </Stack>
                  <Stack direction={"row"} spacing={2} alignItems={"center"}>
                    <PhoneAndroidRoundedIcon
                      fontSize="large"
                      sx={{ color: (theme) => theme.palette.background.paper }}
                    />
                    <Typography
                      variant="h5"
                      fontSize={24}
                      color={(theme) => theme.palette.background.paper}
                    >
                      {contact?.phone}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack
                  direction={"row"}
                  position={"absolute"}
                  sx={{
                    bottom: {
                      sm: -100,
                      xs: -75,
                    },
                  }}
                >
                  <Box
                    sx={{
                      borderTop: {
                        sm: "100px solid",
                        xs: "75px solid",
                      },
                      borderRight: {
                        sm: "200px solid transparent",
                        xs: "150px solid transparent",
                      },
                      borderTopColor: (theme) => ({
                        sm: theme.palette.primary.main,
                        xs: theme.palette.primary.main,
                      }),
                    }}
                  ></Box>
                  <Box
                    sx={{
                      borderTop: {
                        sm: "100px solid",
                        xs: "75px solid",
                      },
                      borderLeft: {
                        sm: "200px solid transparent",
                        xs: "150px solid transparent",
                      },
                      borderTopColor: (theme) => ({
                        sm: theme.palette.primary.main,
                        xs: theme.palette.primary.main,
                      }),
                    }}
                  ></Box>
                </Stack>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </LayoutContainer>
      <MessageMeModal
        open={openMessageModal}
        handleClose={() => setOpenMessageModal(false)}
      />
      <MeetingModal
        open={openMettingModal}
        handleClose={() => setOpenMeetingModal(false)}
      />
    </SectionBox>
  );
};

export default ContactSection;
