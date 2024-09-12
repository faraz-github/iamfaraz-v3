import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Stack,
  Typography,
  IconButton,
  Box,
  Paper,
  Grid,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useLoading } from "../../../contexts/loadingContext";

const ContactCreate = ({ token, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [inputSocial, setInputSocial] = useState({
    platformName: "",
    baseURL: "",
    username: "",
  });
  const { platformName, baseURL, username } = inputSocial;
  const [social, setSocial] = useState([]);

  // Handlers
  const onChangeHandler = (event) => {
    setInputSocial((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSocial = () => {
    if (!platformName || !baseURL || !username) {
      console.log("Please fill all social fields"); // Debug Log
      toast.info("Please fill all social fields");
    } else {
      setSocial((prevState) => [...prevState, inputSocial]);
      setInputSocial({
        platformName: "",
        baseURL: "",
        username: "",
      });
    }
  };

  const deleteSocial = (id) => {
    const filteredResult = social.filter((item, index) => index !== id);
    setSocial(filteredResult);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    if (!email || !phone || !address || social.length === 0) {
      console.log("Please provide all the details"); // Debug Log
      toast.info("Please provide all the details");
    } else {
      const contactData = {
        email,
        phone,
        address,
        social,
      };
      const response = await createContactInfo(contactData);
      if (response) {
        setEmail("");
        setPhone("");
        setAddress("");
        setSocial([]);
        setTabIndex("2");
        // console.log(response); // Debug Log
      }
    }
  };

  // ---API

  const createContactInfo = async (contactData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/info/contact", contactData, {
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
      <CardHeader title="Contact Details" subheader="Create" />
      <form onSubmit={onSubmitHandler}>
        <CardContent>
          <Stack spacing={1}>
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              size="small"
              color="secondary"
              variant="outlined"
              type="text"
              label="Address"
              name="address"
              multiline
              maxRows={4}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <Paper variant="outlined" sx={{ p: 1 }}>
              <Typography variant="body2" fontSize={18} color="text.secondary">
                Social Network
              </Typography>
              {social.length ? (
                <Stack
                  direction={"row"}
                  spacing={1}
                  mb={1}
                  sx={{ overflow: "hidden", overflowX: "scroll" }}
                >
                  {social.map((item, index) => {
                    return (
                      <Paper variant="outlined" key={index} sx={{ p: 1 }}>
                        <Stack
                          direction={"row"}
                          display={"flex"}
                          justifyContent={"space-between"}
                        >
                          <Box>
                            <Typography variant="body2" color="text.secondary">
                              Platform Name
                            </Typography>
                            <Typography variant="h5">
                              {item.platformName}
                            </Typography>
                          </Box>
                          <Box>
                            <IconButton
                              color="secondary"
                              onClick={() => deleteSocial(index)}
                              size="small"
                            >
                              <DeleteTwoToneIcon />
                            </IconButton>
                          </Box>
                        </Stack>

                        <Typography variant="body2" color="text.secondary">
                          User Name
                        </Typography>
                        <Typography variant="h5">{item.username}</Typography>

                        <Typography variant="body2" color="text.secondary">
                          Base URL
                        </Typography>
                        <Typography variant="h5">{item.baseURL}</Typography>
                      </Paper>
                    );
                  })}
                </Stack>
              ) : null}
              <Grid container spacing={1} alignItems={"center"}>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Social Platform"
                    name="platformName"
                    value={platformName}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Base URL"
                    name="baseURL"
                    value={baseURL}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    size="small"
                    color="secondary"
                    variant="outlined"
                    fullWidth
                    type="text"
                    label="Username"
                    name="username"
                    value={username}
                    onChange={onChangeHandler}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="outlined" fullWidth onClick={handleSocial}>
                    <Typography variant="h5">Add Social</Typography>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
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

export default ContactCreate;
