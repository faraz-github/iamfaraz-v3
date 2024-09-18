import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { LoadingButton } from "@mui/lab";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  IconButton,
  Paper,
  Rating,
  Stack,
  styled,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageIcon from "@mui/icons-material/Image";

import { useLoading } from "../../../contexts/loadingContext";

const Input = styled("input")({
  display: "none",
});

const ClientUpdate = ({ token, selectedClient, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // state
  const [clientName, setClientName] = useState(selectedClient?.client?.name);
  const [clientCompany, setClientCompany] = useState(
    selectedClient?.client?.company
  );
  const [clientPosition, setClientPosition] = useState(
    selectedClient?.client?.position
  );

  const [clientProjectName, setClientProjectName] = useState(
    selectedClient?.project?.name
  );
  const [clientProjectDescription, setClientProjectDescription] = useState(
    selectedClient?.project?.description
  );
  const [clientProjectDisplay, setClientProjectDisplay] = useState(
    selectedClient?.project?.consentToDisplay
  );

  const [coverPicture, setCoverPicture] = useState(
    selectedClient?.project?.picture
  );
  const [firstScreenPicture, setFirstScreenPicture] = useState(
    selectedClient?.project?.firstScreen
  );
  const [secondScreenPicture, setSecondScreenPicture] = useState(
    selectedClient?.project?.secondScreen
  );
  const [lastScreenPicture, setLastScreenPicture] = useState(
    selectedClient?.project?.lastScreen
  );
  const [rating, setRating] = useState(selectedClient?.rating);
  const [feedback, setFeedback] = useState(selectedClient?.feedback);

  // handlers
  const handleCoverFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setCoverPicture(reader.result);
    };
  };
  const handleFirstScreenFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setFirstScreenPicture(reader.result);
    };
  };
  const handleSecondScreenFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setSecondScreenPicture(reader.result);
    };
  };
  const handleLastScreenFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setLastScreenPicture(reader.result);
    };
  };

  const onUpdateHandler = async (event) => {
    event.preventDefault();
    if (
      !clientName ||
      !clientProjectName ||
      !clientProjectDescription ||
      !feedback
    ) {
      console.log("Please provide all the details"); // Debug Log
      toast.info("Please provide all the details");
    } else {
      if (!coverPicture) {
        console.log("Please select cover picture"); // Debug Log
        toast.info("Please select cover picture");
      } else {
        const clientCoverPictureURL = await uploadClientPicture(
          coverPicture,
          clientProjectName
        );

        // For optional images
        let firstScreenPictureURL = null;
        let secondScreenPictureURL = null;
        let lastScreenPictureURL = null;

        if (firstScreenPicture) {
          firstScreenPictureURL = await uploadClientPicture(
            firstScreenPicture,
            clientProjectName
          );
        }
        if (secondScreenPicture) {
          secondScreenPictureURL = await uploadClientPicture(
            secondScreenPicture,
            clientProjectName
          );
        }
        if (lastScreenPicture) {
          lastScreenPictureURL = await uploadClientPicture(
            lastScreenPicture,
            clientProjectName
          );
        }
        // Create Client
        const clientData = {
          clientName: clientName,
          clientCompany: clientCompany,
          clientPosition: clientPosition,
          projectName: clientProjectName,
          projectDescription: clientProjectDescription,
          projectPicture: clientCoverPictureURL,
          projectFirstScreen: firstScreenPictureURL,
          projectSecondScreen: secondScreenPictureURL,
          projectLastScreen: lastScreenPictureURL,
          consentToDisplay: clientProjectDisplay,
          rating: rating,
          feedback: feedback,
        };
        const response = await updateClientInfo(selectedClient._id, clientData);
        if (response) {
          setClientName("");
          setClientCompany("");
          setClientPosition("");
          setClientProjectName("");
          setClientProjectDescription("");
          setCoverPicture("");
          setFirstScreenPicture("");
          setSecondScreenPicture("");
          setLastScreenPicture("");
          setClientProjectDisplay(false);
          setRating(5);
          setFeedback("");
          setTabIndex("2");
          console.log(response); // Debug Log
        }
      }
    }
  };

  // ---API
  const uploadClientPicture = async (base64EncodedImage, clientProjectName) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/client/picture", {
        imageString: base64EncodedImage,
        clientProjectName: clientProjectName,
      });
      if (response) {
        setOpenLoading(false);
        return response.data.url;
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
    }
  };

  const updateClientInfo = async (id, clientData) => {
    setOpenLoading(true);
    try {
      const response = await axios.patch(
        `/api/client/selected/${id}`,
        clientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setOpenLoading(false);
        toast.success("Successfully Updated");
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
      <CardHeader title="Client Details" subheader="Update" />
      {selectedClient !== null ? (
        <form onSubmit={onUpdateHandler}>
          <CardContent>
            <Stack
              direction={"row"}
              spacing={1}
              sx={{ mb: 1 }}
              display={"flex"}
              justifyContent={"space-between"}
            >
              {coverPicture ? (
                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                  <img src={coverPicture} alt="project" width="100%" />
                  <Typography variant="caption" color="text.secondary">
                    Cover Picture
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    mb: 1,
                    p: 1,
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageIcon fontSize="large" />
                </Paper>
              )}
              {firstScreenPicture ? (
                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                  <img src={firstScreenPicture} alt="project" width="100%" />
                  <Typography variant="caption" color="text.secondary">
                    First Screen
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    mb: 1,
                    p: 1,
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageIcon fontSize="large" />
                </Paper>
              )}
              {secondScreenPicture ? (
                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                  <img src={secondScreenPicture} alt="project" width="100%" />
                  <Typography variant="caption" color="text.secondary">
                    Second Screen
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    mb: 1,
                    p: 1,
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageIcon fontSize="large" />
                </Paper>
              )}
              {lastScreenPicture ? (
                <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "25%" }}>
                  <img src={lastScreenPicture} alt="project" width="100%" />
                  <Typography variant="caption" color="text.secondary">
                    Last Screen
                  </Typography>
                </Paper>
              ) : (
                <Paper
                  variant="outlined"
                  sx={{
                    mb: 1,
                    p: 1,
                    width: "25%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ImageIcon fontSize="large" />
                </Paper>
              )}
            </Stack>

            <Stack spacing={3}>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Client Name"
                  name="client-name"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  fullWidth
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Client Company"
                  name="client-company"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  fullWidth
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Client Position"
                  name="client-position"
                  value={clientPosition}
                  onChange={(e) => setClientPosition(e.target.value)}
                  fullWidth
                />
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Project Name"
                  name="project-name"
                  value={clientProjectName}
                  onChange={(e) => setClientProjectName(e.target.value)}
                  fullWidth
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Project Description"
                  name="project-description"
                  value={clientProjectDescription}
                  onChange={(e) => setClientProjectDescription(e.target.value)}
                  fullWidth
                  multiline
                />
              </Stack>
              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Paper variant="outlined" sx={{ p: 1, pr: 2 }}>
                  <IconButton color="secondary" component="label">
                    <Input
                      accept="image/*"
                      multiple={false}
                      type="file"
                      onChange={handleCoverFileChange}
                    />
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ float: "right", ml: 1, mt: 1.3 }}
                  >
                    Cover Picture
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1, pr: 2 }}>
                  <IconButton color="secondary" component="label">
                    <Input
                      accept="image/*"
                      multiple={false}
                      type="file"
                      onChange={handleFirstScreenFileChange}
                    />
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ float: "right", ml: 1, mt: 1.3 }}
                  >
                    First Screen
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1, pr: 2 }}>
                  <IconButton color="secondary" component="label">
                    <Input
                      accept="image/*"
                      multiple={false}
                      type="file"
                      onChange={handleSecondScreenFileChange}
                    />
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ float: "right", ml: 1, mt: 1.3 }}
                  >
                    Second Screen
                  </Typography>
                </Paper>
                <Paper variant="outlined" sx={{ p: 1, pr: 2 }}>
                  <IconButton color="secondary" component="label">
                    <Input
                      accept="image/*"
                      multiple={false}
                      type="file"
                      onChange={handleLastScreenFileChange}
                    />
                    <AddPhotoAlternateIcon />
                  </IconButton>
                  <Typography
                    variant="caption"
                    sx={{ float: "right", ml: 1, mt: 1.3 }}
                  >
                    Last Screen
                  </Typography>
                </Paper>
                <FormControlLabel
                  control={
                    <Switch
                      checked={clientProjectDisplay}
                      onChange={(e) =>
                        setClientProjectDisplay(e.target.checked)
                      }
                      color="secondary"
                    />
                  }
                  label={
                    clientProjectDisplay
                      ? "Consent To Display: Approved ✅"
                      : "Consent To Display: Not Approved ❌"
                  }
                  sx={{
                    border: "1px solid lightgray",
                    pr: 1,
                    borderRadius: 1,
                  }}
                />
              </Stack>

              <Stack
                direction={"row"}
                spacing={2}
                display={"flex"}
                justifyContent={"space-between"}
              >
                <Paper variant="outlined" sx={{ py: 0.5, px: 2 }}>
                  <Rating
                    name="rating"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                </Paper>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Client Feedback"
                  name="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  fullWidth
                  multiline
                />
              </Stack>
            </Stack>
          </CardContent>
          <CardActions>
            <LoadingButton
              variant="contained"
              color="success"
              disableElevation
              type="submit"
              loading={false}
            >
              <Typography variant="h5">Update</Typography>
            </LoadingButton>
          </CardActions>
        </form>
      ) : (
        <CardContent>What do you want to update?</CardContent>
      )}
    </Card>
  );
};

export default ClientUpdate;
