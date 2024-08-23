import { useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Box,
  Button,
  ButtonGroup,
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
  Tab,
  TextField,
  Typography,
} from "@mui/material";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageIcon from "@mui/icons-material/Image";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

const Input = styled("input")({
  display: "none",
});

function ClientDetails() {
  const { token } = useAdmin();
  const { setOpenLoading } = useLoading();

  // =========================================================================================== MUI - Tabs
  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    if (newValue === "1" || newValue === "3") {
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
      setValue(newValue);
    }
    setUpdateId("");
    setDeleteId("");
    setValue(newValue);
  };

  // =========================================================================================== CREATE TAB

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

  //-------------------------------------------------------------------------------------------
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

  //-------------------------------------------------------------------------------------------
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
          console.log(response); // Debug Log
        }
      }
    }
  };

  //------------------------------------------------------------------------------------------- API
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

  // =========================================================================================== READ TAB
  const [client, setClient] = useState([]);
  //------------------------------------------------------------------------------------------- API
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

  // =========================================================================================== UPDATE TAB
  const [updateId, setUpdateId] = useState("");
  const updateInformation = (info) => {
    setValue("3");
    setClientName(info.client.name);
    setClientCompany(info.client.company);
    setClientPosition(info.client.position);
    setClientProjectName(info.project.name);
    setClientProjectDescription(info.project.description);
    setCoverPicture(info.project.picture);
    setFirstScreenPicture(info.project.firstScreen);
    setSecondScreenPicture(info.project.secondScreen);
    setLastScreenPicture(info.project.lastScreen);
    setClientProjectDisplay(info.project.consentToDisplay);
    setRating(info.rating);
    setFeedback(info.feedback);
    setUpdateId(info._id);
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
        const response = await updateClientInfo(updateId, clientData);
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
          setUpdateId("");
          console.log(response); // Debug Log
        }
      }
    }
  };
  //------------------------------------------------------------------------------------------- API
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

  // =========================================================================================== DELETE TAB
  const [deleteId, setDeleteId] = useState("");
  const deleteInformation = (info) => {
    setValue("4");
    setClientName(info.client.name);
    setClientCompany("");
    setClientPosition("");
    setClientProjectName(info.project.name);
    setClientProjectDescription("");
    setCoverPicture(info.project.picture);
    setFirstScreenPicture(info.project.firstScreen);
    setSecondScreenPicture(info.project.secondScreen);
    setLastScreenPicture(info.project.lastScreen);
    setClientProjectDisplay(false);
    setRating(info.rating);
    setFeedback(info.feedback);
    setUpdateId("");
    setDeleteId(info._id);
  };

  //------------------------------------------------------------------------------------------- API
  const deleteClientInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(`/api/client/selected/${deleteId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        setOpenLoading(false);
        toast.success("Successfully Deleted");
        setDeleteId("");
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

  // =========================================================================================== RENDER
  return (
    <Card>
      <CardHeader
        title="Client Information"
        subheader="Manager - Super Admin Only"
      />
      <CardContent>
        <TabContext value={value}>
          <TabList
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            variant="scrollable"
          >
            <Tab
              label="Create"
              value="1"
              icon={<CreateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Read"
              value="2"
              icon={<StorageTwoToneIcon />}
              iconPosition="start"
              onClick={readClientInfo}
            />
            <Tab
              label="Update"
              value="3"
              icon={<UpdateTwoToneIcon />}
              iconPosition="start"
            />
            <Tab
              label="Delete"
              value="4"
              icon={<DeleteTwoToneIcon />}
              iconPosition="start"
            />
          </TabList>

          <TabPanel
            value="1"
            sx={{
              p: 0,
            }}
          >
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
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
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
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={firstScreenPicture}
                          alt="project"
                          width="100%"
                        />
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
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={secondScreenPicture}
                          alt="project"
                          width="100%"
                        />
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
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={lastScreenPicture}
                          alt="project"
                          width="100%"
                        />
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
                        onChange={(e) =>
                          setClientProjectDescription(e.target.value)
                        }
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
                    disableElevation
                    type="submit"
                    loading={false}
                  >
                    Create
                  </LoadingButton>
                </CardActions>
              </form>
            </Card>
          </TabPanel>

          <TabPanel
            value="2"
            sx={{
              p: 0,
            }}
          >
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
                          <Paper
                            variant="outlined"
                            sx={{ mb: 1, p: 1, width: "25%" }}
                          >
                            <img
                              src={info.project.picture}
                              alt="project"
                              width="100%"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Cover Picture
                            </Typography>
                          </Paper>
                          <Paper
                            variant="outlined"
                            sx={{ mb: 1, p: 1, width: "25%" }}
                          >
                            <img
                              src={info.project.firstScreen}
                              alt="project"
                              width="100%"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              First Screen
                            </Typography>
                          </Paper>
                          <Paper
                            variant="outlined"
                            sx={{ mb: 1, p: 1, width: "25%" }}
                          >
                            <img
                              src={info.project.secondScreen}
                              alt="project"
                              width="100%"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              Second Screen
                            </Typography>
                          </Paper>
                          <Paper
                            variant="outlined"
                            sx={{ mb: 1, p: 1, width: "25%" }}
                          >
                            <img
                              src={info.project.lastScreen}
                              alt="project"
                              width="100%"
                            />
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
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
                          <Box sx={{ maxWidth: "400px" }}>
                            <Typography color="text.secondary" gutterBottom>
                              Client Name
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                              {info.client.name}
                            </Typography>
                            <Typography color="text.secondary" gutterBottom>
                              Project Name
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                              {info.project.name}
                            </Typography>
                          </Box>
                          <Box sx={{ maxWidth: "400px" }}>
                            <Typography color="text.secondary" gutterBottom>
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
                            <Typography color="text.secondary" gutterBottom>
                              Feedback
                            </Typography>
                            <Typography variant="h6" gutterBottom>
                              {info.feedback}
                            </Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                      <CardActions>
                        <ButtonGroup variant="outlined">
                          <Button
                            color="success"
                            onClick={() => updateInformation(info)}
                          >
                            Update
                          </Button>
                          <Button
                            color="error"
                            onClick={() => deleteInformation(info)}
                          >
                            Delete
                          </Button>
                        </ButtonGroup>
                      </CardActions>
                    </Box>
                  );
                })
              ) : (
                <CardContent>
                  Client information not found, please create.
                </CardContent>
              )}
            </Card>
          </TabPanel>

          <TabPanel
            value="3"
            sx={{
              p: 0,
            }}
          >
            <Card variant="outlined" square>
              <CardHeader title="Client Details" subheader="Update" />
              {updateId !== "" ? (
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
                        <Paper
                          variant="outlined"
                          sx={{ mb: 1, p: 1, width: "25%" }}
                        >
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
                        <Paper
                          variant="outlined"
                          sx={{ mb: 1, p: 1, width: "25%" }}
                        >
                          <img
                            src={firstScreenPicture}
                            alt="project"
                            width="100%"
                          />
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
                        <Paper
                          variant="outlined"
                          sx={{ mb: 1, p: 1, width: "25%" }}
                        >
                          <img
                            src={secondScreenPicture}
                            alt="project"
                            width="100%"
                          />
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
                        <Paper
                          variant="outlined"
                          sx={{ mb: 1, p: 1, width: "25%" }}
                        >
                          <img
                            src={lastScreenPicture}
                            alt="project"
                            width="100%"
                          />
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
                          onChange={(e) =>
                            setClientProjectDescription(e.target.value)
                          }
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
                      Update
                    </LoadingButton>
                  </CardActions>
                </form>
              ) : (
                <CardContent>What do you want to update?</CardContent>
              )}
            </Card>
          </TabPanel>

          <TabPanel
            value="4"
            sx={{
              p: 0,
            }}
          >
            <Card variant="outlined" square>
              <CardHeader title="Client Details" subheader="Delete" />
              {deleteId !== "" ? (
                <>
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
                        <img
                          src={coverPicture}
                          alt="project"
                          width="100%"
                        />
                        <Typography variant="caption" color="text.secondary">
                          Cover Picture
                        </Typography>
                      </Paper>
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "25%" }}
                      >
                        <img
                          src={firstScreenPicture}
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
                          src={secondScreenPicture}
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
                        <img
                          src={lastScreenPicture}
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
                      <Box sx={{ maxWidth: "400px" }}>
                        <Typography color="text.secondary" gutterBottom>
                          Client Name
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {clientName}
                        </Typography>
                        <Typography color="text.secondary" gutterBottom>
                          Project Name
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {clientProjectName}
                        </Typography>
                      </Box>
                      <Box sx={{ maxWidth: "400px" }}>
                        <Typography color="text.secondary" gutterBottom>
                          Rating
                        </Typography>
                        <Rating
                          name="rating-read"
                          value={rating}
                          sx={{
                            mb: 2,
                            "& .MuiRating-iconFilled": {
                              color: (theme) => theme.palette.primary.dark,
                            },
                          }}
                          disabled
                        />
                        <Typography color="text.secondary" gutterBottom>
                          Feedback
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                          {feedback}
                        </Typography>
                      </Box>
                    </Stack>
                  </CardContent>

                  <CardActions>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={deleteClientInfo}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </>
              ) : (
                <CardContent>What do you want to delete?</CardContent>
              )}
            </Card>
          </TabPanel>
        </TabContext>
      </CardContent>
    </Card>
  );
}

export default ClientDetails;
