import axios from "axios";
import { toast } from "react-toastify";

import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useLoading } from "../../../contexts/loadingContext";

const ToolDelete = ({ token, selectedTool, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // handlers
  const deleteToolInfo = async () => {
    setOpenLoading(true);
    try {
      const response = await axios.delete(
        `/api/info/tool/${selectedTool._id}`,
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
      <CardHeader title="Tool Details" subheader="Delete" />
      {selectedTool !== null ? (
        <>
          <CardContent>
            <center>
              <Paper variant="outlined" sx={{ mb: 1, p: 1, width: "100px" }}>
                <img src={selectedTool.icon} alt="software-tool" width="100%" />
              </Paper>
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
                <Typography variant="h5">{selectedTool.name}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Type
                </Typography>
                <Typography variant="h5">{selectedTool.type}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Description
                </Typography>
                <Typography variant="h5">{selectedTool.description}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Link
                </Typography>
                <Typography variant="h5">{selectedTool.link}</Typography>
              </Paper>
              <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                <Typography
                  variant="body2"
                  fontSize={18}
                  color="text.secondary"
                >
                  Category
                </Typography>
                <Typography variant="h5">{selectedTool.category}</Typography>
              </Paper>
            </Stack>
          </CardContent>

          <CardActions>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={deleteToolInfo}
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

export default ToolDelete;
