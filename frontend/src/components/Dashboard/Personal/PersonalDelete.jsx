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
  Chip,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const PersonalDelete = ({ token, selectedPersonal, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // ---API
  const deletePersonalInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/info/personal/${selectedPersonal._id}`,
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
      <CardHeader title="Personal Details" subheader="Delete" />
      {selectedPersonal !== null ? (
        <>
          <CardContent>
            <center>
              <Avatar
                src={selectedPersonal.picture}
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
                <Typography variant="h5">{selectedPersonal.name}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Profession
                </Typography>
                {selectedPersonal.profession ? (
                  <Box>
                    {selectedPersonal.profession.map((profession, index) => {
                      return (
                        <Chip key={index} label={profession} sx={{ mr: 1 }} />
                      );
                    })}
                  </Box>
                ) : null}
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Platform
                </Typography>
                <Typography variant="h5">
                  {selectedPersonal.platform}
                </Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Status
                </Typography>
                <Typography variant="h5">{selectedPersonal.status}</Typography>
              </Paper>
            </Stack>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deletePersonalInfo}
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

export default PersonalDelete;
