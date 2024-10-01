import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";

import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";
import DocumentModal from "./ui/DocumentModal";

import { policyContent } from "../constants/policyContent";

import useCurrentBreakpoint from "../hooks/useCurrentBreakpoint";

const FooterSection = () => {
  const currentBreakpoint = useCurrentBreakpoint();

  // state
  const [socials, setSocials] = useState([]);
  const [openTermsModal, setOpenTermsModal] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);

  // helpers
  const iconMapping = {
    WhatsApp: (
      <WhatsAppIcon
        color="primary.main"
        sx={{
          ":hover": {
            color: "secondary.main",
          },
          fontSize: {
            md: "32px",
            xs: "32px",
          },
        }}
      />
    ),
    GitHub: (
      <GitHubIcon
        color="primary.main"
        sx={{
          ":hover": {
            color: "secondary.main",
          },
          fontSize: {
            md: "32px",
            xs: "32px",
          },
        }}
      />
    ),
  };

  // ---API
  useEffect(() => {
    const readContactInfo = async () => {
      try {
        const response = await axios.get("/api/info/contact");
        if (response) {
          setSocials(response.data[0].social);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readContactInfo();
  }, []);

  return (
    <SectionBox id="footer" halfScreenHeight>
      <LayoutContainer disableGutters={true}>
        <Paper
          elevation={0}
          sx={{
            minHeight: "50vh",
            borderRadius: "200px 200px 0 0",
            mt: 15,
            pt: 15,
            pl: 5,
            pr: 5,
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              backgroundColor: (theme) => theme.palette.background.paper,
              border: "1px solid",
              borderColor: (theme) => theme.palette.background.default,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: {
                lg: 150,
                md: 120,
                sm: 100,
                xs: 100,
              },
              height: {
                lg: 150,
                md: 120,
                sm: 100,
                xs: 100,
              },
              top: {
                lg: -75,
                md: -60,
                sm: -50,
                xs: -50,
              },
              borderRadius: {
                lg: "25px",
                md: "20px",
                sm: "15px",
                xs: "15px",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.secondary.main,
                width: {
                  lg: 100,
                  md: 80,
                  sm: 60,
                  xs: 60,
                },
                height: {
                  lg: 100,
                  md: 80,
                  sm: 60,
                  xs: 60,
                },
                borderRadius: {
                  lg: "25px",
                  md: "20px",
                  sm: "15px",
                  xs: "15px",
                },
              }}
            ></Box>
          </Box>
          <Grid container>
            <Grid item md={3} xs={6} sx={{ pl: { md: 10, xs: 5 } }}>
              <Typography
                variant="h5"
                color={"primary.light"}
                gutterBottom
                sx={{ fontSize: { md: 24, xs: 20 } }}
              >
                Faraz Ahmad
              </Typography>
              <Typography
                variant="body2"
                color={"primary.light"}
                sx={{ fontSize: { md: 18, xs: 16 } }}
              >
                Lucknow
              </Typography>
              <Typography
                variant="body2"
                color={"primary.light"}
                mt={-0.5}
                sx={{ fontSize: { md: 18, xs: 16 } }}
              >
                Uttar Pradesh, India
              </Typography>
              <Typography
                variant="h5"
                color={"primary.light"}
                gutterBottom
                sx={{ fontSize: { md: 18, xs: 16 } }}
              >
                226021
              </Typography>
            </Grid>
            <Grid item md={3} xs={6} sx={{ pl: { md: 10, xs: 5 } }}>
              <Typography
                variant="h5"
                color={"primary.main"}
                gutterBottom
                sx={{ fontSize: { md: 24, xs: 20 }, cursor: "pointer" }}
                onClick={() => setOpenTermsModal(true)}
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="h5"
                color={"primary.main"}
                gutterBottom
                sx={{ fontSize: { md: 24, xs: 20 }, cursor: "pointer" }}
                onClick={() => setOpenPrivacyModal(true)}
              >
                Privacy Policy
              </Typography>
            </Grid>
            <Grid
              item
              md={3}
              xs={12}
              sx={{
                minHeight: {
                  md: 0,
                  xs: 50,
                },
              }}
            />
            <Grid
              item
              md={3}
              xs={12}
              px={5}
              display={"flex"}
              justifyContent={"center"}
            >
              <Stack direction={"row"} spacing={2}>
                {socials.length
                  ? socials.map((social, index) => {
                      return (
                        <a
                          key={index}
                          href={`${social.baseURL}${social.username}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.platformName}
                        >
                          {iconMapping[social.platformName]}
                        </a>
                      );
                    })
                  : null}
              </Stack>
            </Grid>
          </Grid>
          <Box
            position={"absolute"}
            bottom={1}
            left={0}
            width={"100%"}
            textAlign={"center"}
          >
            <Typography
              variant="h5"
              fontSize={24}
              color={"primary.light"}
              gutterBottom
            >
              {dayjs().year()} © Faraz Ahmad️
            </Typography>
          </Box>
        </Paper>
      </LayoutContainer>
      <DocumentModal
        open={openTermsModal}
        handleClose={() => setOpenTermsModal(false)}
        title={policyContent.termsOfUse.title}
        content={policyContent.termsOfUse.content}
      />
      <DocumentModal
        open={openPrivacyModal}
        handleClose={() => setOpenPrivacyModal(false)}
        title={policyContent.privacyPolicy.title}
        content={policyContent.privacyPolicy.content}
      />
    </SectionBox>
  );
};

export default FooterSection;
