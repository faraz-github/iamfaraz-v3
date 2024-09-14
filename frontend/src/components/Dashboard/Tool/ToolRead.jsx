import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
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

import { useLoading } from "../../../contexts/loadingContext";

const ToolRead = ({ setSelectedTool, setTabIndex }) => {
  // Context
  const { setOpenLoading } = useLoading();

  // State
  const [tools, setTools] = useState([]);

  // Handlers
  const updateTool = (tool) => {
    setSelectedTool(tool);
    setTabIndex("3");
  };
  const deleteTool = (tool) => {
    setSelectedTool(tool);
    setTabIndex("4");
  };

  // ---API
  useEffect(() => {
    const readToolInfo = async () => {
      setOpenLoading(true);
      try {
        const response = await axios.get("/api/info/tool");
        if (response) {
          setOpenLoading(false);
          setTools(response.data);
          return response;
        }
      } catch (error) {
        console.log(error); // Debug Log
        setTools([]);
        setOpenLoading(false);
        if (error.response.data.message) {
          toast.error(error.response.data.message);
        }
      }
    };
    readToolInfo();
  }, []);

  return (
    <Card variant="outlined" square>
      <CardHeader title="Tool Details" subheader="Read" />
      <Grid container spacing={2}>
        {tools.length ? (
          tools.map((tool, index) => {
            return (
              <Grid item xs={12} sm={6} key={index}>
                <Paper variant="outlined">
                  <CardContent>
                    <center>
                      <Paper
                        variant="outlined"
                        sx={{ mb: 1, p: 1, width: "100px" }}
                      >
                        <img src={tool.icon} alt="software-tool" width="100%" />
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
                        <Typography variant="h5">{tool.name}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Type
                        </Typography>
                        <Typography variant="h5">{tool.type}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Description
                        </Typography>
                        <Typography variant="h5">{tool.description}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Link
                        </Typography>
                        <Typography variant="h5">{tool.link}</Typography>
                      </Paper>
                      <Paper variant="outlined" sx={{ py: 0.5, px: 1 }}>
                        <Typography
                          variant="body2"
                          fontSize={18}
                          color="text.secondary"
                        >
                          Category
                        </Typography>
                        <Typography variant="h5">{tool.category}</Typography>
                      </Paper>
                    </Stack>
                  </CardContent>

                  <CardActions>
                    <ButtonGroup variant="outlined">
                      <Button color="success" onClick={() => updateTool(tool)}>
                        <Typography variant="h5">Update</Typography>
                      </Button>
                      <Button color="error" onClick={() => deleteTool(tool)}>
                        <Typography variant="h5">Delete</Typography>
                      </Button>
                    </ButtonGroup>
                  </CardActions>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <CardContent>Tool information not found, please create.</CardContent>
        )}
      </Grid>
    </Card>
  );
};

export default ToolRead;
