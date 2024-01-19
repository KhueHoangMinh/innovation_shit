import { createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
          main: '#556cd6',
        },
        secondary: {
          main: '#f5f5f5',
        },
        error: {
          main: red.A400,
        },
    }
})

export default theme