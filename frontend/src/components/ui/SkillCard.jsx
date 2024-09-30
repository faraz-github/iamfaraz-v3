import { Box, Stack, Tooltip, Typography } from "@mui/material";

const SkillCard = ({ logoUrl, name, description }) => {
  return (
    <Stack spacing={-4.5} p={1} alignItems={"center"}>
      <Box
        width={75}
        height={75}
        bgcolor={"primary.main"}
        borderRadius={(theme) => theme.shape.borderRadius}
        sx={{
          transition: "border-radius 0.3s ease",
          ":hover": {
            borderRadius: "50%",
          },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <img
          src={logoUrl}
          alt={name}
          style={{
            width: 35,
            height: "auto",
            filter: "drop-shadow(0 0 1px #fff)",
          }}
        />
      </Box>
      <Box
        width={"100%"}
        height={200}
        bgcolor={"background.paper"}
        borderRadius={(theme) => theme.shape.borderRadius}
        p={1}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={1} alignItems={"center"} mt={2}>
          <Typography
            variant="h5"
            fontSize={24}
            color="primary.main"
            textTransform={"capitalize"}
          >
            {name}
          </Typography>
          <Tooltip title={description.length >= 65 ? description : ""}>
            <Typography
              variant="body2"
              fontSize={16}
              color="primary.main"
              textAlign={"center"}
            >
              {description.slice(0, 65)}
              {description.length >= 65 ? "..." : ""}
            </Typography>
          </Tooltip>
        </Stack>
      </Box>
    </Stack>
  );
};

export default SkillCard;
