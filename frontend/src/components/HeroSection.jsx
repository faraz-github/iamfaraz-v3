import { useState, useEffect } from "react";
import axios from "axios";
import { HashLink } from "react-router-hash-link";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";
import ClientHighlightCard from "./ui/ClientHighlightCard";
import SectionHeading from "./ui/SectionHeading";

const HeroSection = () => {
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
    <SectionBox id="hero">
      <LayoutContainer>
        <Grid container mt={5} alignItems={"center"}>
          <Grid item xs={3}>
            <Stack spacing={1}>
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
                  <Typography variant="h1" fontSize={40} color={"primary.main"}>
                    Full Stack
                  </Typography>
                </Box>
                <Typography
                  variant="h1"
                  fontSize={40}
                  color={"primary.main"}
                  display={"inline-block"}
                >
                  Engineer
                </Typography>
              </Box>
              <Typography
                variant="h1"
                fontSize={60}
                color={"primary.main"}
                textAlign={"center"}
                width={"60%"}
              >
                &
              </Typography>
              <Box>
                <Typography
                  variant="h1"
                  fontSize={40}
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
                  <Typography variant="h1" color={"primary.main"} fontSize={40}>
                    Expert
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <img
              src="/assets/heroCenterLight.png"
              alt="hero-light-mode"
              style={{ width: 600, height: "auto" }}
            />
          </Grid>
          <Grid item xs={3} px={1}>
            <Box
              p={2}
              border={"1px dashed"}
              borderColor={(theme) => theme.palette.primary.main}
              borderRadius={(theme) => theme.shape.borderRadius}
            >
              <Typography
                variant="body2"
                fontSize={24}
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
                  px: 4,
                  borderRadius: (theme) => theme.shape.borderRadius,
                }}
                endIcon={
                  <WorkOutlineIcon sx={{ width: "30px", height: "30px" }} />
                }
              >
                <Typography variant="h6" fontSize={32} mr={1}>
                  View my work
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
                  px: 4,
                  borderRadius: (theme) => theme.shape.borderRadius,
                }}
                endIcon={
                  <AlternateEmailIcon sx={{ width: "30px", height: "30px" }} />
                }
              >
                <Typography variant="h6" fontSize={32} mr={1}>
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
                  <Grid item xs={3} key={index}>
                    <ClientHighlightCard
                      title={trimProjectTitle(client.project.name)}
                      description={client.project.description}
                      logo={
                        <HourglassEmptyIcon
                          sx={{
                            fontSize: "24px",
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
