import { GlobalStyles, createTheme } from "@mui/material";
import { red } from "@mui/material/colors";

const CustomStyle = <GlobalStyles styles={{
  scrollbarwidth: 'thin',
  scrollbarcolor: '#b7b7b7 transparent',
  '&::-webkit-scrollbar': {
    width: 6,
    height: 6,
    backgroundcolor: 'transparent',
  },
  '&::-webkit-scrollbar-track': {
    backgroundcolor: 'transparent',
  },
  '&::-webkit-scrollbar-thumb': {
    borderradius: 6,
    backgroundcolor: '#b7b7b7',
    minheight: 24,
    minwidth: 24,
  },
  '&::-webkit-scrollbar-thumb:focus': {
    backgroundcolor: '#f00',
  },
  '&::-webkit-scrollbar-thumb:active': {
    backgroundcolor: '#adadad',
  },
  '&::-webkit-scrollbar-thumb:hover': {
    backgroundcolor: '#f00',
  },
  '&::-webkit-scrollbar-corner': {
    backgroundcolor: 'transparent',
  },
}}/>

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
export {CustomStyle}