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

const ClientCreate = ({ token, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // states
  const [clientName, setClientName] = useState("");
  const [clientCompany, setClientCompany] = useState("");
  const [clientPosition, setClientPosition] = useState("");

  const [clientProjectName, setClientProjectName] = useState("");
  const [clientProjectDescription, setClientProjectDescription] = useState("");
  const [clientProjectDisplay, setClientProjectDisplay] = useState(false);

  const [coverPicture, setCoverPicture] = useState("");
  const [firstScreenPicture, setFirstScreenPicture] = useState("");
  const [secondScreenPicture, setSecondScreenPicture] = useState("");
  const [lastScreenPicture, setLastScreenPicture] = useState("");

  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");

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

  const onSubmitHandler = async (event) => {
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
        const response = await createClientInfo(clientData);
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

  const createClientInfo = async (clientData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/client/create", clientData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setOpenLoading(false);
        toast.success("Successfully Created");
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
      <CardHeader title="Client Details" subheader="Create" />
      <form onSubmit={onSubmitHandler}>
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
                    onChange={(e) => setClientProjectDisplay(e.target.checked)}
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
            disableElevation
            type="submit"
            loading={false}
          >
            <Typography variant="h5">Create</Typography>
          </LoadingButton>
        </CardActions>
      </form>
    </Card>
  );
};

export default ClientCreate;
