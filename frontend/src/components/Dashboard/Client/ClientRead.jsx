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
  Grid,
  Paper,
  Rating,
  Stack,
  Typography,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const ClientRead = ({ setSelectedClient, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // state
  const [client, setClient] = useState([]);

  // handlers
  const updateClient = (client) => {
    setSelectedClient(client);
    setTabIndex("3");
  };
  const deleteClient = (client) => {
    setSelectedClient(client);
    setTabIndex("4");
  };

  // ---API
  useEffect(() => {
    const readClientInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/client/all");
        if (response) {
          setOpenLoading(false);
          setClient(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setClient([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readClientInfo();
  }, []);

  return (
    <Card variant="outlined" square>
      <CardHeader title="Client Details" subheader="Read" />
      {client.length ? (
        client.map((info, index) => {
          return (
            <Box key={index}>
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
                      src={info.project.picture}
                      alt="project"
                      width="100%"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Cover Picture
                    </Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                    <img
                      src={info.project.firstScreen}
                      alt="project"
                      width="100%"
                    />
                    <Typography variant="caption" color="text.secondary">
                      First Screen
                    </Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                    <img
                      src={info.project.secondScreen}
                      alt="project"
                      width="100%"
                    />
                    <Typography variant="caption" color="text.secondary">
                      Second Screen
                    </Typography>
                  </Paper>
                  <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                    <img
                      src={info.project.lastScreen}
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
                  sx={{ mt: 2 }}
                >
                  <Grid container>
                    <Grid item xs={8} sx={{ pr: 1 }}>
                      <Stack spacing={1}>
                        <Stack direction={"row"} spacing={1}>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Client Name
                            </Typography>
                            <Typography variant="h5">
                              {info.client.name}
                            </Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Client Company
                            </Typography>
                            <Typography variant="h5">
                              {info.client.company}
                            </Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Client Position
                            </Typography>
                            <Typography variant="h5">
                              {info.client.position}
                            </Typography>
                          </Paper>
                        </Stack>
                        <Stack direction={"row"} spacing={1}>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Project Name
                            </Typography>
                            <Typography variant="h5">
                              {info.project.name}
                            </Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Project Display Permission
                            </Typography>
                            <Typography variant="h5">
                              {info.project.consentToDisplay ? "Yes" : "No"}
                            </Typography>
                          </Paper>
                        </Stack>
                        <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                          <Typography
                            variant="body2"
                            fontSize={18}
                            color="text.secondary"
                          >
                            Project Description
                          </Typography>
                          <Typography variant="h5">
                            {info.project.description}
                          </Typography>
                        </Paper>
                      </Stack>
                    </Grid>
                    <Grid item xs={4} sx={{ pl: 1 }}>
                      <Stack spacing={1}>
                        <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                          <Typography
                            variant="body2"
                            fontSize={18}
                            color="text.secondary"
                          >
                            Rating
                          </Typography>
                          <Rating
                            name="rating-read"
                            value={info.rating}
                            sx={{
                              mb: 2,
                              "& .MuiRating-iconFilled": {
                                color: (theme) => theme.palette.primary.dark,
                              },
                            }}
                            disabled
                          />
                        </Paper>
                        <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                          <Typography
                            variant="body2"
                            fontSize={18}
                            color="text.secondary"
                          >
                            Feedback
                          </Typography>
                          <Typography variant="h5">{info.feedback}</Typography>
                        </Paper>
                      </Stack>
                    </Grid>
                  </Grid>
                </Stack>
              </CardContent>
              <CardActions>
                <ButtonGroup variant="outlined">
                  <Button color="success" onClick={() => updateClient(info)}>
                    <Typography variant="h5">Update</Typography>
                  </Button>
                  <Button color="error" onClick={() => deleteClient(info)}>
                    <Typography variant="h5">Delete</Typography>
                  </Button>
                </ButtonGroup>
              </CardActions>
            </Box>
          );
        })
      ) : (
        <CardContent>Client information not found, please create.</CardContent>
      )}
    </Card>
  );
};

export default ClientRead;
