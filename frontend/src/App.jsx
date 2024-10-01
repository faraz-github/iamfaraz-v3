// Global CSS
import "./styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider as MUIThemeProvider,
} from "@mui/material";
import { lightTheme, darkTheme } from "./MUI/theme";

// Contexts
import { AdminProvider } from "./contexts/adminContext";
import { LoadingProvider } from "./contexts/loadingContext";
import { ThemeProvider, useColorTheme } from "./contexts/themeContext";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ResendVerification from "./pages/ResendVerification";
import PendingApproval from "./pages/PendingApproval";
import AboutMe from "./pages/AboutMe";

// Components
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader";
import FooterSection from "./components/FooterSection";

function AppContent() {
  const { theme } = useColorTheme();

  return (
    <MUIThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          body: {
            backgroundColor:
              theme === "light"
                ? lightTheme.palette.background.default
                : darkTheme.palette.background.default,
          },
        }}
      />
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
            <Route path="/aboutme" element={<AboutMe />} />
          </Routes>
          <FooterSection />
          <Loader />
          <ToastContainer theme="colored" />
        </LoadingProvider>
      </AdminProvider>
    </MUIThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
