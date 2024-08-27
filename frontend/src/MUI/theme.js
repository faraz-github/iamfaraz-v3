import { createTheme } from "@mui/material";

// TODO add pallete for light and dark mode

export const theme = createTheme({
    shape:{
        borderRadius: 10
    },
    palette: {
        primary: {
            main: "#252525",
            light: "#505050",
            dark: "#191919"
        },
        secondary: {
            main: "#F35E3E",
            light: "#f57e64",
            dark: "#aa412b"
        },
        background: {
            paper: "#F7F7F7"
        }
    },
    typography: {
        fontFamily: "'Lancelot', 'Alumni Sans', Quicksand','Roboto','Helvetica','Arial',sans-serif",
        h2:{
            fontFamily: "Alumni Sans",
            fontWeight: 400,
        },
        body2:{
            fontFamily: "Lancelot",
            fontWeight: 400,
        },
        button: {
            textTransform: "none"
        }
    }
});