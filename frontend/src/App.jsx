// Global CSS
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material";
import { theme } from "./MUI/theme";

// Contexts
import { AdminProvider } from "./contexts/adminContext";
import { LoadingProvider } from "./contexts/loadingContext";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResendVerification from "./pages/ResendVerification";
import PendingApproval from "./pages/PendingApproval";

// Components
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AdminProvider>
        <LoadingProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resend" element={<ResendVerification />} />
            <Route path="/pending" element={<PendingApproval />} />
          </Routes>
          <Loader />
          <ToastContainer theme="colored" />
        </LoadingProvider>
      </AdminProvider>
    </ThemeProvider>
  );
}

export default App;
