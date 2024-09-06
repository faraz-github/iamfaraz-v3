import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { Fab } from "@mui/material";

import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { useAdmin } from "../contexts/adminContext";

import HeroSection from "../components/HeroSection";
import ProjectSection from "../components/ProjectSection";
import CapabilitySection from "../components/CapabilitySection";
import Contact from "../components/Contact";
import Tool from "../components/Tool";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";
import SkillSection from "../components/SkillSection";

function Home() {

    const navigate = useNavigate();
    const { admin } = useAdmin();

    // Back to Top Button
    const [backToTop, setBackToTop] = useState(false);

    useEffect(() => {
        if (admin) navigate("/dashboard");

        window.onscroll = () => {
            if (window.scrollY === 0) {
                setBackToTop(false);
            } else {
                setBackToTop(true);
            }
        }

    }, [admin, navigate]);

    return (
        <>
            <HeroSection />
            <ProjectSection />
            <CapabilitySection />
            <SkillSection />
            <Tool />
            <Portfolio />
            <Contact />
            <Footer />
            {
                backToTop && <Fab onClick={() => window.scrollTo(0, 0)} sx={{
                    position: 'fixed',
                    bottom: 16,
                    right: 16
                }}>
                    <KeyboardArrowUpIcon />
                </Fab>
            }
        </>
    )
}

export default Home;