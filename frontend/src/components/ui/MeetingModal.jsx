import { useState } from "react";
import dayjs from "dayjs";

import {
  Box,
  Button,
  FormControlLabel,
  FormLabel,
  Grid,
  Modal,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import StyledLine from "./StyledLine";
import DateAndTime from "./DateAndTime";

const MeetingModal = ({ open, handleClose }) => {
  // TODO refine when linking API
  // TODO add alerts
  // =========================================================================================== USE STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mode: "",
  });

  // For managing date time fields
  const [slot, setSlot] = useState({
    dateTime: null,
  });

  const { name, email, mode } = formData;

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
    console.log({ slot });

    // ISO string
    const isoString = slot.dateTime;

    // Parse ISO string to dayjs object
    const dateTime = dayjs(isoString);

    // Format date to the desired format: MM/DD/YYYY hh:mm A
    const formattedDate = dateTime.format("MM/DD/YYYY hh:mm A");
    console.log({ formattedDate });
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
            Schedule a meeting
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
            <Grid item xs={6}>
              <FormLabel>
                <Typography
                  variant="h5"
                  fontSize={24}
                  color={"primary.main"}
                  gutterBottom
                >
                  Mode
                </Typography>
              </FormLabel>
              <RadioGroup name="mode" value={mode} onChange={onChangeHandler}>
                <FormControlLabel
                  value="chat"
                  control={
                    <Radio
                      color="secondary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontSize={20}
                      color={"primary.main"}
                    >
                      Chat Only
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="voice"
                  control={
                    <Radio
                      color="secondary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontSize={20}
                      color={"primary.main"}
                    >
                      Voice Call Only
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="video"
                  control={
                    <Radio
                      color="secondary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontSize={20}
                      color={"primary.main"}
                    >
                      Video Call
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="in-person"
                  control={
                    <Radio
                      color="secondary"
                      sx={{
                        "& .MuiSvgIcon-root": {
                          fontSize: 40,
                        },
                      }}
                    />
                  }
                  label={
                    <Typography
                      variant="body2"
                      fontSize={20}
                      color={"primary.main"}
                    >
                      In Person
                    </Typography>
                  }
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={6}>
              <FormLabel>
                <Typography
                  variant="h5"
                  fontSize={24}
                  color={"primary.main"}
                  gutterBottom
                >
                  Date & Time
                </Typography>
              </FormLabel>
              <DateAndTime slot={slot} setSlot={setSlot} />
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

export default MeetingModal;
