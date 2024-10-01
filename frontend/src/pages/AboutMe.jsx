import { useEffect, useState } from "react";

import { Box, Button, Fab, Grid, Stack, Typography } from "@mui/material";
import EventIcon from "@mui/icons-material/Event";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import LayoutContainer from "../components/ui/LayoutContainer";
import SectionBox from "../components/ui/SectionBox";
import StyledLine from "../components/ui/StyledLine";
import MessageMeModal from "../components/ui/MessageMeModal";
import MeetingModal from "../components/ui/MeetingModal";

import { aboutMe } from "../constants/aboutme";

// Extend dayjs with the necessary plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const AboutMe = () => {
  // state
  const [openMessageModal, setOpenMessageModal] = useState(false);
  const [openMettingModal, setOpenMeetingModal] = useState(false);
  const [localTime, setLocalTime] = useState("");
  const [localDate, setLocalDate] = useState("");

  // helper
  useEffect(() => {
    const updateLocalTime = () => {
      // Set the timezone to India (IST)
      const formattedTime = dayjs().tz("Asia/Kolkata");
      const date = formattedTime.format("dddd, MMMM D, YYYY");
      const time = formattedTime.format("h:mm A");
      setLocalDate(date);
      setLocalTime(time);
    };

    // Update the time immediately and then every second
    updateLocalTime();
    const intervalId = setInterval(updateLocalTime, 1000);

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <SectionBox id="aboutme">
      <LayoutContainer>
        <Box
          display={"flex"}
          alignItems={"center"}
          mt={5}
          mb={2}
          sx={{ mx: { xs: 10, md: 25, lg: 50 } }}
        >
          <Typography
            variant="h3"
            fontSize={30}
            color={"primary.main"}
            gutterBottom
            minWidth="fit-content"
          >
            About Me
          </Typography>
          <StyledLine
            color={"secondary.main"}
            thickness={1}
            rightOrnament
            topMargin={-1}
            leftMargin={1}
          />
        </Box>

        <Grid container spacing={2} mb={2}>
          <Grid
            item
            md={6}
            xs={12}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Box
              borderRadius={"50%"}
              sx={{
                background: "url(/assets/heroCenterLight.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: {
                  sm: 400,
                  xs: 300,
                },
                height: {
                  sm: 400,
                  xs: 300,
                },
              }}
            ></Box>
          </Grid>
          <Grid item md={6} xs={12}>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h1" fontSize={40}>
                  {aboutMe.name}
                </Typography>
                <Typography variant="h5" fontSize={32}>
                  {aboutMe.professions}
                </Typography>
              </Box>
              <Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontSize={40}>🌏</Typography>
                  <Typography variant="h5" fontSize={24}>
                    {aboutMe.address}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontSize={40}>🕑</Typography>
                  <Typography variant="h5" fontSize={24}>
                    {localTime}
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems={"center"}>
                  <Typography fontSize={40}>🗓️</Typography>
                  <Typography variant="h5" fontSize={24}>
                    {localDate}
                  </Typography>
                </Stack>
              </Stack>

              <Typography variant="body2" fontSize={20}>
                {aboutMe.content}
              </Typography>

              <Box display={"flex"} gap={2} flexWrap={"wrap"}>
                {aboutMe.hashtags.map((hashtag, index) => {
                  return (
                    <Typography variant="h5" fontSize={20} key={index}>
                      {hashtag}
                    </Typography>
                  );
                })}
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <center>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            sx={{ borderRadius: 15, mr: 2 }}
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
        </center>
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

export default AboutMe;
