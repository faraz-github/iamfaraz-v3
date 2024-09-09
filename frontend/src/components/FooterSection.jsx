import { Box, Grid, Paper, Stack, Typography } from "@mui/material";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";

import SectionBox from "./ui/SectionBox";
import LayoutContainer from "./ui/LayoutContainer";
//  TODO make links clickable
const FooterSection = () => {
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
                <GitHubIcon fontSize="medium" color="primary.main" />
                <TwitterIcon fontSize="medium" color="primary.main" />
                <FacebookIcon fontSize="medium" color="primary.main" />
                <InstagramIcon fontSize="medium" color="primary.main" />
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
