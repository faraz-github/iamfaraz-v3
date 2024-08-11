// React
import { useState, useEffect } from "react";

// External Libraries
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

// MUI - Components
import { Box, Button, Container, Paper, Stack, TextField, Typography } from '@mui/material';

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

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
        password: ""
    });
    const { email, password } = formData;

    // =========================================================================================== ON CHANGE
    const onChangeHandler = (event) => {
        setFormData((prevState) => (
            {
                ...prevState,
                [event.target.name]: event.target.value
            }
        ));
    }

    // =========================================================================================== ON SUBMIT
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const loginData = {
            email: email,
            password: password
        }
        const response = await loginAdmin(loginData);
        if (response) {
            localStorage.setItem("admin", JSON.stringify(response.data.token));

            setToken(JSON.parse(localStorage.getItem("admin")));
        }
    }

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
    }


    // =========================================================================================== RENDER
    return (
        <Container disableGutters className="viewportContainer" sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

            <Box>

                <Paper elevation={3} sx={{
                    p: 2,
                    mb: 2,
                    minWidth: "300px",
                }}>

                    <Typography variant="h5" gutterBottom>Login</Typography>
                    <form onSubmit={onSubmitHandler}>
                        <Stack spacing={1}>
                            <TextField size="small" color="secondary" variant="outlined" type="email" label="Email"
                                name="email"
                                value={email}
                                onChange={onChangeHandler}
                                required
                            />
                            <TextField size="small" color="secondary" variant="outlined" type="password" label="Password"
                                name="password"
                                value={password}
                                onChange={onChangeHandler}
                                required
                            />
                            <Button color="secondary" variant="contained" type="submit">Login</Button>
                        </Stack>
                    </form>
                </Paper>
            </Box>
        </Container>
    )
}
// =========================================================================================== EXPORT
export default Login;