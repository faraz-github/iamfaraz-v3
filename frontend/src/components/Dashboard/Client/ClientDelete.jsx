import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
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

const ClientDelete = ({ token, selectedClient, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // ---API
  const deleteClientInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/client/selected/${selectedClient._id}`,
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
      <CardHeader title="Client Details" subheader="Delete" />
      {selectedClient !== null ? (
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
                  src={selectedClient?.project?.picture}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  Cover Picture
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedClient?.project?.firstScreen}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  First Screen
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedClient?.project?.secondScreen}
                  alt="project"
                  width="100%"
                />
                <Typography variant="caption" color="text.secondary">
                  Second Screen
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                <img
                  src={selectedClient?.project?.lastScreen}
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
                        <Typography variant="h5">{selectedClient.client.name}</Typography>
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
                          {selectedClient.client.company}
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
                          {selectedClient.client.position}
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
                          {selectedClient.project.name}
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
                          {selectedClient.project.consentToDisplay ? "Yes" : "No"}
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
                        {selectedClient.project.description}
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
                        value={selectedClient.rating}
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
                      <Typography variant="h5">{selectedClient.feedback}</Typography>
                    </Paper>
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deleteClientInfo}
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

export default ClientDelete;
