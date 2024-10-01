import { useState, useEffect } from "react";
import axios from "axios";

import { Grid } from "@mui/material";

import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import ProjectCard from "./ui/ProjectCard";

const ProjectSection = () => {
  // state
  const [projects, setProjects] = useState([]);

  // helpers
  const imagesArray = (project) => {
    let images = [];

    if (project.picture) {
      images.push(project.picture);
    }
    if (project.firstScreen) {
      images.push(project.firstScreen);
    }
    if (project.secondScreen) {
      images.push(project.secondScreen);
    }
    if (project.lastScreen) {
      images.push(project.lastScreen);
    }

    return images;
  };

  // ---API
  useEffect(() => {
    const readPortfolioInfo = async () => {
      try {
        const response = await axios.get("/api/info/portfolio");
        if (response) {
          setProjects(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readPortfolioInfo();
  }, []);

  return (
    <SectionBox id="projects" halfScreenHeight>
      <LayoutContainer>
        <SectionHeading heading="Projects" />
        <Grid container spacing={2} p={1}>
          {projects.length
            ? projects.map((project, index) => {
                return (
                  <Grid item lg={4} md={6} sm={6} xs={12} key={index}>
                    <ProjectCard
                      title={project.name}
                      description={project.description}
                      tools={project.stack}
                      images={imagesArray(project)}
                    />
                  </Grid>
                );
              })
            : null}
        </Grid>
      </LayoutContainer>
    </SectionBox>
  );
};

export default ProjectSection;
