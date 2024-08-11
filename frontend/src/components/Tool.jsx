import { useState, useEffect } from "react";

import axios from "axios";

import { Box, Button, Chip, Container, Divider, Paper, Stack, Tooltip, Typography } from "@mui/material";
import Masonry from '@mui/lab/Masonry';

function Tool() {

    // =========================================================================================== USE STATE
    const [tool, setTool] = useState([]);

    // =========================================================================================== USE EFFECT
    useEffect(() => {

        const readToolInfo = async () => {
            try {
                const response = await axios.get("/api/info/tool");
                if (response) {
                    setTool(response.data);
                    return response;
                }
            } catch (error) {
                console.log(error);
            }
        }
        readToolInfo();

    }, [])

    return (
        <Container disableGutters maxWidth="xxl" className="waveContainer middleContainer">
            <Container id="tool" className="viewportContainer" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Box sx={{ minWidth: "90%", py: 5, px: 2}}>
                    <center>
                        <Typography color="secondary" variant="h2">Tools</Typography>
                        <Divider sx={{ pb: 5 }}>
                            <Chip color="secondary" label="that i use" />
                        </Divider>

                        {
                            tool.length
                                ? <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4 }} spacing={1}>
                                    {
                                        tool.map((info, index) => {
                                            return <Paper elevation={3} sx={{ p: 1 }} key={index}>
                                                <Stack sx={{ pb: 1 }} direction="row" spacing={1}>
                                                    <img src={info.icon} width="100px" alt="software-tool" />
                                                    <Stack spacing={1}>
                                                        <Tooltip title={info.type} placement="top">
                                                            <Chip color="primary" label={info.name} />
                                                        </Tooltip>
                                                        <Typography variant="caption">{info.description}</Typography>
                                                    </Stack>
                                                </Stack>
                                                <Button variant="outlined" color="secondary" fullWidth href={info.link}>
                                                    Read About {info.name}
                                                </Button>
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

export default Tool;