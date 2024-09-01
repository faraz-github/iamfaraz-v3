import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
    shape:{
        borderRadius: 2
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
            paper: "#FFFFFF"
        },
        custom:{
            sectionHeadingColor: "#70838A",
        }
    },
    typography: {
        h1:{
            fontFamily: "Lancelot",
            fontWeight: 400,
        },
        h2:{
            fontFamily: "Alumni Sans",
            fontWeight: 400,
        },
        h3:{
            fontFamily: "Alumni Sans",
            fontWeight: 700,
        },
        h5:{
            fontFamily: "Alumni Sans",
            fontWeight: 500,
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
        borderRadius: 2
    },
    palette: {
        mode:"dark",
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
            paper: "#5C5C5C"
        },
        custom:{
            sectionHeadingColor: "#70838A",
        }
    },
    typography: {
        h1:{
            fontFamily: "Lancelot",
            fontWeight: 400,
        },
        h2:{
            fontFamily: "Alumni Sans",
            fontWeight: 400,
        },
        h3:{
            fontFamily: "Alumni Sans",
            fontWeight: 700,
        },
        h5:{
            fontFamily: "Alumni Sans",
            fontWeight: 500,
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