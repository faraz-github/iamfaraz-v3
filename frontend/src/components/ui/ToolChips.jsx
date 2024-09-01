import { Chip, Stack } from "@mui/material";

const ToolChips = ({ tools }) => {
  return (
    <Stack
      direction={"row"}
      flexWrap={"wrap"}
    >
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
          icon={
            <img
              src={tool.iconUrl}
              alt={tool.name}
              style={{ width: 16, height: 16 }}
            />
          }
          label={tool.name}
        />
      ))}
    </Stack>
  );
};

export default ToolChips;
