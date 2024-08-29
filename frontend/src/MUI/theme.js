import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    shape:{
        borderRadius: 10
    },
    palette: {
        mode:"light",
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
            default: "#f5f5f5", // darkTheme | primary.dark
            paper: "#fafafa"
        }
    },
    typography: {
        fontFamily: "'Lancelot', 'Alumni Sans', Quicksand','Roboto','Helvetica','Arial',sans-serif",
        h2:{
            fontFamily: "Alumni Sans",
            fontWeight: 400,
        },
        h6:{
            fontFamily: "Lancelot",
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

export const darkTheme = createTheme({
    shape:{
        borderRadius: 10
    },
    palette: {
        mode:"light",
        primary: {
            main: "#FFFFFF",
            light: "#ffffff",
            dark: "#f5f5f5"
        },
        secondary: {
            main: "#F35E3E",
            light: "#f57e64",
            dark: "#aa412b"
        },
        background: {
            default: "#191919", // lightTheme | primary.dark
            paper: "#fafafa"
        }
    },
    typography: {
        fontFamily: "'Lancelot', 'Alumni Sans', Quicksand','Roboto','Helvetica','Arial',sans-serif",
        h2:{
            fontFamily: "Alumni Sans",
            fontWeight: 400,
        },
        h6:{
            fontFamily: "Lancelot",
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