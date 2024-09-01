import { Typography } from "@mui/material";

const SectionHeading = ({heading}) => {
  return (
    <Typography
      variant="h3"
      fontSize={32}
      color={"custom.sectionHeadingColor"}
      mt={2}
      gutterBottom
    >
      {heading}
    </Typography>
  );
};

export default SectionHeading;