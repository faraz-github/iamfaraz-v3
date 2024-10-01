import { useState, useEffect } from "react";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

import { Box, Button, Grid, Stack, Typography, useTheme } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";
import ClientHighlightCard from "./ui/ClientHighlightCard";
import SectionHeading from "./ui/SectionHeading";

import useCurrentBreakpoint from "../hooks/useCurrentBreakpoint";

const HeroSection = () => {
  const theme = useTheme(); // Access the theme
  const currentBreakpoint = useCurrentBreakpoint();

  // state
  const [clients, setClients] = useState([]);

  // helpers
  const trimProjectTitle = (projectTitle) => {
    const index = projectTitle.indexOf("(");
    const result =
      index !== -1 ? projectTitle.substring(0, index).trim() : projectTitle;
    return result;
  };

  // ---API
  useEffect(() => {
    const readClientInfo = async () => {
      try {
        const response = await axios.get("/api/client/all");
        if (response) {
          setClients(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readClientInfo();
  }, []);

  return (
    <SectionBox id="hero" halfScreenHeight paddingBottom={5}>
      <LayoutContainer
        disableGutters={currentBreakpoint === "xs" ? false : true}
      >
        <Grid
          container
          sx={{
            marginTop: {
              lg: 5,
              xs: 3,
            },
          }}
          alignItems={"center"}
        >
          <Grid
            item
            md={3}
            sm={6}
            xs={12}
            sx={{
              backgroundImage:
                currentBreakpoint === "xs"
                  ? "url(/assets/heroCenterLight.png)"
                  : "none",
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Stack
              spacing={1}
              width={"fit-content"}
              p={currentBreakpoint === "xs" ? 2 : 0}
              sx={{
                backgroundColor: {
                  xs: theme.palette.custom.heroCoverImageBgColor,
                  sm: theme.palette.background.default,
                },
              }}
            >
              <Box>
                <Box
                  display={"inline-block"}
                  p={1}
                  pt={3}
                  mr={1}
                  border={"2px solid"}
                  borderRadius={(theme) => theme.shape.borderRadius}
                  borderColor={(theme) => theme.palette.secondary.main}
                >
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        lg: 40,
                        md: 30,
                        xs: 35,
                      },
                    }}
                    color={"primary.main"}
                  >
                    Full Stack
                  </Typography>
                </Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      lg: 40,
                      md: 30,
                      xs: 35,
                    },
                  }}
                  color={"primary.main"}
                  display={"inline-block"}
                >
                  Engineer
                </Typography>
              </Box>
              <Typography
                variant="h1"
                sx={{
                  fontSize: {
                    lg: 60,
                    xs: 50,
                  },
                }}
                color={"primary.main"}
                textAlign={"center"}
                width={"60%"}
              >
                &
              </Typography>
              <Box>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: {
                      lg: 40,
                      md: 30,
                      xs: 35,
                    },
                  }}
                  color={"primary.main"}
                  display={"inline-block"}
                >
                  Frontend
                </Typography>
                <Box
                  display={"inline-block"}
                  p={1}
                  pt={3}
                  ml={1}
                  border={"2px solid"}
                  borderRadius={(theme) => theme.shape.borderRadius}
                  borderColor={(theme) => theme.palette.secondary.main}
                >
                  <Typography
                    variant="h1"
                    color={"primary.main"}
                    sx={{
                      fontSize: {
                        lg: 40,
                        md: 30,
                        xs: 35,
                      },
                    }}
                  >
                    Expert
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid
            item
            md={6}
            sm={6}
            sx={{
              display: {
                sm: "flex",
                xs: "none",
              },
            }}
          >
            <img
              src="/assets/heroCenterLight.png"
              alt="hero-light-mode"
              style={{
                width:
                  currentBreakpoint === "xs"
                    ? 400
                    : currentBreakpoint === "sm"
                    ? 300
                    : currentBreakpoint === "md"
                    ? 400
                    : 600,
                height: "auto",
              }}
            />
          </Grid>
          <Grid
            item
            md={3}
            xs={12}
            sx={{
              pl: {
                lg: 2,
              },
              py: {
                xs: 2,
              },
            }}
          >
            <Box
              p={2}
              border={"1px dashed"}
              borderColor={(theme) => theme.palette.primary.main}
              borderRadius={(theme) => theme.shape.borderRadius}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: {
                    lg: 24,
                    xs: 18,
                  },
                }}
                color={"primary.main"}
                textAlign={"center"}
                lineHeight={1.2}
              >
                “Passionate about building elegant web solutions that blend
                creativity with functionality. Specializing in Full Stack
                Engineering and Frontend expertise to bring ideas to life with
                clean, efficient code.”
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={6} display={"flex"} justifyContent={"center"}>
            <HashLink
              smooth
              to={"/#projects"}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  px: currentBreakpoint === "xs" ? 2 : 4,
                  borderRadius: (theme) => theme.shape.borderRadius,
                }}
                endIcon={
                  <WorkOutlineIcon
                    sx={{
                      width: {
                        lg: 30,
                        sm: 25,
                        xs: 20,
                      },
                      height: {
                        lg: 30,
                        sm: 25,
                        xs: 20,
                      },
                    }}
                  />
                }
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: {
                      lg: 32,
                      sm: 24,
                      xs: 20,
                    },
                  }}
                  mr={1}
                >
                  View work
                </Typography>
              </Button>
            </HashLink>
          </Grid>
          <Grid item xs={6} display={"flex"} justifyContent={"center"}>
            <HashLink
              smooth
              to={"/#contact"}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                sx={{
                  px: currentBreakpoint === "xs" ? 2 : 4,
                  borderRadius: (theme) => theme.shape.borderRadius,
                }}
                endIcon={
                  <AlternateEmailIcon
                    sx={{
                      width: {
                        lg: 30,
                        sm: 25,
                        xs: 20,
                      },
                      height: {
                        lg: 30,
                        sm: 25,
                        xs: 20,
                      },
                    }}
                  />
                }
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: {
                      lg: 32,
                      sm: 24,
                      xs: 20,
                    },
                  }}
                  mr={1}
                >
                  Contact me
                </Typography>
              </Button>
            </HashLink>
          </Grid>
        </Grid>
        <SectionHeading heading="Highlights" />
        <Grid container spacing={2}>
          {clients.length
            ? clients.map((client, index) => {
                return (
                  <Grid
                    item
                    lg={3}
                    md={4}
                    sm={6}
                    xs={6}
                    key={index}
                    display={"flex"}
                    justifyContent={"center"}
                  >
                    <ClientHighlightCard
                      title={trimProjectTitle(client.project.name)}
                      description={client.project.description}
                      logo={
                        <HourglassEmptyIcon
                          sx={{
                            fontSize: {
                              md: "24px",
                              sm: "20px",
                              xs: "16px",
                            },
                            color: (theme) => theme.palette.secondary.main,
                          }}
                        />
                      }
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </LayoutContainer>
    </SectionBox>
  );
};

export default HeroSection;
