import { useState, useEffect } from "react";

import axios from "axios";

import { Box, Chip, Container, Divider, IconButton, Tooltip, Typography } from "@mui/material";
import EmailTwoToneIcon from '@mui/icons-material/EmailTwoTone';
import PhoneIphoneTwoToneIcon from '@mui/icons-material/PhoneIphoneTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RedditIcon from '@mui/icons-material/Reddit';
import YouTubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GitHubIcon from '@mui/icons-material/GitHub';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

function Contact() {

    // =========================================================================================== USE STATE
    const [contact, setContact] = useState([]);

    // =========================================================================================== USE EFFECT
    useEffect(() => {

        const readContactInfo = async () => {
            try {
                const response = await axios.get("/api/info/contact");
                if (response) {
                    setContact(response.data);
                    return response;
                }
            } catch (error) {
                console.log(error);
            }
        }
        readContactInfo();

    }, [])

    const renderSocialIcon = (platformName) => {
        switch (platformName) {
            case "Facebook":
                return <FacebookIcon fontSize="inherit" />
            case "Twitter":
                return <TwitterIcon fontSize="inherit" />
            case "Instagram":
                return <InstagramIcon fontSize="inherit" />
            case "LinkedIn":
                return <LinkedInIcon fontSize="inherit" />
            case "Pinterest":
                return <PinterestIcon fontSize="inherit" />
            case "Reddit":
                return <RedditIcon fontSize="inherit" />
            case "YouTube":
                return <YouTubeIcon fontSize="inherit" />
            case "WhatsApp":
                return <WhatsAppIcon fontSize="inherit" />
            case "GitHub":
                return <GitHubIcon fontSize="inherit" />
            default:
                return <CheckBoxOutlineBlankIcon fontSize="inherit" />
        }
    }

    return (
        <Container disableGutters maxWidth="xxl" className="waveContainer bottomContainer">
            <Container id="contact" className="viewportContainer" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{ py: 5 }}>
                    <center>
                        <Typography color="secondary" variant="h2">Contact</Typography>
                        <Divider>
                            <Chip color="secondary" label="me" />
                        </Divider>
                        {
                            contact.length
                                ? contact.map((info, index) => {
                                    return <Box key={index}>
                                        <Box sx={{ pt: 5 }}>
                                            <EmailTwoToneIcon color="secondary" fontSize="large" />
                                            <Typography color="secondary" variant="h6">{info.email}</Typography>
                                        </Box>
                                        <Box sx={{ pt: 5 }}>
                                            <PhoneIphoneTwoToneIcon color="secondary" fontSize="large" />
                                            <Typography color="secondary" variant="h6">{info.phone}</Typography>
                                        </Box>
                                        <Box sx={{ py: 5 }}>
                                            <HomeTwoToneIcon color="secondary" fontSize="large" />
                                            <Typography color="secondary" variant="h6">{info.address}</Typography>
                                        </Box>
                                        {
                                            info.social.length
                                                ? info.social.map((info, index) => {
                                                    return <Tooltip key={index} title={info.platformName}>
                                                        <IconButton color="secondary" size="large" href={`${info.baseURL}${info.username}`}>
                                                            {
                                                                renderSocialIcon(info.platformName)
                                                            }
                                                        </IconButton>
                                                    </Tooltip>
                                                })
                                                : null
                                        }
                                    </Box>
                                })
                                : null
                        }
                    </center>
                </Box>
            </Container>
        </Container >
    )
}

export default Contact;