import { useState, useEffect } from "react";

import axios from "axios";
import { HashLink } from "react-router-hash-link";

import { Box, Button, ButtonGroup, Chip, Container, Grow, Typography } from "@mui/material";

function Me() {

    // =========================================================================================== USE STATE
    const [personal, setPersonal] = useState([]);
    const [platform, setPlatform] = useState([]);
    const [inPersonal, setInPersonal] = useState(false);

    // =========================================================================================== USE EFFECT
    useEffect(() => {

        const readPersonalInfo = async () => {
            try {
                const response = await axios.get("/api/info/personal");
                if (response) {
                    setPersonal(response.data);
                    setInPersonal(true);
                    return response;
                }
            } catch (error) {
                console.log(error);
            }
        }
        readPersonalInfo();
        const readPlatformInfo = async () => {
            try {
                const response = await axios.get("/api/info/platform");
                if (response) {
                    setPlatform(response.data);
                    return response;
                }
            } catch (error) {
                console.log(error);
            }
        }
        readPlatformInfo();

    }, [])

    return (
        <Container disableGutters maxWidth="xxl" className="waveContainer topContainer">
            <Container id="me" className="viewportContainer" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{ pt: 5 }}>
                    <center>
                        {
                            (personal.length && platform.length)
                                ? personal.map((info, index) => {
                                    return <Grow in={inPersonal} key={index}>
                                        <Box>
                                            <Typography color="secondary" variant="h2">Hi, My name is {info.name}</Typography>
                                            <Typography color="secondary" variant="h5" gutterBottom>I'm a {
                                                info.profession.map((item, index) => {
                                                    if (index === 0) {
                                                        return item;
                                                    } else if (index === (info.profession.length - 1)) {
                                                        return ` & ${item}`;
                                                    } else {
                                                        return `, ${item}`;
                                                    }
                                                })
                                            }
                                            </Typography>
                                            <Typography color="secondary" variant="subtitle2" gutterBottom>Developing For</Typography>
                                            {
                                                platform.map((item, index) => {
                                                    return <Chip color="primary" sx={{ mr: 1, mb: 2 }} key={index} label={item.platformName} />
                                                })
                                            }
                                        </Box>
                                    </Grow>

                                })
                                : null
                        }
                        <Grow in={inPersonal}>
                            <ButtonGroup variant="contained" color="secondary">
                                <Button><HashLink smooth to="/#portfolio">See My Work</HashLink></Button>
                                <Button><HashLink smooth to="/#contact">Connect With Me</HashLink></Button>
                            </ButtonGroup>
                        </Grow>
                    </center>
                    <center>
                        <img src="assets/coder.gif" alt="coder" width="75%" />
                    </center>
                </Box>
            </Container>
        </Container >
    )
}

export default Me;