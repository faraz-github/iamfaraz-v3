import { Chip, Stack } from "@mui/material";

const ToolChips = ({ tools }) => {
  return (
    <Stack direction={"row"} flexWrap={"wrap"}>
      {tools.map((tool, index) => (
        <Chip
          size="small"
          key={index}
          color="secondary"
          sx={{
            px: 1,
            fontFamily: "Alumni Sans",
            fontWeight: 500,
            fontSize: "16px",
            mr: 1,
            mb: 1,
          }}
          label={tool}
        />
      ))}
    </Stack>
  );
};

export default ToolChips;
