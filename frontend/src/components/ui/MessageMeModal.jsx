import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import {
  Box,
  Button,
  CircularProgress,
  FormLabel,
  Grid,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import StyledLine from "./StyledLine";

const MessageMeModal = ({ open, handleClose }) => {
  // =========================================================================================== USE STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { name, email, message } = formData;

  const [isSubmitting, setIsSubmitting] = useState(false);

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
    const response = await createContactFormEntryAndMail(formData);
    if (response) {
      setTimeout(() => {
        toast.success("We will get back to you shortly!");
      }, 2000);
      handleClose();
    }
  };

  // ---API
  const createContactFormEntryAndMail = async (contactData) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        "/api/communication/new-client-contact",
        contactData
      );
      if (response) {
        setIsSubmitting(false);
        toast.success("Message Sent Successfully!");
        return response;
      }
    } catch (error) {
      console.log(error); // Debug Log
      setIsSubmitting(false);
      if (error?.response?.data?.message) {
        toast.error(error?.response?.data?.message);
      }
    }
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
      <Paper sx={{ p: 4 }}>
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
            <Grid item md={6} sm={12} xs={12}>
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
            <Grid item md={6} sm={12} xs={12}>
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
              sx={{ borderRadius: 15, mt: 3 }}
              type="submit"
              disabled={isSubmitting}
            >
              <Typography variant="h3" fontSize={32} mr={isSubmitting ? 1 : 0}>
                Send
              </Typography>
              {isSubmitting ? (
                <CircularProgress size="16px" color="inherit" />
              ) : null}
            </Button>
          </center>
        </form>
      </Paper>
    </Modal>
  );
};

export default MessageMeModal;
