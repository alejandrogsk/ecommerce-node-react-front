import React from 'react';
//Custom Hook
import { useForm } from '../../hooks/useForm';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Router
import { useHistory } from 'react-router-dom';
//Material UI
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
//Actions
import { startLogin } from '../../redux/actions/auth';



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
    width: '100%', 
    marginTop: theme.spacing(1),
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

export default function Login() {
  const classes = useStyles();
  const { uid } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const history = useHistory()

  const [ formValues, handleInputChange] = useForm({
    email: "",
    password: ""
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault()
    dispatch( startLogin( email, password) )
    if(uid === true) return history.push('/')
  }


  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleLogin}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={ handleInputChange }
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={ handleInputChange }
          />
         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link className={classes.link} onClick={() => history.push("/register")} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}


