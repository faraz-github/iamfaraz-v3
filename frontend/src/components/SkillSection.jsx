import { useState } from "react";

import { Box, Grid } from "@mui/material";
import DisplaySwitch from "./ui/DisplaySwitch";
import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import SkillCard from "./ui/SkillCard";

const SkillSection = () => {
  const [skillType, setSkillType] = useState("technology"); // technology | design

  // TODO integrate api and render using it

  return (
    <SectionBox id="skill" halfScreenHeight>
      <LayoutContainer>
        <Box display={"flex"} alignItems={"flex-end"}>
          <Box flexGrow={1}>
            <SectionHeading heading="Skills" />
          </Box>
          <Box>
            <DisplaySwitch skillType={skillType} setSkillType={setSkillType} />
          </Box>
        </Box>
        <Grid container mt={2}>
          {skillType === "technology" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"typescript"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}

          {skillType === "design" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"figma"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}

          {skillType === "technology" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"VS Code"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}

          {skillType === "technology" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"Postman"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}

          {skillType === "technology" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"Javascript"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}

          {skillType === "technology" ? (
            <Grid item xs={2}>
              <SkillCard
                logoUrl={"/assets/typescript.png"}
                name={"NPM"}
                description={
                  "TypeScript extends JavaScript by adding types to the language."
                }
              />
            </Grid>
          ) : null}
          
        </Grid>
      </LayoutContainer>
    </SectionBox>
  );
};

export default SkillSection;
