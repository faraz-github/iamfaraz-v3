import { Box, Paper, Tooltip, Typography } from "@mui/material";

import Carousel from "./Carousel";
import ToolChips from "./ToolChips";
import StyledLine from "./StyledLine";

const ProjectCard = ({ title, description, tools, images }) => {
  return (
    <Paper elevation={0} sx={{ p: 2 }}>
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          variant="h3"
          fontSize={32}
          color={"primary.main"}
          minWidth="fit-content"
        >
          {title}
        </Typography>
        <StyledLine
          color={"secondary.main"}
          thickness={2}
          rightOrnament
          leftMargin={1}
        />
      </Box>
      <Tooltip title={description.length >= 100 ? description : ""}>
        <Typography
          variant="body2"
          fontSize={16}
          color={"primary.main"}
          letterSpacing={-0.2}
          gutterBottom
        >
          {description.slice(0, 100)}
          {description.length >= 100 ? "..." : ""}
        </Typography>
      </Tooltip>

      <ToolChips tools={tools} />
      <Carousel images={images} />
    </Paper>
  );
};

export default ProjectCard;
