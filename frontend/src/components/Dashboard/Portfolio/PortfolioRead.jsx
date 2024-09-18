import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  ButtonGroup,
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

const PortfolioRead = ({ setSelectedPortfolio, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // state
  const [portfolio, setPortfolio] = useState([]);

  // handlers
  const updatePortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setTabIndex("3");
  };
  const deletePortfolio = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setTabIndex("4");
  };

  // ---API
  useEffect(() => {
    const readPortfolioInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/info/portfolio");
        if (response) {
          setOpenLoading(false);
          setPortfolio(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setPortfolio([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readPortfolioInfo();
  }, []);

  return (
    <Card variant="outlined" square>
      <CardHeader title="Portfolio Details" subheader="Read" />
      <Grid container spacing={2} p={1}>
        {portfolio.length ? (
          portfolio.map((info, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant="outlined">
                  <CardContent>
                    <Stack
                      direction={"row"}
                      spacing={1}
                      sx={{ mb: 1 }}
                      display={"flex"}
                      justifyContent={"space-between"}
                    >
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img src={info.picture} alt="project" width="100%" />
                        <Typography variant="caption" color="text.secondary">
                          Cover Picture
                        </Typography>
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={info.firstScreen}
                          alt="project"
                          width="100%"
                        />
                        <Typography variant="caption" color="text.secondary">
                          First Screen
                        </Typography>
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={info.secondScreen}
                          alt="project"
                          width="100%"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Second Screen
                        </Typography>
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img src={info.lastScreen} alt="project" width="100%" />
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
                      <Box sx={{ maxWidth: "400px" }}>
                        <Stack spacing={1}>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Project Name
                            </Typography>
                            <Typography variant="h5">{info.name}</Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Type
                            </Typography>
                            <Typography variant="h5">{info.type}</Typography>
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
                              {info.description}
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
                            <Typography variant="h5">{info.link}</Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Source Code
                            </Typography>
                            <Typography variant="h5">{info.source}</Typography>
                          </Paper>
                        </Stack>
                      </Box>
                      <Box sx={{ maxWidth: "400px" }}>
                        <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                          <Typography
                            variant="body2"
                            fontSize={18}
                            color="text.secondary"
                          >
                            Stack
                          </Typography>
                          {info.stack ? (
                            <Box>
                              {info.stack.map((stack, index) => {
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
                      </Box>
                    </Stack>
                  </CardContent>
                  <CardActions>
                    <ButtonGroup variant="outlined">
                      <Button
                        color="success"
                        onClick={() => updatePortfolio(info)}
                      >
                        <Typography variant="h5">Update</Typography>
                      </Button>
                      <Button
                        color="error"
                        onClick={() => deletePortfolio(info)}
                      >
                        <Typography variant="h5">Delete</Typography>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <CardContent>
            Portfolio information not found, please create.
          </CardContent>
        )}
      </Grid>
    </Card>
  );
};

export default PortfolioRead;
