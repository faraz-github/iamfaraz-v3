import { useState } from "react";

import {
  Box,
  Button,
  FormLabel,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import StyledLine from "./StyledLine";

const MessageMeModal = ({ open, handleClose }) => {
  // TODO refine when linking API
  // TODO add alerts
  // =========================================================================================== USE STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formData;

  // =========================================================================================== ON CHANGE
  const onChangeHandler = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  // =========================================================================================== ON SUBMIT
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log({ formData });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: (theme) => theme.shape.borderRadius,
      }}
    >
      <Paper sx={{ p: 4, minWidth: "800px" }}>
        <Box display={"flex"} alignItems={"center"}>
          <Typography
            variant="h3"
            fontSize={30}
            color={"primary.main"}
            gutterBottom
            minWidth="fit-content"
          >
            Write your message here
          </Typography>
          <StyledLine
            color={"secondary.main"}
            thickness={1}
            rightOrnament
            topMargin={-1}
            leftMargin={1}
          />
        </Box>
        <form onSubmit={onSubmitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormLabel>
                <Typography
                  variant="h5"
                  fontSize={24}
                  color={"primary.main"}
                  gutterBottom
                >
                  Name
                </Typography>
              </FormLabel>
              <TextField
                size="large"
                fullWidth
                variant="outlined"
                type="text"
                name="name"
                value={name}
                onChange={onChangeHandler}
                required
                placeholder="Please write your full name"
                sx={{
                  borderRadius: (theme) => theme.shape.borderRadius,
                  "& input::placeholder": {
                    fontFamily: "Lancelot",
                    fontWeight: 400,
                    fontSize: 20,
                    textAlign: "center",
                  },
                  "& input": {
                    fontFamily: "Alumni Sans",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: 1.1,
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormLabel>
                <Typography
                  variant="h5"
                  fontSize={24}
                  color={"primary.main"}
                  gutterBottom
                >
                  Email
                </Typography>
              </FormLabel>
              <TextField
                size="large"
                fullWidth
                variant="outlined"
                type="email"
                name="email"
                value={email}
                onChange={onChangeHandler}
                required
                placeholder="Please write your email"
                sx={{
                  borderRadius: (theme) => theme.shape.borderRadius,
                  "& input::placeholder": {
                    fontFamily: "Lancelot",
                    fontWeight: 400,
                    fontSize: 20,
                    textAlign: "center",
                  },
                  "& input": {
                    fontFamily: "Alumni Sans",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: 1.1,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormLabel>
                <Typography
                  variant="h5"
                  fontSize={24}
                  color={"primary.main"}
                  gutterBottom
                >
                  Message
                </Typography>
              </FormLabel>
              <TextField
                multiline
                minRows={8}
                size="large"
                fullWidth
                variant="outlined"
                type="text"
                name="message"
                value={message}
                onChange={onChangeHandler}
                required
                placeholder="Please write your message"
                sx={{
                  borderRadius: (theme) => theme.shape.borderRadius,
                  "& textarea::placeholder": {
                    fontFamily: "Lancelot",
                    fontWeight: 400,
                    fontSize: 20,
                    textAlign: "center",
                  },
                  "& textarea": {
                    fontFamily: "Alumni Sans",
                    fontWeight: 500,
                    fontSize: 24,
                    letterSpacing: 1.1,
                  },
                }}
              />
            </Grid>
          </Grid>
          <center>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              sx={{ borderRadius: 15, mt: 2 }}
              type="submit"
            >
              <Typography variant="h3" fontSize={32}>
                Send
              </Typography>
            </Button>
          </center>
        </form>
      </Paper>
    </Modal>
  );
};

export default MessageMeModal;
