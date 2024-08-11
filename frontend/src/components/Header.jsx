import { useLocation, useNavigate } from "react-router-dom";

import { AppBar, Box, Container, Button, Toolbar, Typography, IconButton } from '@mui/material';
import TerminalIcon from '@mui/icons-material/Terminal';

import Menu from "./Menu";

import { useAdmin } from "../contexts/adminContext";
import { useEffect } from "react";
import { useState } from "react";

export default function ButtonAppBar() {

    const location = useLocation();
    const navigate = useNavigate();
    const { token, setToken } = useAdmin();

    const [onTop, setOnTop] = useState(0);

    useEffect(() => {
        window.onscroll = () => {
            if (window.scrollY !== 0) {
                setOnTop(3);
            } else {
                setOnTop(0);
            }
        }
    })

    const renderVisitorHeader = () => {

        switch (location.pathname) {
            case "/":
                return <Toolbar>
                    <IconButton color="secondary" size="large" onClick={() => window.scrollTo(0, 0)}>
                        <TerminalIcon fontSize="inherit" />
                    </IconButton>
                    <div style={{ flexGrow: "1" }}></div>
                    <Menu />
                </Toolbar>
            case "/register":
                return <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Portfolio-Second
                    </Typography>
                    <Button variant='contained' onClick={() => navigate("/login")}>Login</Button>
                </Toolbar>
            case "/login":
                return <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Portfolio-Second
                    </Typography>
                    <Button variant='contained' onClick={() => navigate("/register")}>Register</Button>
                </Toolbar>
            default:
                console.log(location.pathname);
        }
    }

    const renderAdminHeader = () => {
        switch (location.pathname) {
            case "/dashboard":
                return <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Portfolio-Second
                    </Typography>
                    <Button variant='contained' onClick={logoutAdmin}>LogOut</Button>
                </Toolbar>
            case "/resend":
                return <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Portfolio-Second
                    </Typography>
                    <Button variant='contained' onClick={logoutAdmin}>LogOut</Button>
                </Toolbar>
            default:
                console.log(location.pathname);
        }
    }

    // =========================================================================================== LogOut
    const logoutAdmin = () => {
        localStorage.removeItem("admin");
        setToken(JSON.parse(localStorage.getItem("admin")));
    }

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="fixed" elevation={onTop}>
                <Container disableGutters>
                    {
                        token ? renderAdminHeader() : renderVisitorHeader()
                    }
                </Container>
            </AppBar>
            <Toolbar />
        </Box>
    );
}
