import React from 'react';
//Redux
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
//Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
//Custom
import {useForm} from "../../hooks/useForm";
//Action
import { startRegister } from '../../redux/actions/auth';
//Swal
import Swal from 'sweetalert2'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © Laccy '}  
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.light.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  link: {
    "&:hover": {
      cursor: "pointer"
    }
  }
}));

export default function Register() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [ formValues, handleInputChange ] = useForm({
    name: "",
    email: "",
    password: "",
    password2: ""
  })

  const {name, email, password, password2} = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if(password.length > 6) return Swal.fire({ text: "The password must be at least 6 characters" })

    if(password !== password2) {
      Swal.fire({
        text: "Passwords don't match"
      })
    } else{
      dispatch( startRegister( email, password, name))
    }

    
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} >
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Name"
                autoFocus
                value={name}
                onChange={handleInputChange}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password2"
                label="Repet Password"
                type="password"
                id="password2"
                autoComplete="current-password"
                value={password2}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link className={classes.link} onClick={() => history.push("/login")} variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}