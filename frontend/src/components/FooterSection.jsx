import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";

const FooterSection = () => {
  // state
  const [socials, setSocials] = useState([]);

  // helpers
  const iconMapping = {
    WhatsApp: (
      <WhatsAppIcon
        fontSize="medium"
        color="primary.main"
        sx={{
          ":hover": {
            color: "secondary.main",
          },
        }}
      />
    ),
    GitHub: (
      <GitHubIcon
        fontSize="medium"
        color="primary.main"
        sx={{
          ":hover": {
            color: "secondary.main",
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
      <LayoutContainer>
        <Paper
          elevation={0}
          sx={{
            minHeight: "50vh",
            borderRadius: "200px 200px 0 0",
            mt: 5,
            mb: -1,
            pt: 15,
            pl: 5,
            pr: 5,
            position: "relative",
          }}
        >
          <Grid container>
            <Grid item xs={3} pl={10}>
              <Typography
                variant="h5"
                fontSize={24}
                color={"primary.light"}
                gutterBottom
              >
                Faraz Ahmad
              </Typography>
              <Typography variant="body2" fontSize={18} color={"primary.light"}>
                Lucknow
              </Typography>
              <Typography
                variant="body2"
                fontSize={18}
                color={"primary.light"}
                mt={-0.5}
              >
                Uttar Pradesh, India
              </Typography>
              <Typography
                variant="h5"
                fontSize={18}
                color={"primary.light"}
                gutterBottom
              >
                226021
              </Typography>
            </Grid>
            <Grid item xs={3} pl={10}>
              <Typography
                variant="h5"
                fontSize={24}
                color={"primary.main"}
                gutterBottom
              >
                Terms & Conditions
              </Typography>
              <Typography
                variant="h5"
                fontSize={24}
                color={"primary.main"}
                gutterBottom
              >
                Privacy Policy
              </Typography>
            </Grid>
            <Grid item xs={3} />
            <Grid
              item
              xs={3}
              px={5}
              display={"flex"}
              justifyContent={"flex-end"}
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
              2024 © Faraz Ahmad️
            </Typography>
          </Box>
        </Paper>
      </LayoutContainer>
    </SectionBox>
  );
};

export default FooterSection;

// TODO features to add
// 1. connect terms and condition and privacy policy modal
// 2. make links clickable aka hyperlinks
// 3. render dynamic year for copyright
