import { AppBar, Box, Container, Typography } from "@mui/material";

function Footer() {

    const currentYear = new Date().getFullYear();

    return (
        <Box sx={{ flexGrow: 1 }} >
            <AppBar position="static">
                <Container>
                    <Typography gutterBottom textAlign="center">Copyright © Faraz Ahmad {currentYear}</Typography>
                </Container>
            </AppBar>
        </Box>
    )
}

export default Footer;