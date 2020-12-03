import React, {useEffect, useState} from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import VpnKeyOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import projectTeamIcon from "../../images/projectTeamIcon.png";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import CircularProgress from "@material-ui/core/CircularProgress";
import green from "@material-ui/core/colors/green";
import FormHelperText from "@material-ui/core/FormHelperText";
import {auth, checkIfAuthenticated} from "./Util";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
    parent: {
        padding: theme.spacing(8),
    },
    root_hash: {
        padding: theme.spacing(6),
    },
    child_hash: {
        padding: theme.spacing(2),
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
}));

export const LoginView = (props) => {
    const classes = useStyles();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false)
    const [accessibilityProps, setAccessibilityProps] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState({})
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }
    const handleUsernameChange = (event) => {
        setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const ACCESSIBILITY_PROPS = {
        'aria-busy': true,
        'aria-describedby': 'fake-feed-loading-progress',
    };

    const loginUser = (event) => {
        event.preventDefault()
        if(username === "") {
            setError({
                userError: {error: true},
                errorMessage: "Username/email required"
            })
            return null
        }
        if(password === "") {
            setError({
                passError: {error: true},
                errorMessage: "password required"
            })
            return null
        }
        setIsLoading((isLoading) => !isLoading);
        setAccessibilityProps(ACCESSIBILITY_PROPS)
        console.log(username, password, isLoading, accessibilityProps);
        auth(username, password, setError).then( () => {
            setTimeout(()=> {
                setIsLoading(true)
            }, 1000)
            console.log("authenticated")
            if(checkIfAuthenticated()) {
                console.log("redirected")
                props.history.push("/home")
            }
        })
    }

    useEffect(() => {
        if(checkIfAuthenticated()) {
            props.history.push("/home")
        }
    })


    const passwordComponent = () => {
        return (
            <FormControl fullWidth {...error.passError}>
                <InputLabel required={true} htmlFor="standard-adornment-password">Password</InputLabel>
                <Input required={true} id="standard-adornment-password"
                       type={showPassword ? 'text' : 'password'}
                       value={password} onChange={handlePasswordChange}
                       endAdornment={
                           <InputAdornment position="end">
                               <IconButton aria-label="toggle password visibility"
                                           onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword}>
                                   {showPassword ? <Visibility /> : <VisibilityOff />}
                               </IconButton>
                           </InputAdornment>
                       }
                />
                {error.passError && <FormHelperText id="component-error-text">{error.errorMessage}</FormHelperText>}
            </FormControl>
        )
    }
    return (
        <div className={classes.parent}>
            <Grid container direction="row" justify="center" alignItems="baseline" style={{minHeight: "100%"}}>
                <Grid item sm={6} xs={6}>
                    <Paper >
                    <Grid container direction="row" justify="center" alignItems="center">
                        <Grid item xs={8} sm={4}>
                            <Box bgcolor="primary.main" color="secondary.contrastText" p={2}>
                                <h2>Login</h2>
                                <h4>Get access to your projects hub and personal workspace</h4><br/>
                                <img src={projectTeamIcon} alt="Project Team icon" width={"100%"}/>
                            </Box>
                        </Grid>
                        <Grid item xs={8} sm={8}>
                            <form className={classes.child_hash} autoComplete="off" {...accessibilityProps}>
                                <div className={classes.child_hash}>
                                    <Grid container direction="row" justify="center" spacing={3}>
                                        <Grid className={classes.child_hash} container direction="row" justify="space-between" spacing={1}>
                                            <Grid item xs={12} sm={12}>
                                                <FormControl fullWidth {...error.userError}>
                                                    <InputLabel required htmlFor="standard-adornment-username">Enter username/email</InputLabel>
                                                    <Input id="standard-adornment-username" value={username} onChange={handleUsernameChange}/>
                                                    {error.userError && <FormHelperText id="component-error-text">{error.errorMessage}</FormHelperText>}
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={12}>
                                                {passwordComponent()}
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12} sm={12} >

                                            {isLoading ?
                                                <Button type={"submit"} onClick={loginUser} size="large" variant="contained" color="primary" fullWidth>
                                                    <VpnKeyOutlinedIcon /> &nbsp;Login
                                                </Button>:
                                                <Button size="large" variant="contained" disabled={true} fullWidth>
                                                    <VpnKeyOutlinedIcon /> &nbsp;Login
                                                    <CircularProgress size={24} className={classes.buttonProgress} />
                                                </Button>
                                            }
                                        </Grid>
                                    </Grid>
                                </div>
                            </form>
                        </Grid>
                    </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
}