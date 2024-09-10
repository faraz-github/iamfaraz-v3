import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useLoading } from "../../../contexts/loadingContext";

const AdminUpdate = ({ token, selectedAdmin, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [verified, setVerified] = useState(selectedAdmin?.verified);
  const [role, setRole] = useState(selectedAdmin?.role);

  // Handlers
  const onUpdateHandler = async (event) => {
    event.preventDefault();
    const id = selectedAdmin._id;
    const adminData = {
      verified: verified,
      role: role,
    };
    const response = await updateAdminInfo(id, adminData);
    if (response) {
      setTabIndex("2");
      //   console.log(response); // Debug Log
    }
  };

  // ---API
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
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
  };

  return (
    <Card variant="outlined" square>
      <CardHeader title="Admin Details" subheader="Update" />
      {selectedAdmin !== null ? (
        <form onSubmit={onUpdateHandler}>
          <CardContent>
            <center>
              <Avatar
                src={selectedAdmin.picture}
                sx={{ m: 1, height: 256, width: 256 }}
              />
            </center>
            <Stack spacing={1}>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Name
                </Typography>
                <Typography variant="h5">{selectedAdmin.name}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Email
                </Typography>
                <Typography variant="h5">{selectedAdmin.email}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
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
                      <Typography
                        variant="h5"
                        color={verified ? "success.main" : "error.main"}
                      >
                        {verified ? "Email Verified" : "Email Not Verified"}
                      </Typography>
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
                      <Typography
                        variant="h5"
                        color={role === "admin" ? "success.main" : "error.main"}
                      >
                        {role === "admin"
                          ? "Admin Approved"
                          : "Admin Approval Pending"}
                      </Typography>
                    }
                  />
                </Stack>
              </Paper>
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

export default AdminUpdate;
