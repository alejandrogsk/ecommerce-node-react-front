import * as React from "react";

//Router
import { Link, useHistory } from 'react-router-dom';

//Material ui
import {
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemText,
  Container,
  Hidden,
  Fab,
  Box,  
  makeStyles
} from "@material-ui/core";
import {  KeyboardArrowUp } from "@material-ui/icons";
/*Icons */
import LocalMallOutlinedIcon from '@material-ui/icons/LocalMallOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';

import SideDrawer from "./SideDrawer";
import HideOnScroll from "./HideOnScroll";
import BackToTopBtn from "../BackToTopBtn";

// redux 
import { useSelector, useDispatch } from "react-redux";
import { startLogout } from "../../../redux/actions/auth"

//Search Input Component
import SearchInput from "./SearchInput"

//Sweet Alert
import Swal from 'sweetalert2'

const useStyles = makeStyles({
  backgroundHeader: {
    backgroundColor: "white"
  },
  navDisplayFlex: {
    display: `flex`,
    justifyContent: `space-between`,
    alignItems:`center`
  },
  linkText: {
    textDecoration: `none`,
    textTransform: `uppercase`,
    color:"#16253f"
  },
  logo: {
    fontFamily: "'Parisienne', cursive",
    fontSize: "1.3rem",
    color:"#16253f",
    "&:hover": {
      cursor: "pointer"
    }
  },
  customeText: {
    '& span':{
      fontSize: "0.7rem",
      letterSpacing: "1.5px",
      opacity: 0.9,
      "&:hover &:active": {
        opacity: 1
      }
    }    
  },

  cartBox: {
    position: "relative",
    "&:hover": {
      cursor: "pointer"
    }
  },
  navIcons: {
    padding: "0 8px",
    color: "#16253f",
    "&:hover": {
      cursor: "pointer"
    }
  },
  cartCircle: {
    alignItems: "center",
    borderRadius: "100%",
    backgroundColor: "#f6c34a",
    display:"flex",
    height: "15px",
    justifyContent: "center",
    position: "absolute",
    right: "0px",
    top: "-6px",
    width: "15px"
  },
  cartCircleSpan: {
    color: "white",
    fontFamily: "primary",
    fontSize: "10px",
  }
});

const navLinks = [
  { title: `home`, path: `/` },
  { title: `watches`, path: `/category/watches` },
  { title: `handbags`, path: `/category/handbag` },
  { title: `sunglasses`, path: `/category/sunglasses` },
];

const Header = () => {
  const classes = useStyles();

  //redux
    const { products } = useSelector(state => state.cart)
    const { uid } = useSelector(state => state.auth)
    const dispatch = useDispatch();
  //

  const history = useHistory();

  const logoLink = () => {history.push('/')}
  const cartLink = () => {history.push('/cart')}
  const logLink = () => {

    if( !!uid === true) {
      Swal
      .fire({
          text: "Do you want to close session?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: "Yes",
          cancelButtonText: "No",
      })
      .then(resultado => {
          if (resultado.value) {
              // click Yes
              dispatch( startLogout() )
              history.push("/login");
          } else {
              // click No
              return
          }
      });
    } else {
      history.push('/login')
    }

  }

  //cart icon logic
    let cartNumberFunction = () => {
      let res = [];
      for(let i = 0; i < products.length; i++) {
        res.push(products[i].quantity)
      }
      let sumQuantity = res.reduce((a,b) => {
        return a + b;
      }, 0)
      return sumQuantity
    }

    let productCartNumber = cartNumberFunction()
  //



  return (
    <React.Fragment>
      <HideOnScroll>
        <AppBar position="fixed" >
          <Toolbar className={classes.backgroundHeader}>
            <Container maxWidth="lg" className={classes.navDisplayFlex}>
              <Box edge="start" color="inherit" aria-label="home" display="flex" alignSelf="center" mr="auto">
                <Box component="span" color="primary" className={classes.logo} onClick={logoLink}>
                  Laccy
                </Box>
              </Box >

              <Hidden smDown>
                <List
                  component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navDisplayFlex}
                  
                >
                  {navLinks.map(({ title, path }) => (
                    <Link to={path} key={title} className={classes.linkText}>
                      <ListItem button>
                        <ListItemText primary={title}  className={classes.customeText}/>
                      </ListItem>
                    </Link>
                  ))}
                </List>
              </Hidden>

              <List component="nav"
                  aria-labelledby="main navigation"
                  className={classes.navDisplayFlex}>
                <ListItem>
                  <SearchInput />

                  <Box className={classes.cartBox} onClick={cartLink}>
                    <LocalMallOutlinedIcon className={classes.navIcons} />
                    { 
                      productCartNumber > 0 && <div className={classes.cartCircle}><span className={classes.cartCircleSpan}>{productCartNumber}</span></div> 
                    }
                  </Box>

                  <Box>
                    <PersonOutlineOutlinedIcon className={classes.navIcons} onClick={logLink}/>
                  </Box>    
                </ListItem>
              </List>

              <Hidden mdUp>
                <SideDrawer navLinks={navLinks} />
              </Hidden>
            </Container>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar id="back-to-top-anchor" />

      <BackToTopBtn>
        <Fab color="primary" size="large" aria-label="scroll back to top">
          <KeyboardArrowUp />
        </Fab>
      </BackToTopBtn>
    </React.Fragment>
  );
};
export default Header;
