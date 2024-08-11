import { useState, useEffect } from "react";

import axios from "axios";

import { Box, Button, ButtonGroup, Chip, Container, Divider, Paper, Typography } from "@mui/material";
import Masonry from '@mui/lab/Masonry';
import LaunchIcon from '@mui/icons-material/Launch';
import CodeIcon from '@mui/icons-material/Code';


function Portfolio() {

    // =========================================================================================== USE STATE
    const [portfolio, setPortfolio] = useState([]);

    // =========================================================================================== USE EFFECT
    useEffect(() => {

        const readPortfolioInfo = async () => {
            try {
                const response = await axios.get("/api/info/portfolio");
                if (response) {
                    setPortfolio(response.data);
                    return response;
                }
            } catch (error) {
                console.log(error);
            }
        }
        readPortfolioInfo();

    }, [])

    return (
        <Container disableGutters maxWidth="xxl" className="waveContainer middleContainer">
            <Container id="portfolio" className="viewportContainer" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{ minWidth: "90%", py: 5, px: 2 }}>
                    <center>
                        <Typography color="secondary" variant="h2">Portfolio</Typography>
                        <Divider sx={{ pb: 5 }}>
                            <Chip color="secondary" label="things that i made" />
                        </Divider>
                        {
                            portfolio.length
                                ? <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={1}>
                                    {
                                        portfolio.map((info, index) => {
                                            return <Paper elevation={3} sx={{ p: 1 }} key={index}>
                                                <img src={info.picture} width="100%" alt="software-tool" />
                                                <Box>
                                                    <Chip color="primary" label={info.name} />
                                                </Box>
                                                <Typography>{info.description}</Typography>
                                                <Paper variant="outlined" sx={{ pl: 1, pt: 1, mb: 1 }}>
                                                    {
                                                        info.stack.map((item, index) => {
                                                            return <Chip sx={{ mr: 1, mb: 1 }} size="small" key={index} label={item} />
                                                        })
                                                    }
                                                </Paper>
                                                <ButtonGroup fullWidth variant="contained" color="secondary">
                                                    <Button endIcon={<LaunchIcon />} href={info.link}>
                                                        Visit
                                                    </Button>
                                                    <Button endIcon={<CodeIcon />} href={info.source}>
                                                        Code
                                                    </Button>
                                                </ButtonGroup>

                                            </Paper>
                                        })
                                    }
                                </Masonry>
                                : null
                        }
                    </center>
                </Box>
            </Container>
        </Container >
    )
}

export default Portfolio;