import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
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
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import { useLoading } from "../../../contexts/loadingContext";

const Input = styled("input")({
  display: "none",
});

const PersonalCreate = ({ token, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [name, setName] = useState("");
  const [inputProfession, setInputProfession] = useState("");
  const [professions, setProfessions] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [platform, setPlatform] = useState("");
  const [status, setStatus] = useState("");

  // Handlers
  const handleFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  const handleProfession = () => {
    if (inputProfession !== "") {
      setProfessions((prevState) => [...prevState, inputProfession]);
      setInputProfession("");
    } else {
      return;
    }
  };

  const deleteProfession = (id) => {
    const filteredResult = professions.filter(
      (profession, index) => index !== id
    );
    setProfessions(filteredResult);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (name === "" || professions.length === 0) {
      console.log("Please provide all the details"); // Debug Log
      toast.info("Please provide all the details");
    } else {
      // Upload Profile Picture
      if (!selectedImage) {
        console.log("Please select a profile picture"); // Debug Log
        toast.info("Please select a profile picture");
      } else {
        const pictureURL = await uploadPersonalPicture(selectedImage);
        // Create Personal Info
        const personalData = {
          name: name,
          picture: pictureURL,
          profession: professions,
          platform: platform,
          status: status,
        };
        const response = await createPersonalInfo(personalData);
        if (response) {
          setName("");
          setProfessions([]);
          setSelectedImage("");
          setPlatform("");
          setStatus("");
          setTabIndex("2");
          console.log(response); // Debig Log
        }
      }
    }
  };

  // ---API
  const uploadPersonalPicture = async (base64EncodedImage) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/personal/picture", {
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

  const createPersonalInfo = async (personalData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/info/personal", personalData, {
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
      <CardHeader title="Personal Details" subheader="Create" />
      <form onSubmit={onSubmitHandler}>
        <CardContent>
          <center>
            <Avatar
              src={selectedImage}
              sx={{ mb: 1, height: 256, width: 256 }}
            />
            <IconButton
              size="large"
              color="secondary"
              component="label"
              sx={{ mb: 1 }}
            >
              <Input
                accept="image/*"
                multiple={false}
                type="file"
                onChange={handleFileChange}
              />
              <PhotoCameraIcon />
            </IconButton>
          </center>

          <Stack spacing={1.5}>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Paper variant="outlined" sx={{ p: 1 }}>
              {professions.length ? (
                <Stack direction="row" spacing={1} my={1}>
                  {professions.map((profession, index) => {
                    return (
                      <Chip
                        key={index}
                        label={profession}
                        onDelete={() => deleteProfession(index)}
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
                  label="Profession"
                  name="profession"
                  value={inputProfession}
                  onChange={(e) => setInputProfession(e.target.value)}
                  fullWidth
                />
                <Button
                  variant="outlined"
                  onClick={handleProfession}
                  sx={{ minWidth: "fit-content" }}
                >
                  <Typography variant="h5">Add Profession</Typography>
                </Button>
              </Stack>
            </Paper>

            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Platform"
              name="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            />

            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value={"available"}>Available</MenuItem>
                <MenuItem value={"busyQuick"}>
                  Quick Project{" < "}1 Month
                </MenuItem>
                <MenuItem value={"busyLong"}>
                  Long Project{" > "}1 Month
                </MenuItem>
                <MenuItem value={"break"}>Break</MenuItem>
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

export default PersonalCreate;
