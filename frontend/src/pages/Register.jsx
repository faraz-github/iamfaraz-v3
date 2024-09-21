// React
import { useState, useEffect } from "react";

// External Libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// MUI - Components
import { styled } from "@mui/material/styles";

import {
  Avatar,
  Box,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import HowToRegIcon from "@mui/icons-material/HowToReg";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";
import LayoutContainer from "../components/ui/LayoutContainer";
import SectionBox from "../components/ui/SectionBox";
import { Link } from "react-router-dom";

const Input = styled("input")({
  display: "none",
});

// =========================================================================================== MAIN FUNCTION
function Register() {
  const navigate = useNavigate();
  const { admin, setToken } = useAdmin();
  const { setOpenLoading } = useLoading();

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin, navigate]);

  // =========================================================================================== USE STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const { name, email, password, confirmPassword } = formData;

  // =========================================================================================== ON CHANGE
  const onChangeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const [selectedImage, setSelectedImage] = useState("");

  const handleFileChange = (event) => {
    const image = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image); // base 64 encoding
    reader.onloadend = () => {
      setSelectedImage(reader.result);
    };
  };

  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      console.log("Passwords do not match"); // Debug Log
      toast.error("Passwords do not match");
    } else {
      // Upload Profile Picture
      if (!selectedImage) {
        console.log("Please select a profile picture"); // Debug Log
        toast.info("Please select a profile picture");
      } else {
        const pictureURL = await uploadAdminPicture(selectedImage, name);
        // Register Admin
        const registrationData = {
          name: name,
          email: email,
          picture: pictureURL,
          password: password,
        };
        const response = await registerAdmin(registrationData);
        if (response) {
          localStorage.setItem("admin", JSON.stringify(response.data.token));
          setToken(JSON.parse(localStorage.getItem("admin")));
        }
      }
    }
  };

  // =========================================================================================== API
  const uploadAdminPicture = async (base64EncodedImage, adminName) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/upload/admin/picture", {
        imageString: base64EncodedImage,
        adminName: adminName,
      });
      if (response) {
        setOpenLoading(false);
        return response.data.url;
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
      console.log("Failed to upload profile picture"); // Debug Log
      toast.error("Failed to upload profile picture");
    }
  };

  const registerAdmin = async (registrationData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post(
        "/api/admin/register",
        registrationData
      );
      if (response) {
        setOpenLoading(false);
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
    <SectionBox id="login" halfScreenHeight>
      <LayoutContainer>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={15}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 5,
              minWidth: "400px",
            }}
          >
            <Typography variant="h5" fontSize={32} gutterBottom>
              Register
            </Typography>
            <center>
              <Avatar
                src={selectedImage}
                sx={{ m: 1, height: 128, width: 128 }}
              />
            </center>
            <form onSubmit={onSubmitHandler}>
              <Stack spacing={1}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="text"
                  label="Name"
                  name="name"
                  value={name}
                  onChange={onChangeHandler}
                  required
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                  required
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                  required
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="password"
                  label="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChangeHandler}
                  required
                />
                <Grid container>
                  <Grid item xs={3}>
                    <Tooltip title="Upload Picture">
                      <IconButton
                        component="label"
                        size="large"
                        color="secondary"
                      >
                        <Input
                          accept="image/*"
                          multiple={false}
                          type="file"
                          onChange={handleFileChange}
                        />
                        <InsertPhotoIcon />
                      </IconButton>
                    </Tooltip>
                  </Grid>

                  <Grid item xs={9} display="flex">
                    <LoadingButton
                      fullWidth
                      color="secondary"
                      variant="contained"
                      size="large"
                      type="submit"
                      loading={false}
                      endIcon={<HowToRegIcon />}
                    >
                      <Typography variant="h5" fontSize={24}>
                        Register
                      </Typography>
                    </LoadingButton>
                  </Grid>
                </Grid>
                <Box>
                  <Typography
                    variant="body2"
                    fontSize={16}
                    color={"primary.light"}
                    sx={{ display: "inline-block", mr: 1 }}
                  >
                    Already have an account?
                  </Typography>
                  <Typography
                    component={Link}
                    to={"/login"}
                    variant="body2"
                    fontSize={16}
                    color={"secondary.main"}
                  >
                    Login
                  </Typography>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
      </LayoutContainer>
    </SectionBox>
  );
}
// =========================================================================================== EXPORT
export default Register;
