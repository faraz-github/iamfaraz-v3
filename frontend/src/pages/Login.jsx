// React
import { useState, useEffect } from "react";

// External Libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// MUI - Components
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";
import SectionBox from "../components/ui/SectionBox";
import LayoutContainer from "../components/ui/LayoutContainer";
import { Link } from "react-router-dom";

// =========================================================================================== MAIN FUNCTION
function Login() {
  const navigate = useNavigate();
  const { admin, setToken } = useAdmin();
  const { setOpenLoading } = useLoading();

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (admin) navigate("/dashboard");
  }, [admin, navigate]);

  // =========================================================================================== USE STATE
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

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
    const loginData = {
      email: email,
      password: password,
    };
    const response = await loginAdmin(loginData);
    if (response) {
      localStorage.setItem("admin", JSON.stringify(response.data.token));

      setToken(JSON.parse(localStorage.getItem("admin")));
    }
  };

  // =========================================================================================== API
  const loginAdmin = async (loginData) => {
    setOpenLoading(true);
    try {
      const response = await axios.post("/api/admin/login", loginData);
      if (response) {
        setOpenLoading(false);
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

  // =========================================================================================== RENDER
  return (
    <SectionBox id="login" halfScreenHeight>
      <LayoutContainer>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          pt={20}
        >
          <Paper
            variant="outlined"
            sx={{
              p: 5,
              minWidth: "400px"
            }}
          >
            <Typography variant="h5" fontSize={32} gutterBottom>
              Login
            </Typography>
            <form onSubmit={onSubmitHandler}>
              <Stack spacing={1}>
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="email"
                  label="Email"
                  name="email"
                  value={email}
                  onChange={onChangeHandler}
                  required
                />
                <TextField
                  size="small"
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  type="password"
                  label="Password"
                  name="password"
                  value={password}
                  onChange={onChangeHandler}
                  required
                />
                <Button
                  disableElevation
                  color="secondary"
                  variant="contained"
                  type="submit"
                  endIcon={<LoginIcon />}
                >
                  <Typography variant="h5" fontSize={24}>
                    Login
                  </Typography>
                </Button>
                <Box>
                  <Typography
                    variant="body2"
                    fontSize={16}
                    color={"primary.light"}
                    sx={{ display: "inline-block", mr: 1 }}
                  >
                    Do not have an account?
                  </Typography>
                  <Typography
                    component={Link}
                    to={"/register"}
                    variant="body2"
                    fontSize={16}
                    color={"secondary.main"}
                  >
                    Register
                  </Typography>
                </Box>
              </Stack>
            </form>
          </Paper>
        </Box>
      </LayoutContainer>
    </SectionBox>
  );
}
// =========================================================================================== EXPORT
export default Login;
