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

const ContactSection = () => {
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
        <StyledLine
          color={"primary.main"}
          thickness={1}
          leftOrnament
          rightOrnament
        />
        <Grid container>
          <Grid item xs={6} p={10}>
            <Stack spacing={2}>
              <Typography
                variant="h1"
                fontSize={40}
                color={"primary.main"}
                gutterBottom
              >
                Are you looking for me?
              </Typography>
              <Typography
                variant="h3"
                fontSize={32}
                color={"primary.main"}
                gutterBottom
              >
                Let's talk about your project!
              </Typography>
              <Stack direction="row" spacing={2}>
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
          <Grid item xs={6} display={"flex"} justifyContent={"center"}>
            <Box
              width={400}
              height={300}
              bgcolor={"primary.main"}
              position={"relative"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
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
                    fontSize={20}
                    color={(theme) => theme.palette.background.paper}
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
              <Stack direction={"row"} position={"absolute"} bottom={-100}>
                <Box
                  borderTop={"100px solid"}
                  borderColor={(theme) => theme.palette.primary.main}
                  borderRight={"200px solid transparent"}
                ></Box>
                <Box
                  borderTop={"100px solid"}
                  borderColor={(theme) => theme.palette.primary.main}
                  borderLeft={"200px solid transparent"}
                ></Box>
              </Stack>
            </Box>
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
