import { useState } from "react";

import { useRef } from "react";

import { Box, Typography } from "@mui/material";
import KeyboardArrowUpRoundedIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const DisplaySwitch = ({ skillType, setSkillType }) => {
  const [triggerDown, setTriggerDown] = useState(false);
  const [triggerUp, setTriggerUp] = useState(false);
  const [centerAppear, setCenterAppear] = useState(false);

  const movingTypographyRef = useRef(null);

  const handleChange = (event) => {
    setCenterAppear(true);

    const buttonId = event.currentTarget.id;
    if (buttonId === "up" && skillType !== "technology") {
      setTriggerUp(true);
      setTriggerDown(false);
      setTimeout(() => {
        setSkillType("technology");
      }, 250);
    } else if (buttonId === "down" && skillType !== "design") {
      setTriggerDown(true);
      setTriggerUp(false);
      setTimeout(() => {
        setSkillType("design");
      }, 250);
    }
  };

  return (
    <Box
      sx={{
        border: "2px solid",
        borderColor: "primary.main",
        borderRadius: (theme) => theme.shape.borderRadius,
        width: "200px",
        display: "flex",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRight: "2px solid",
          borderColor: "primary.main",
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "relative",
          boxShadow: (theme) =>
            `inset 0 0 10px ${theme.palette.custom.retroInnerShadowColor}`,
        }}
      >
        <Typography
          ref={movingTypographyRef}
          variant="body2"
          fontSize={22}
          color={"primary.main"}
          textTransform={"capitalize"}
          position={"absolute"}
          className={
            triggerUp
              ? "transitionElementUp"
              : triggerDown
              ? "transitionElementDown"
              : ""
          }
        >
          {skillType}
        </Typography>

        <Typography
          variant="body2"
          fontSize={22}
          color={"primary.main"}
          textTransform={"capitalize"}
          position={"absolute"}
          sx={{
            display: centerAppear ? "block" : "none",
          }}
        >
          {skillType}
        </Typography>
      </Box>
      <Box sx={{ width: "50px" }}>
        <Box
          id="up"
          sx={{
            backgroundColor: "background.paper",
            borderBottom: "1px solid",
            borderColor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: (theme) =>
              `inset 0 0 ${skillType !== "technology" ? "10px" : "30px"} ${
                theme.palette.custom.retroInnerShadowColor
              }`,
            cursor: skillType !== "technology" ? "pointer" : "default",
          }}
          onClick={handleChange}
        >
          <KeyboardArrowUpRoundedIcon />
        </Box>
        <Box
          id="down"
          sx={{
            backgroundColor: "background.paper",
            borderTop: "1px solid",
            borderColor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: (theme) =>
              `inset 0 0 ${skillType !== "design" ? "10px" : "30px"} ${
                theme.palette.custom.retroInnerShadowColor
              }`,
            cursor: skillType !== "design" ? "pointer" : "default",
          }}
          onClick={handleChange}
        >
          <KeyboardArrowDownRoundedIcon />
        </Box>
      </Box>
    </Box>
  );
};

export default DisplaySwitch;
