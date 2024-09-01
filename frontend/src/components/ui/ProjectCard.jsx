import { Box, Paper, Typography } from "@mui/material";
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
        <StyledLine color={"secondary.main"} thickness={2} leftMargin={1} />
      </Box>
      <Typography
        variant="body2"
        fontSize={16}
        color={"primary.main"}
        letterSpacing={-0.2}
        gutterBottom
      >
        {description}
      </Typography>

      <ToolChips tools={tools} />
      <Carousel images={images} />
    </Paper>
  );
};

export default ProjectCard;
