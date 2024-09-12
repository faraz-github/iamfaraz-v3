import { useState, useEffect } from "react";

import { Container, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { useNavigate } from "react-router-dom";

import { useAdmin } from "../contexts/adminContext";

// Components
import AdminDetails from "../components/Dashboard/AdminDetails";
import PersonalDetails from "../components/Dashboard/PersonalDetails";
import ContactDetails from "../components/Dashboard/ContactDetails";
import PlatformDetails from "../components/PlatformDetails";
import ToolDetails from "../components/ToolDetails";
import PortfolioDetails from "../components/PortfolioDetails";
import ClientDetails from "../components/ClientDetails";

function Dashboard() {
  const navigate = useNavigate();
  const { admin } = useAdmin();

  // =========================================================================================== USE EFFECT
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else if (admin) {
      if (!admin.verified) {
        navigate("/resend");
      } else if (admin.role === "pending") {
        navigate("/pending");
      }
    }
  }, [admin, navigate]);

  // =========================================================================================== USE STATE
  const [manager, setManager] = useState("personal");
  const handleManager = (event, newValue) => {
    if (newValue !== null) {
      setManager(newValue);
    }
  };
  //------------------------------------------------------------------------------------------- Render Helper
  const renderManagerCard = () => {
    switch (manager) {
      case "admin":
        return <AdminDetails />;

      case "personal":
        return <PersonalDetails />;

      case "contact":
        return <ContactDetails />;

      case "platform":
        return <PlatformDetails />;

      case "tool":
        return <ToolDetails />;

      case "portfolio":
        return <PortfolioDetails />;

      case "client":
        return <ClientDetails />;

      default:
        console.log(manager);
    }
  };

  // =========================================================================================== RENDER
  return (
    <Container className="viewportContainer">
      <center>
        <ToggleButtonGroup
          value={manager}
          exclusive
          onChange={handleManager}
          sx={{ my: 1 }}
        >
          {admin && admin.role === "superAdmin" && (
            <ToggleButton value="admin">Admin</ToggleButton>
          )}

          <ToggleButton value="personal">Personal</ToggleButton>
          <ToggleButton value="contact">Contact</ToggleButton>
          <ToggleButton value="platform">Platform</ToggleButton>
          <ToggleButton value="tool">Tool</ToggleButton>
          <ToggleButton value="portfolio">Portfolio</ToggleButton>
          <ToggleButton value="client">Client</ToggleButton>
        </ToggleButtonGroup>
      </center>
      {renderManagerCard()}
    </Container>
  );
}

export default Dashboard;
