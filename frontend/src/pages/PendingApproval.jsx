import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Box, Stack, Typography } from "@mui/material";

import { useAdmin } from "../contexts/adminContext";

import SectionBox from "../components/ui/SectionBox";
import LayoutContainer from "../components/ui/LayoutContainer";

function PendingApproval() {
  const navigate = useNavigate();
  const { admin, token } = useAdmin();

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (!token || (admin && admin.role === "admin")) navigate("/login");
  }, [admin, token, navigate]);

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
              Approval Pending 🔒
            </Typography>
            <Typography variant="h6" gutterBottom>
              Please hold on while we review your request to access the
              dashboard.
            </Typography>
          </Stack>
        </Box>
      </LayoutContainer>
    </SectionBox>
  );
}

export default PendingApproval;
