import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";

import { useLoading } from "../../../contexts/loadingContext";

const Input = styled("input")({
  display: "none",
});

const ToolCreate = ({ token, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [category, setCategory] = useState("");

  // handlers
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!name || !type || !description || !link) {
      console.log("Please provide all the details"); // Debug Log
      toast.info("Please provide all the details");
    } else {
      // Upload Profile Picture
      if (!selectedImage) {
        console.log("Please select a tool icon picture"); // Debug Log
        toast.info("Please select a tool icon picture");
      } else {
        const pictureURL = await uploadToolIconPicture(selectedImage);
        // Create Tool Info
        const toolData = {
          name: name,
          type: type,
          description: description,
          link: link,
          icon: pictureURL,
          category: category,
        };
        const response = await createToolInfo(toolData);
        if (response) {
          setName("");
          setType("");
          setDescription("");
          setLink("");
          setSelectedImage("");
          setCategory("");
          setTabIndex("2");
          console.log(response); // Debug Log
        }
      }
    }
  };

  // ---API
  const uploadToolIconPicture = async (base64EncodedImage) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/tool/picture", {
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

  const createToolInfo = async (toolData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/info/tool", toolData, {
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
      <CardHeader title="Tool Details" subheader="Create" />
      <form onSubmit={onSubmitHandler}>
        <CardContent>
          <center>
            {selectedImage ? (
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                <img src={selectedImage} alt="software-tool" width="100%" />
              </Paper>
            ) : (
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                <Typography variant="caption" color="text.secondary">
                  Set Tool Icon
                </Typography>
                <BuildCircleIcon fontSize="large" htmlColor="grey" />
              </Paper>
            )}
            <IconButton
              size="large"
              color="primary"
              component="label"
              sx={{ mb: 1 }}
            >
              <Input
                accept="image/*"
                multiple={false}
                type="file"
                onChange={handleFileChange}
              />
              <BuildCircleIcon />
            </IconButton>
          </center>

          <Stack spacing={1}>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Tool Name"
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
            <FormControl fullWidth>
              <InputLabel id="status-label">Category</InputLabel>
              <Select
                labelId="status-label"
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value={"development"}>Development</MenuItem>
                <MenuItem value={"design"}>Design</MenuItem>
              </Select>
            </FormControl>
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

export default ToolCreate;
