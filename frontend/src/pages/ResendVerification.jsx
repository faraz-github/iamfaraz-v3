import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Box, Button, Container, Typography } from "@mui/material";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";


function ResendVerification() {

    const navigate = useNavigate();
    const { admin, token } = useAdmin();
    const { setOpenLoading } = useLoading();

    // =========================================================================================== USE EFFECT
    useEffect(() => {
        if (!token || (admin && admin.verified)) navigate("/login");
    }, [admin, token, navigate]);

    const resendEmail = async () => {
        setOpenLoading(true);
        try {
            const info = await axios.post("/api/admin/resend", { token: token }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (info) {
                console.log({info});
                setOpenLoading(false);
                console.log("Email Sent, please check your inbox"); //Debug Log
                toast.success("Email Sent, please check your inbox");
            }
        } catch (error) {
            setOpenLoading(false);
            console.log(error);
        }
    }

    return (
        <Container className="viewportContainer" sx={{ display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid orange" }}>
            <Box>
                <Typography variant="h2" color="secondary">Email Verification</Typography>
                <Typography variant="h6" gutterBottom>You have not verified your email, please verify using the email confirmation link in your inbox.</Typography>
                <Button variant="contained" color="secondary" onClick={resendEmail}>Resend</Button>
            </Box>
        </Container>
    )


}



export default ResendVerification;