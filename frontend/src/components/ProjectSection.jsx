import { Grid } from "@mui/material";
import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";

const images = [
  "https://picsum.photos/600/400",
  "https://picsum.photos/600/400?grayscale",
  "https://picsum.photos/600/400",
  "https://picsum.photos/600/400?grayscale",
];

const tools = [
  {
    name: "React",
    iconUrl: "/assets/reactIconWhite.svg",
  },
  {
    name: "Material UI",
    iconUrl: "/assets/reactIcon.svg",
  },
  {
    name: "TypeScript",
    iconUrl: "/assets/reactIconWhite.svg",
  },
  {
    name: "Firebase",
    iconUrl: "/assets/reactIcon.svg",
  },
  {
    name: "AWS",
    iconUrl: "/assets/reactIconWhite.svg",
  },
];

const ProjectSection = () => {
  return (
    <SectionBox id="projects">
      <LayoutContainer>
        <SectionHeading heading="Projects" />
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images}
            />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images.slice(0, 1)}
            />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images}
            />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images}
            />
          </Grid>
          <Grid item xs={4}>
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images.slice(0, 1)}
            />
          </Grid>
          <Grid item xs={4}>
            {" "}
            <ProjectCard
              title={"Onito HIS"}
              description={
                "Onito Hospital Information System is one of the most innovative and user-friendly software for managing healthcare operations."
              }
              tools={tools}
              images={images}
            />
          </Grid>
        </Grid>
      </LayoutContainer>
    </SectionBox>
  );
};

export default ProjectSection;
