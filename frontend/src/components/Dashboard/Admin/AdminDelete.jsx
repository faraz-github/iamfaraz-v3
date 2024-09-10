import axios from "axios";
import { toast } from "react-toastify";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { useLoading } from "../../../contexts/loadingContext";

const AdminDelete = ({ token, selectedAdmin, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // ---API
  const deleteAdminInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/admin/selected/${selectedAdmin._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        setOpenLoading(false);
        toast.success("Successfully Deleted");
        setTabIndex("2");
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
      <CardHeader title="Admin Details" subheader="Delete" />
      {selectedAdmin !== null ? (
        <>
          <CardContent>
            <center>
              <Avatar
                src={selectedAdmin.picture}
                sx={{ my: 1, height: 256, width: 256 }}
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
                      borderColor: (theme) => theme.palette.primary.light,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {selectedAdmin.verified === true ? (
                      <CheckIcon
                        fontSize="small"
                        sx={{
                          color: (theme) => theme.palette.success.main,
                        }}
                      />
                    ) : (
                      <CloseIcon
                        fontSize="small"
                        sx={{
                          color: (theme) => theme.palette.error.main,
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
                <Typography variant="h5">{selectedAdmin.role}</Typography>
              </Paper>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deleteAdminInfo}
            >
              <Typography variant="h5">Delete</Typography>
            </Button>
          </CardActions>
        </>
      ) : (
        <CardContent>What do you want to delete?</CardContent>
      )}
    </Card>
  );
};

export default AdminDelete;
