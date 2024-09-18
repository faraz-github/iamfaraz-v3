import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { LoadingButton } from "@mui/lab";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ImageIcon from "@mui/icons-material/Image";

import { useLoading } from "../../../contexts/loadingContext";

const Input = styled("input")({
  display: "none",
});

const PortfolioCreate = ({ token, setTabIndex }) => {
  // context
  const { setOpenLoading } = useLoading();

  // state
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [inputStack, setInputStack] = useState("");
  const [stack, setStack] = useState([]);
  const [link, setLink] = useState("");
  const [source, setSource] = useState("");
  const [coverPicture, setCoverPicture] = useState("");
  const [firstScreenPicture, setFirstScreenPicture] = useState("");
  const [secondScreenPicture, setSecondScreenPicture] = useState("");
  const [lastScreenPicture, setLastScreenPicture] = useState("");

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

  const handleStack = () => {
    if (!inputStack) {
      return;
    } else {
      setStack((prevState) => [...prevState, inputStack]);
      setInputStack("");
    }
  };

  const deleteStack = (id) => {
    const filteredResult = stack.filter((item, index) => index !== id);
    setStack(filteredResult);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (
      !name ||
      !type ||
      !description ||
      stack.length === 0 ||
      !link ||
      !source
    ) {
      console.log("Please provide all the details"); // Debug Log
      toast.info("Please provide all the details");
    } else {
      // Upload Pictures
      if (!coverPicture) {
        console.log("Please select cover picture"); // Debug Log
        toast.info("Please select cover picture");
      } else {
        const coverPictureURL = await uploadPortfolioPicture(
          coverPicture,
          name
        );

        // For optional images
        let firstScreenPictureURL = null;
        let secondScreenPictureURL = null;
        let lastScreenPictureURL = null;

        if (firstScreenPicture) {
          firstScreenPictureURL = await uploadPortfolioPicture(
            firstScreenPicture,
            name
          );
        }
        if (secondScreenPicture) {
          secondScreenPictureURL = await uploadPortfolioPicture(
            secondScreenPicture,
            name
          );
        }
        if (lastScreenPicture) {
          lastScreenPictureURL = await uploadPortfolioPicture(
            lastScreenPicture,
            name
          );
        }
        // Create Portfolio Info
        const portfolioData = {
          name: name,
          type: type,
          description: description,
          stack: stack,
          link: link,
          source: source,
          picture: coverPictureURL,
          firstScreen: firstScreenPictureURL,
          secondScreen: secondScreenPictureURL,
          lastScreen: lastScreenPictureURL,
        };
        const response = await createPortfolioInfo(portfolioData);
        if (response) {
          setName("");
          setType("");
          setDescription("");
          setStack([]);
          setLink("");
          setSource("");
          setCoverPicture("");
          setFirstScreenPicture("");
          setSecondScreenPicture("");
          setLastScreenPicture("");
          console.log(response); // Debug Log
        }
      }
    }
  };

  // ---API
  const uploadPortfolioPicture = async (base64EncodedImage) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/portfolio/picture", {
        imageString: base64EncodedImage,
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

  const createPortfolioInfo = async (portfolioData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/info/portfolio", portfolioData, {
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
      <CardHeader title="Portfolio Details" subheader="Create" />
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
                <ImageIcon fontSize="large" htmlColor="grey" />
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
                <ImageIcon fontSize="large" htmlColor="grey" />
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
                <ImageIcon fontSize="large" htmlColor="grey" />
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
                <ImageIcon fontSize="large" htmlColor="grey" />
              </Paper>
            )}
          </Stack>

          <Stack spacing={1}>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Project Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Type"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Description"
              name="description"
              multiline
              maxRows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Link"
              name="link"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Source Code"
              name="source"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <Paper variant="outlined" sx={{ p: 1 }}>
              {stack.length ? (
                <Stack direction="row" spacing={1} my={1}>
                  {stack.map((stack, index) => {
                    return (
                      <Chip
                        key={index}
                        label={stack}
                        onDelete={() => deleteStack(index)}
                      />
                    );
                  })}
                </Stack>
              ) : null}
              <Stack
                direction={"row"}
                spacing={1}
                display={"flex"}
                alignItems={"center"}
              >
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  type="text"
                  label="Tech Stack"
                  name="inputStack"
                  value={inputStack}
                  onChange={(e) => setInputStack(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleStack}
                  sx={{ minWidth: "fit-content" }}
                >
                  <Typography variant="h5">Add Stack</Typography>
                </Button>
              </Stack>
            </Paper>
          </Stack>
        </CardContent>
        <CardActions>
          <Stack
            direction={"row"}
            spacing={1}
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
          </Stack>
          <Box flexGrow={1} />
          <LoadingButton
            sx={{ py: 1.5, px: 3 }}
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

export default PortfolioCreate;
