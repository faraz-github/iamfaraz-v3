import { useEffect, useRef, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";

import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import StyledLine from "./ui/StyledLine";

import useDynamicMargin from "../hooks/useDynamicMargin";
import useCurrentBreakpoint from "../hooks/useCurrentBreakpoint";

const CapabilitySection = () => {
  const margin = useDynamicMargin();
  const currentBreakpoint = useCurrentBreakpoint();

  const leftComponentRef = useRef(null);
  const middleComponentRef = useRef(null);
  const rightComponentRef = useRef(null);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    if (currentBreakpoint !== "xs" && currentBreakpoint !== "sm") return; // Only run if on mobile

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const componentId = entry.target.dataset.component; // Use a data attribute to identify the component

            if (!isHovered) {
              // Check if isHovered is null
              setIsHovered(componentId); // Set to the hovered component ID

              // Remove effect after some time
              setTimeout(() => {
                setIsHovered(null);
              }, 2000); // Adjust time as needed

              // Stop observing this component after it has been triggered once
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    // Observe each component
    if (leftComponentRef.current) {
      observer.observe(leftComponentRef.current);
    }
    if (middleComponentRef.current) {
      observer.observe(middleComponentRef.current);
    }
    if (rightComponentRef.current) {
      observer.observe(rightComponentRef.current);
    }

    return () => {
      // Cleanup
      if (leftComponentRef.current) {
        observer.unobserve(leftComponentRef.current);
      }
      if (middleComponentRef.current) {
        observer.unobserve(middleComponentRef.current);
      }
      if (rightComponentRef.current) {
        observer.unobserve(rightComponentRef.current);
      }
    };
  }, []);

  return (
    <SectionBox id="capability">
      <LayoutContainer>
        <SectionHeading heading="Capabilities" />
      </LayoutContainer>
      <Stack direction={"row"}>
        <Box
          bgcolor={"background.paper"}
          width={margin}
          sx={{
            height: {
              lg: 400,
              md: 300,
              xs: 300,
            },
            alignSelf: {
              xs: "flex-start",
            },
          }}
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
          <Grid container>
            <Grid
              item
              lg={4}
              md={4}
              xs={12}
              sx={{
                pr: {
                  lg: 1,
                  md: 1,
                  xs: 0,
                },
              }}
            >
              <Box
                ref={leftComponentRef}
                data-component="left"
                bgcolor={"background.paper"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  height: {
                    lg: 400,
                    md: 300,
                    xs: 300,
                  },
                  borderRadius: {
                    lg: "0 50% 0 0",
                    md: "0 50% 0 0",
                    xs: "0 125px 0 0",
                  },
                }}
                onMouseEnter={() => setIsHovered("left")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        lg: 40,
                        md: 32,
                        xs: 32,
                      },
                    }}
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
                      sx={{
                        backgroundColor: "secondary.main",
                        opacity: "85%",
                        borderRadius: {
                          lg: "0 50% 0 0",
                          md: "0 50% 0 0",
                          xs: "0 125px 0 0",
                        },
                      }}
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
            <Grid item lg={4} md={4} xs={12}>
              <Box
                ref={middleComponentRef}
                data-component="middle"
                bgcolor={"background.paper"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  height: {
                    lg: 400,
                    md: 300,
                    xs: 300,
                  },
                  borderRadius: {
                    lg: "50% 50% 0 0",
                    md: "50% 50% 0 0",
                    xs: "0 0 0 0",
                  },
                }}
                onMouseEnter={() => setIsHovered("middle")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        lg: 40,
                        md: 32,
                        xs: 32,
                      },
                    }}
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
                      sx={{
                        backgroundColor: "secondary.main",
                        opacity: "85%",
                        borderRadius: {
                          lg: "50% 50% 0 0",
                          md: "50% 50% 0 0",
                          xs: "0 0 0 0",
                        },
                      }}
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
            <Grid
              item
              lg={4}
              md={4}
              xs={12}
              sx={{
                pl: {
                  lg: 1,
                  md: 1,
                  xs: 0,
                },
              }}
            >
              <Box
                ref={rightComponentRef}
                data-component="right"
                bgcolor={"background.paper"}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  height: {
                    lg: 400,
                    md: 300,
                    xs: 300,
                  },
                  borderRadius: {
                    lg: "50% 0 0 0",
                    md: "50% 0 0 0",
                    xs: "0 0 0 125px",
                  },
                }}
                onMouseEnter={() => setIsHovered("right")}
                onMouseLeave={() => setIsHovered(null)}
              >
                <Stack alignItems={"center"}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontSize: {
                        lg: 40,
                        md: 32,
                        xs: 32,
                      },
                    }}
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
                      sx={{
                        backgroundColor: "secondary.main",
                        opacity: "85%",
                        borderRadius: {
                          lg: "50% 0 0 0",
                          md: "50% 0 0 0",
                          xs: "0 0 0 125px",
                        },
                      }}
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
          bgcolor={"background.paper"}
          width={margin}
          sx={{
            height: {
              lg: 400,
              md: 300,
              sm: 300,
            },
            alignSelf: {
              xs: "flex-end",
            },
          }}
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
