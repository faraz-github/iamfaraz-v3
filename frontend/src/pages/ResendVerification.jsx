import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import { Box, Button, Stack, Typography } from "@mui/material";

import { useAdmin } from "../contexts/adminContext";
import { useLoading } from "../contexts/loadingContext";

import SectionBox from "../components/ui/SectionBox";
import LayoutContainer from "../components/ui/LayoutContainer";

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
      const info = await axios.post(
        "/api/admin/resend",
        { token: token },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (info) {
        console.log({ info });
        setOpenLoading(false);
        console.log("Email Sent, please check your inbox"); //Debug Log
        toast.success("Email Sent, please check your inbox");
      }
    } catch (error) {
      setOpenLoading(false);
      console.log(error);
    }
  };

  return (
    <SectionBox>
      <LayoutContainer>
        <Box
          minHeight={"80vh"}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Stack>
            <Typography variant="h2" color="secondary">
              Email Verification
            </Typography>
            <Typography variant="h6" gutterBottom>
              You have not verified your email, please verify using the email
              confirmation link in your inbox.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              onClick={resendEmail}
            >
              <Typography variant="h5">Resend</Typography>
            </Button>
          </Stack>
        </Box>
      </LayoutContainer>
    </SectionBox>
  );
}

export default ResendVerification;
