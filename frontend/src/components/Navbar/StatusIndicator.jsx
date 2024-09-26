import { useEffect, useState } from "react";
import axios from "axios";

import { Box, Stack, Typography } from "@mui/material";

export const statusColor = (status) => {
  switch (status) {
    case "available":
      return "success.light";
    case "busyQuick":
      return "secondary.light";
    case "busyLong":
      return "primary.light";
    case "break":
      return "error.dark";
    default:
      return "background.default";
  }
};

export const statusText = (status) => {
  switch (status) {
    case "available":
      return "Available";
    case "busyQuick":
      return "Little Busy";
    case "busyLong":
      return "Very Busy";
    case "break":
      return "Break Time";
    default:
      return "background.default";
  }
};

const StatusIndicator = () => {
  // state
  const [status, setStatus] = useState(null);

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
    readPersonalInfo();
  }, []);

  return (
    <Box height={"100%"} display={"flex"} alignItems={"center"}>
      <Stack direction={"row"} spacing={1} alignItems={"center"}>
        {status ? (
          <Box
            width={15}
            height={15}
            bgcolor={statusColor(status)}
            borderRadius="50%"
            sx={{
              animation: "blink 1s ease-in-out infinite",
              "@keyframes blink": {
                "0%": { opacity: 0 },
                "50%": { opacity: 1 },
                "100%": { opacity: 0 },
              },
            }}
          ></Box>
        ) : null}

        <Box
          border={"1px solid"}
          borderColor={statusColor(status)}
          py={0.5}
          px={2}
          borderRadius={(theme) => theme.shape.borderRadius}
        >
          <Typography
            variant="body2"
            fontSize={16}
            color={statusColor(status)}
            mt={0.5}
          >
            {statusText(status)}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default StatusIndicator;
