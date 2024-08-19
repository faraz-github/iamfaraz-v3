import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Container, Typography } from "@mui/material";

import { useAdmin } from "../contexts/adminContext";

function PendingApproval() {
  const navigate = useNavigate();
  const { admin, token } = useAdmin();

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (!token || (admin && admin.role === "admin")) navigate("/login");
  }, [admin, token, navigate]);

  return (
    <Container
      className="viewportContainer"
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Box>
        <Typography variant="h2" color="secondary">
          Approval Pending 🔒
        </Typography>
        <Typography variant="h6" gutterBottom>
          Please hold on while we review your request to access the dashboard.
        </Typography>
      </Box>
    </Container>
  );
}

export default PendingApproval;
