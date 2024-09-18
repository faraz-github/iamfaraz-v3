import axios from "axios";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const PortfolioDelete = ({ token, selectedPortfolio, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // ---API
  const deletePortfolioInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/info/portfolio/${selectedPortfolio?._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setOpenLoading(false);
        toast.success("Successfully Deleted");
        setTabIndex("2");
        return response;
      }
    } catch (error) {
      console.log(error); // Debug Log
      setOpenLoading(false);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Card variant="outlined" square>
      <CardHeader title="Portfolio Details" subheader="Delete" />
      {selectedPortfolio !== null ? (
        <>
          <CardContent>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ mb: 1 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedPortfolio.picture}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  Cover Picture
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedPortfolio.firstScreen}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  First Screen
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedPortfolio.secondScreen}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  Second Screen
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedPortfolio.lastScreen}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  Last Screen
                </Typography>
              </Paper>
            </Stack>
            <Stack
              direction={"row"}
              display={"flex"}
              justifyContent={"space-between"}
              spacing={1}
              sx={{ mt: 2 }}
            >
              <Grid container>
                <Grid item xs={6} sx={{ pr: 1 }}>
                  <Stack spacing={1}>
                    <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        color="text.secondary"
                      >
                        Project Name
                      </Typography>
                      <Typography variant="h5">
                        {selectedPortfolio.name}
                      </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        color="text.secondary"
                      >
                        Type
                      </Typography>
                      <Typography variant="h5">
                        {selectedPortfolio.type}
                      </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        color="text.secondary"
                      >
                        Description
                      </Typography>
                      <Typography variant="h5">
                        {selectedPortfolio.description}
                      </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        color="text.secondary"
                      >
                        Deployed Link
                      </Typography>
                      <Typography variant="h5">
                        {selectedPortfolio.link}
                      </Typography>
                    </Paper>
                    <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                      <Typography
                        variant="body2"
                        fontSize={18}
                        color="text.secondary"
                      >
                        Source Code
                      </Typography>
                      <Typography variant="h5">
                        {selectedPortfolio.source}
                      </Typography>
                    </Paper>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Paper
                    variant="outlined"
                    sx={{ py: 0.5, px: 1, width: "100%" }}
                  >
                    <Typography
                      variant="body2"
                      fontSize={18}
                      color="text.secondary"
                    >
                      Stack
                    </Typography>
                    {selectedPortfolio.stack ? (
                      <Box>
                        {selectedPortfolio.stack.map((stack, index) => {
                          return (
                            <Chip
                              key={index}
                              label={stack}
                              sx={{ mr: 1, mb: 1 }}
                            />
                          );
                        })}
                      </Box>
                    ) : null}
                  </Paper>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deletePortfolioInfo}
            >
              <Typography variant="h5">Delete</Typography>
            </Button>
          </CardActions>
        </>
      ) : (
        <CardContent>What do you want to delete?</CardContent>
      )}
    </Card>
  );
};

export default PortfolioDelete;
