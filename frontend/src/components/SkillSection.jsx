import { useEffect, useState } from "react";

import { Box, Grid } from "@mui/material";
import axios from "axios";

import DisplaySwitch from "./ui/DisplaySwitch";
import LayoutContainer from "./ui/LayoutContainer";
import SectionBox from "./ui/SectionBox";
import SectionHeading from "./ui/SectionHeading";
import SkillCard from "./ui/SkillCard";

const SkillSection = () => {
  // state
  const [tools, setTools] = useState([]);
  const [skillType, setSkillType] = useState("development");

  // ---API
  useEffect(() => {
    const readToolInfo = async () => {
      try {
        const response = await axios.get("/api/info/tool");
        if (response) {
          setTools(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readToolInfo();
  }, []);

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
          {tools.length
            ? tools
                .filter((item) => item.category === skillType)
                .map((tool, index) => {
                  return (
                    <Grid item xs={2} key={index}>
                      <SkillCard
                        logoUrl={tool.icon}
                        name={tool.name}
                        description={tool.description}
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

export default SkillSection;
