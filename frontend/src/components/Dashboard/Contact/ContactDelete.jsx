import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Paper,
  Stack,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const ContactDelete = ({ token, selectedContact, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // ---API
  const deleteContactInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/info/contact/${selectedContact._id}`,
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
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <Card variant="outlined" square>
      <CardHeader title="Contact Details" subheader="Delete" />
      {selectedContact !== null ? (
        <>
          <CardContent>
            <Stack spacing={1}>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Email
                </Typography>
                <Typography variant="h5">{selectedContact.email}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Phone
                </Typography>
                <Typography variant="h5">{selectedContact.phone}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Address
                </Typography>
                <Typography variant="h5">{selectedContact.address}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Social Network
                </Typography>
                {selectedContact.social.length ? (
                  <Stack
                    direction={"row"}
                    spacing={1}
                    sx={{ overflow: "hidden", overflowX: "scroll" }}
                  >
                    {selectedContact.social.map((item, index) => {
                      return (
                        <Paper variant="outlined" key={index} sx={{ p: 1 }}>
                          <Typography variant="body2" color="text.secondary">
                            Platform Name
                          </Typography>
                          <Typography variant="h5">
                            {item.platformName}
                          </Typography>

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
              </Paper>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deleteContactInfo}
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

export default ContactDelete;
