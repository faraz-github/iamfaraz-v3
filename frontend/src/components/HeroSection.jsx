import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

import { lightTheme } from "../MUI/theme";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";
import ClientHighlightCard from "./ui/ClientHighlightCard";
import { HashLink } from "react-router-hash-link";

const HeroSection = () => {
  const secondaryColor = lightTheme.palette.secondary.main;

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
        <Typography
          variant="h3"
          fontSize={32}
          color={"custom.sectionHeadingColor"}
          mt={2}
          gutterBottom
        >
          Highlights
        </Typography>
        <Grid container>
          <Grid item xs={3}>
            <ClientHighlightCard
              title={"Onito HIS"}
              description={
                "Onito HIS is a healthcare information system used in hospitals. The job tenure involved developing new healthcare features and maintaining existing ones."
              }
              logo={
                <HourglassEmptyIcon
                  htmlColor={secondaryColor}
                  sx={{ fontSize: "24px" }}
                />
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ClientHighlightCard
              title={"Vizard"}
              description={
                "Vizard is a customized media marketing platform where I first worked with Next.js during my internship, developing a serverless app using Firebase for the backend and Next.js for the client."
              }
              logo={
                <HourglassEmptyIcon
                  htmlColor={secondaryColor}
                  sx={{ fontSize: "24px" }}
                />
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ClientHighlightCard
              title={"LucknowCars"}
              description={
                "LucknowCars is a local business in my city specializing in buying and selling used cars. My short-term job involved creating their website."
              }
              logo={
                <HourglassEmptyIcon
                  htmlColor={secondaryColor}
                  sx={{ fontSize: "24px" }}
                />
              }
            />
          </Grid>
          <Grid item xs={3}>
            <ClientHighlightCard
              title={"ScriptedThreads"}
              description={
                "ScriptedThreads is an ongoing project focused on becoming your go-to platform for learning web development, supported by an engaging Instagram community."
              }
              logo={
                <HourglassEmptyIcon
                  htmlColor={secondaryColor}
                  sx={{ fontSize: "24px" }}
                />
              }
            />
          </Grid>
        </Grid>
      </LayoutContainer>
    </SectionBox>
  );
};

export default HeroSection;
