import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
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

const PersonalRead = ({ setSelectedPersonal, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [personal, setPersonal] = useState([]);

  // Handlers
  const updatePersonal = (personal) => {
    setSelectedPersonal(personal);
    setTabIndex("3");
  };
  const deletePersonal = (personal) => {
    setSelectedPersonal(personal);
    setTabIndex("4");
  };

  // ---API
  useEffect(() => {
    const readPersonalInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/info/personal");
        if (response) {
          setOpenLoading(false);
          setPersonal(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setPersonal([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readPersonalInfo();
  }, []);

  return (
    <Card variant="outlined" square sx={{ padding: 2 }}>
      <CardHeader title="Personal Details" subheader="Read" />
      <Grid container spacing={2}>
        {personal.length ? (
          personal.map((person, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant="outlined">
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          src={person.picture}
                          sx={{ my: 1, height: 256, width: 256 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Name
                            </Typography>
                            <Typography variant="h5">{person.name}</Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Profession
                            </Typography>
                            {person.profession ? (
                              <Box>
                                {person.profession.map((profession, index) => {
                                  return (
                                    <Chip
                                      key={index}
                                      label={profession}
                                      sx={{ mr: 1 }}
                                    />
                                  );
                                })}
                              </Box>
                            ) : null}
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Platform
                            </Typography>
                            <Typography variant="h5">
                              {person.platform}
                            </Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Status
                            </Typography>
                            <Typography variant="h5">
                              {person.status}
                            </Typography>
                          </Paper>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions>
                    <ButtonGroup variant="outlined">
                      <Button
                        color="success"
                        onClick={() => updatePersonal(person)}
                      >
                        <Typography variant="h5">Update</Typography>
                      </Button>
                      <Button
                        color="error"
                        onClick={() => deletePersonal(person)}
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
            Personal information not found, please create.
          </CardContent>
        )}
      </Grid>
    </Card>
  );
};

export default PersonalRead;
