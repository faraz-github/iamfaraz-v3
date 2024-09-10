import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { useLoading } from "../../../contexts/loadingContext";

const AdminRead = ({ token, setSelectedAdmin, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [admins, setAdmins] = useState([]);

  // Handlers
  const updateAdmin = (admin) => {
    setSelectedAdmin(admin);
    setTabIndex("3");
  };
  const deleteAdmin = (admin) => {
    setSelectedAdmin(admin);
    setTabIndex("4");
  };

  // ---API
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
          setAdmins(response?.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setAdmins([]);
        setOpenLoading(false);
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        }
      }
    };
    readAdminInfo();
  }, []);

  return (
    <Card variant="outlined" square sx={{ padding: 2 }}>
      <CardHeader title="Admins List" subheader="Read" />
      <Grid container spacing={2}>
        {admins.length ? (
          admins.map((admin, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant="outlined">
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Avatar
                          src={admin.picture}
                          sx={{ my: 1, height: 256, width: 256 }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack spacing={1}>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Name
                            </Typography>
                            <Typography variant="h5">{admin.name}</Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Email
                            </Typography>
                            <Typography variant="h5">{admin.email}</Typography>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Stack
                              direction="row"
                              spacing={2}
                              display={"flex"}
                              alignItems={"center"}
                            >
                              <Typography
                                variant="body2"
                                fontSize={18}
                                color="text.secondary"
                              >
                                Verified
                              </Typography>
                              <Box
                                sx={{
                                  width: 25,
                                  height: 25,
                                  borderRadius: "50%",
                                  border: "1px solid",
                                  borderColor: (theme) =>
                                    theme.palette.primary.light,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                {admin.verified === true ? (
                                  <CheckIcon
                                    fontSize="small"
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.success.main,
                                    }}
                                  />
                                ) : (
                                  <CloseIcon
                                    fontSize="small"
                                    sx={{
                                      color: (theme) =>
                                        theme.palette.error.main,
                                    }}
                                  />
                                )}
                              </Box>
                            </Stack>
                          </Paper>
                          <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                            <Typography
                              variant="body2"
                              fontSize={18}
                              color="text.secondary"
                            >
                              Role
                            </Typography>
                            <Typography variant="h5">{admin.role}</Typography>
                          </Paper>
                        </Stack>
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions>
                    <ButtonGroup
                      variant="outlined"
                      disabled={admin.role === "superAdmin"}
                    >
                      <Button
                        color="success"
                        onClick={() => updateAdmin(admin)}
                      >
                        <Typography variant="h5">Update</Typography>
                      </Button>
                      <Button color="error" onClick={() => deleteAdmin(admin)}>
                        <Typography variant="h5">Delete</Typography>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <CardContent>Admin information not found, please create.</CardContent>
        )}
      </Grid>
    </Card>
  );
};

export default AdminRead;
