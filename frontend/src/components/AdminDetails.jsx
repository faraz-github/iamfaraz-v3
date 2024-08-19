import { useEffect, useState } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
  Button,
  Tab,
  Typography,
  Stack,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  ButtonGroup,
  Box,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";

import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import StorageTwoToneIcon from "@mui/icons-material/StorageTwoTone";
import UpdateTwoToneIcon from "@mui/icons-material/UpdateTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

function AdminDetails() {
  const { token } = useAdmin();
  const { setOpenLoading } = useLoading();

  // =========================================================================================== MUI - Tabs
  const [value, setValue] = useState("2");
  const handleChange = (event, newValue) => {
    if (newValue === "3") {
      setVerified(false);
      setRole("pending");
      setValue(newValue);
    }
    setUpdateId("");
    setDeleteId("");
    setValue(newValue);
  };

  // =========================================================================================== READ TAB
  const [admin, setAdmin] = useState([]);
  //------------------------------------------------------------------------------------------- API
  useEffect(() => {
    const readAdminInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/admin/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response) {
          setOpenLoading(false);
          setAdmin(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setAdmin([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readAdminInfo();
  }, [value]);

  // =========================================================================================== UPDATE TAB
  const [updateId, setUpdateId] = useState("");
  const [dashboardAdmin, setDashboardAdmin] = useState();
  const [verified, setVerified] = useState(false);
  const [role, setRole] = useState("pending");
  const updateInformation = (info) => {
    setValue("3");
    setDashboardAdmin(info);
    setVerified(info.verified);
    setRole(info.role);
    setUpdateId(info._id);
  };

  const onUpdateHandler = async (event) => {
    event.preventDefault();
    // Update Admin Info
    const id = updateId;
    const adminData = {
      verified: verified,
      role: role,
    };
    const response = await updateAdminInfo(id, adminData);
    if (response) {
      setUpdateId("");
      setValue("2");
      console.log(response); // Debug Log
    }
  };
  //------------------------------------------------------------------------------------------- API
  const updateAdminInfo = async (id, adminData) => {
    setOpenLoading(true);
    try {
      const response = await axios.patch(
        `/api/admin/selected/${id}`,
        adminData,
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
    setDashboardAdmin(info);
    setDeleteId(info._id);
  };
  //------------------------------------------------------------------------------------------- API
  const deleteAdminInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(`/api/admin/selected/${deleteId}`, {
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
        title="Admin Information"
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
              label="Read"
              value="2"
              icon={<StorageTwoToneIcon />}
              iconPosition="start"
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
            value="2"
            sx={{
              p: 0,
            }}
          >
            <Card variant="outlined" square>
              <CardHeader title="Admin Details" subheader="Read" />
              {admin.length ? (
                admin.map((info, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{ borderBottom: "1px solid lightgray" }}
                    >
                      <CardContent>
                        <center>
                          <Avatar
                            src={info.picture}
                            sx={{ my: 1, height: 256, width: 256 }}
                          />
                        </center>
                        <Stack spacing={1}>
                          <Box>
                            <Typography color="text.secondary">Name</Typography>
                            <Typography variant="h5">{info.name}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">
                              Email
                            </Typography>
                            <Typography variant="h5">{info.email}</Typography>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">
                              Verified
                            </Typography>
                            <Box
                              sx={{
                                display:"flex",
                                justifyContent:"center",
                                alignItems:"center",
                                height: "40px",
                                width: "40px",
                                border: "1px solid lightgrey",
                                borderRadius: "100%",
                              }}
                            >
                              <Typography variant="h5" sx={{marginTop: "-3px"}}>
                                {info.verified === true ? "✔️" : "❌"}
                              </Typography>
                            </Box>
                          </Box>
                          <Box>
                            <Typography color="text.secondary">Role</Typography>
                            <Typography variant="h5">{info.role}</Typography>
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
                  Admin information not found, please create.
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
              <CardHeader title="Admin Details" subheader="Update" />
              {updateId !== "" ? (
                <form onSubmit={onUpdateHandler}>
                  <CardContent>
                    <center>
                      <Avatar
                        src={dashboardAdmin.picture}
                        sx={{ m: 1, height: 128, width: 128 }}
                      />
                    </center>

                    <Typography color="text.secondary">Name</Typography>
                    <Typography variant="h5">{dashboardAdmin.name}</Typography>
                    <Typography color="text.secondary">Email</Typography>
                    <Typography variant="h5">{dashboardAdmin.email}</Typography>

                    <Paper sx={{ p: 2, mt: 1 }} variant="outlined">
                      <Stack spacing={1}>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={verified}
                              onChange={(e) => setVerified(e.target.checked)}
                              color="secondary"
                            />
                          }
                          label={
                            verified ? "Email Verified" : "Email Not Verified"
                          }
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={role === "admin" ? true : false}
                              onChange={(e) =>
                                e.target.checked
                                  ? setRole("admin")
                                  : setRole("pending")
                              }
                              color="warning"
                            />
                          }
                          label={
                            role === "admin"
                              ? "Admin Approved"
                              : "Admin Approval Pending"
                          }
                        />
                      </Stack>
                    </Paper>
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
              <CardHeader title="Admin Details" subheader="Delete" />
              {deleteId !== "" ? (
                <>
                  <CardContent>
                    <center>
                      <Avatar
                        src={dashboardAdmin.picture}
                        sx={{ my: 1, height: 256, width: 256 }}
                      />
                    </center>
                    <Typography color="text.secondary">Name</Typography>
                    <Typography variant="h5">{dashboardAdmin.name}</Typography>
                    <Typography color="text.secondary">Email</Typography>
                    <Typography variant="h5">{dashboardAdmin.email}</Typography>
                    <Typography color="text.secondary">Verified</Typography>
                    <Typography variant="h5">
                      {dashboardAdmin.verified === true ? "✔️" : "❌"}
                    </Typography>
                    <Typography color="text.secondary">Role</Typography>
                    <Typography variant="h5">{dashboardAdmin.role}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={deleteAdminInfo}
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

export default AdminDetails;
