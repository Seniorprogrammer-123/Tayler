import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {Alert, AlertTitle} from '@material-ui/lab';
import { LocalConvenienceStoreOutlined } from '@material-ui/icons';


function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            My Website
            {' '+ new Date().getFullYear()}
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
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


const LoginContainer = (props) => {
    const classes = useStyles();

    const [state, setState] = useState({
        isLoggedIn: false,
        error: '',
        formSubmitting: false,
        user: {
            email: '',
            password: '',
        },
        redirect: props.redirect,
    });

    const handleEmail = (e) => {
        let value = e.target.value;
        setState(prevState => ({
            user: {
                ...prevState.user, email: value
            }
        }));
    }

    const handlePassword = (e) => {
        let value = e.target.value;
        setState(prevState => ({
            user: {
                ...prevState.user, password: value
            }
        }));
    }

    useEffect(
        () => {
            let status = localStorage["appState"];
            if (status) {
                let AppState = JSON.parse(status);
                const { prevLocation } = { prevLocation: { pathname: '/home' } };
                if (prevLocation && state.isLoggedIn) {
                    return props.history.push(prevLocation);
                }
            }
        }, [state.isLoggedIn]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        setState({ formSubmitting: true });
        let userData = state.user;
        const token = document.querySelector('meta[name="csrf-token"]');
        axios.post("/api/login", userData, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': token.content
            }
        }).then(response => {
            return response;
        }).then(json => {
            if (json.data.success == true) {
                let userData = {
                    id: json.data.id,
                    name: json.data.name,
                    email: json.data.email,
                    access_token: json.data.access_token,
                    permission: json.data.permission,
                };

                let appState = {
                    isLoggedIn: true,
                    user: userData
                };
                localStorage["appState"] = JSON.stringify(appState);
                setState({
                    isLoggedIn: appState.isLoggedIn,
                    user: appState.user,
                    error: ''
                });
                location.href = "/home";
            }
            else {
                setState({
                    error: `Our System Failed To Register Your Account!`,
                    formSubmitting: false
                })
            }
        }).catch(error => {
            if (error.response) {
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                let err = error.response.data;
                setState({
                    error: err.message,
                    formSubmitting: false
                })
            }
            else if (error.request) {
                // The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
                let err = error.request;
                setState({
                    error: err,
                    formSubmitting: false
                })
            } else {
                // Something happened in setting up the request that triggered an Error
                let err = error.message;
                setState({
                    error: err,
                    formSubmitting: false
                })
            }
        }).finally(setState({ error: '' }));
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {state.error ?
            <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please enter email or password again.
            </Alert>
             : ''}
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
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
                        onChange={handleEmail}
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
                        onChange={handlePassword}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
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
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="/register" variant="body2">
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
export default LoginContainer;
