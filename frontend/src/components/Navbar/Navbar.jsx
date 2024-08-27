import { Box, Grid, Stack } from "@mui/material";

import LayoutContainer from "../ui/LayoutContainer";
import FarazAhmad from "./FarazAhmad";
import StatusIndicator from "./StatusIndicator";

const Navbar = () => {
  return (
    <Box marginY={2}>
      <Stack direction={"row"}>
        <Box
          className={"faraz-ahmad-left-border"}
          border={"1px dashed"}
          borderColor={"primary.main"}
          borderLeft={0}
          borderRight={0}
        ></Box>
        <LayoutContainer>
          <Grid container>
            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={6}>
                  <FarazAhmad />
                </Grid>
                <Grid item xs={6}>
                  <StatusIndicator />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={8}></Grid>
          </Grid>
          {/* - // TODO center logo - link to about me page */}
          {/* - // TODO links - navigate to sections */}
          {/* - // TODO theme switch - change theme */}
        </LayoutContainer>
        <Box className={"faraz-ahmad-left-border"} visibility={"hidden"}></Box>
      </Stack>
    </Box>
  );
};

export default Navbar;
