//# Lacci 
//Parisienne, Barlow
import { createMuiTheme } from '@material-ui/core/styles';

const font = "'Nunito Sans', sans-serif";

export const customeTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#16253f",
            dark: "#111f38"
        },
        light: {
          main:"#f3efeb"
        },
    },
    typography: {
      fontFamily: font,
      
      h1:{
        fontSize: "2rem",
        fontWeight: 600,
        letterSpacing: "0.05rem"
      },
      h2: {
        fontSize: "2.2rem"
      },
      subtitle2: {
        fontSize: "1rem",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "0.05rem"
      }
    },
});



