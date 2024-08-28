import { Box, Grow, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";

// TODO dynamically change status & colors based on API response

const StatusIndicator = () => {
  const transitionTime = 500;

  const [show, setShow] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShow((prev) => !prev);
    }, transitionTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box height={"100%"} display={"flex"} alignItems={"center"}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        <Grow in={show} timeout={transitionTime}>
          <Box
            width={15}
            height={15}
            bgcolor={"success.light"}
            borderRadius="50%"
          ></Box>
        </Grow>
        <Box
          border={"1px solid"}
          borderColor={"success.light"}
          py={0.5}
          px={2}
          borderRadius={0.5}
        >
          <Typography variant="body2" color={"primary.main"}>
            Available for work
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default StatusIndicator;
