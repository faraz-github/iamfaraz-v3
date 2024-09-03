import { useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import StyledLine from "./ui/StyledLine";

const CapabilitySection = () => {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <SectionBox id="capability" halfScreenHeight>
      <Stack direction={"row"} alignItems={"flex-end"}>
        <Box
          className={"horizontalMarginWidth"}
          bgcolor={"background.paper"}
          height={400}
          position={"relative"}
          onMouseEnter={() => setIsHovered("left")}
          onMouseLeave={() => setIsHovered(null)}
        >
          {isHovered === "left" ? (
            <Box
              position={"absolute"}
              height={"100%"}
              width={"100%"}
              sx={{ backgroundColor: "secondary.main", opacity: "85%" }}
            ></Box>
          ) : null}
        </Box>
        <LayoutContainer>
          <SectionHeading heading="Capabilities" />
          <Grid container>
            <Grid item xs={4} sx={{ pr: 1 }}>
              <Box
                bgcolor={"background.paper"}
                height={400}
                borderRadius={"0 50% 0 0"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={() => setIsHovered("left")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    fontSize={40}
                    color={"primary.main"}
                    gutterBottom
                  >
                    UI & UX
                  </Typography>
                  <img
                    src="/assets/uiux.png"
                    alt="uiux"
                    style={{ width: 120, height: "auto" }}
                  />
                </Stack>
                {isHovered === "left" ? (
                  <>
                    <Box
                      position={"absolute"}
                      height={"100%"}
                      width={"100%"}
                      borderRadius={"0 50% 0 0"}
                      sx={{ backgroundColor: "secondary.main", opacity: "85%" }}
                    ></Box>
                    <Stack width={"75%"} spacing={5} position={"absolute"}>
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        fat={30}
                        centerText={"User Interface Design"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        fat={30}
                        centerText={"User Experience Design"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        fat={30}
                        centerText={"Interactive Prototyping"}
                      />
                    </Stack>
                  </>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                bgcolor={"background.paper"}
                height={400}
                borderRadius={"50% 50% 0 0"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={() => setIsHovered("middle")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    fontSize={40}
                    color={"primary.main"}
                    gutterBottom
                  >
                    Development
                  </Typography>
                  <img
                    src="/assets/development.png"
                    alt="development"
                    style={{ width: 120, height: "auto" }}
                  />
                </Stack>
                {isHovered === "middle" ? (
                  <>
                    <Box
                      position={"absolute"}
                      height={"100%"}
                      width={"100%"}
                      borderRadius={"50% 50% 0 0"}
                      sx={{ backgroundColor: "secondary.main", opacity: "85%" }}
                    ></Box>
                    <Stack width={"70%"} spacing={5} position={"absolute"}>
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        rightOrnament
                        fat={30}
                        centerText={"Website & Web Page"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        rightOrnament
                        fat={30}
                        centerText={"Dynamic Web App"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        leftOrnament
                        rightOrnament
                        fat={30}
                        centerText={"Mobile Application"}
                      />
                    </Stack>
                  </>
                ) : null}
              </Box>
            </Grid>
            <Grid item xs={4} sx={{ pl: 1 }}>
              <Box
                bgcolor={"background.paper"}
                height={400}
                borderRadius={"50% 0 0 0"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
                onMouseEnter={() => setIsHovered("right")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    fontSize={40}
                    color={"primary.main"}
                    gutterBottom
                  >
                    Test & Deploy
                  </Typography>
                  <img
                    src="/assets/testing.png"
                    alt="testing"
                    style={{ width: 120, height: "auto" }}
                  />
                </Stack>
                {isHovered === "right" ? (
                  <>
                    <Box
                      position={"absolute"}
                      height={"100%"}
                      width={"100%"}
                      borderRadius={"50% 0 0 0"}
                      sx={{ backgroundColor: "secondary.main", opacity: "85%" }}
                    ></Box>
                    <Stack width={"75%"} spacing={5} position={"absolute"}>
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        rightOrnament
                        fat={30}
                        centerText={"SEO Optimization"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        rightOrnament
                        fat={30}
                        centerText={"Usability Testing"}
                      />
                      <StyledLine
                        color="background.paper"
                        thickness={2}
                        rightOrnament
                        fat={30}
                        centerText={"Hosting"}
                      />
                    </Stack>
                  </>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </LayoutContainer>
        <Box
          className={"horizontalMarginWidth"}
          bgcolor={"background.paper"}
          height={400}
          position={"relative"}
          onMouseEnter={() => setIsHovered("right")}
          onMouseLeave={() => setIsHovered(null)}
        >
          {isHovered === "right" ? (
            <Box
              position={"absolute"}
              height={"100%"}
              width={"100%"}
              sx={{ backgroundColor: "secondary.main", opacity: "85%" }}
            ></Box>
          ) : null}
        </Box>
      </Stack>
    </SectionBox>
  );
};

export default CapabilitySection;
