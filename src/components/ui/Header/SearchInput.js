import React, {useState} from 'react';
//Redux
import { useHistory } from 'react-router-dom';
//Material UI
import { makeStyles } from '@material-ui/core/styles';
import {Box, InputBase, Popover } from "@material-ui/core";
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';



const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },

  input: {
    marginLeft: theme.spacing(1),
    flex: 1
  },
  boxSearch: {
    display: "flex",
    alignItems: "center",
    width: "100%"
  },
  form: {
    display: "flex",
    justifyItems: "space-between",
    alignItems: "center",
    width: "100%"
  },
  navIcons: {
    padding: "0 8px",
    color: "#16253f",
    "&:hover": {
      cursor: "pointer"
    }
  },
}));

export default function SearchInput() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [searchInput, setSearchInput] = useState(null);

    const handleInputChange = (e) => {
      console.log(e.target.value)
      setSearchInput(e.target.value);
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("item-to-search", searchInput);
    setAnchorEl(null)
    history.push(`/search?product=${searchInput}`);
  };

  return (
    <div>
      <SearchOutlinedIcon  aria-describedby={id} className={classes.navIcons} onClick={handleClick}/>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >


        <Box className={classes.boxSearch}>
            <form className={classes.form} onSubmit={(e) => handleSubmit(e)}>
            <InputBase
                className={classes.input}
                placeholder="Search Product"
                inputProps={{ "aria-label": "search google maps" }}
                onChange={(e) => handleInputChange(e)}
            />
            </form>
        </Box>


      </Popover>
    </div>
  );
}
