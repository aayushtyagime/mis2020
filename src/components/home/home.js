import React, {useEffect, useState} from "react"
import {checkIfAuthenticated} from "../login/Util";
import {Link, Route, Switch} from "react-router-dom";
import clsx from 'clsx';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import userImage from "../../images/user.png";
import Dashboard from "../dashboard/dashboard";
import DashboardSharpIcon from '@material-ui/icons/DashboardSharp';
import AddIcon from '@material-ui/icons/Add';
import projectDetailIcon from "../../images/projectDetailIcon.png"
import AssessmentIcon from '@material-ui/icons/Assessment';
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ThumbsUpDownSharpIcon from '@material-ui/icons/ThumbsUpDownSharp';
import PublishSharpIcon from '@material-ui/icons/PublishSharp';
import {UploadSheetsView} from "../uploadSheets";
import workInProgress from "../../images/WorkInProgress.png"


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        backgroundColor: "#e8eaf6"
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        backgroundColor: "#e8eaf6"
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    }
}));


export const Home = (props) => {

    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [userName, setUserName] = useState("")
    const [designation, setDesignation] = useState("")

    const iconMap = {
        Dashboard: <ListItemIcon><DashboardSharpIcon fontSize={"large"} style={{color: "#000"}}/></ListItemIcon>,
        "Upload sheet": <ListItemIcon><PublishSharpIcon fontSize={"large"} style={{color: "#000"}}/></ListItemIcon>,
        // "New Allocations": <ListItemIcon><AddIcon fontSize={"large"} style={{color: "#000"}} /></ListItemIcon>,
        // "Project Details": <ListItemAvatar>
        //     <img src={projectDetailIcon} alt={""} style={{height:"5vh"}} />
        //                         {/*<Avatar sizes={"small"} alt="Cindy Baker" src={projectDetailIcon} />*/}
        //                     </ListItemAvatar>,
        // "Disputed center": <ListItemAvatar><ThumbsUpDownSharpIcon fontSize={"large"} style={{color: "#000"}} /></ListItemAvatar>,
        // "QC Status": "",
        // "Mock Status":"",
        Reports: <ListItemIcon><AssessmentIcon fontSize={"large"} style={{color: "#000"}} /></ListItemIcon>
    }
    const links = ["/home", "/home/upload-sheet", "/home/new-allocation", "/home/project-details", "/home/disputed-center", "/home/reports"]

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    const logout = () => {
        setTimeout( () => {
            localStorage.removeItem('token');
            localStorage.removeItem('cookies');
            localStorage.removeItem('full_name');
            localStorage.removeItem('designation');
            window.location.replace("/");
        }, 1000
    )
    };
    useEffect(() => {
        if(!checkIfAuthenticated()) {
            props.history.push("/")
        } else {
            setUserName(localStorage.getItem("full_name"))
            switch (localStorage.getItem("designation")) {
                case "MIS":
                    setDesignation( "MIS user")
                    break;
                case "PM":
                    setDesignation("Program Manager")
                    break;
                case "ZM":
                    setDesignation("Zonal Manager")
                    break
                case "PC":
                    setDesignation("Project Coordinator")
                    break
                default:
                    setDesignation("Admin")
            }
        }
    }, [])

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={6} sm={6}>
                            <Grid container justify="flex-start" alignItems="center">
                                <Grid item xs={6} sm={1}>
                                    <IconButton color="inherit" aria-label="open drawer"
                                        onClick={handleDrawerOpen} edge="start"
                                        className={clsx(classes.menuButton, {
                                            [classes.hide]: open,
                                        })}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <Typography variant="h6" noWrap>
                                        MIS - Portal
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <Button onClick={logout} variant="outlined" color="inherit">
                                Logout
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div style={{paddingLeft: theme.spacing(1)}}>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item xs={6} sm={6}>
                            <Grid container justify="flex-start" alignItems="center" spacing={1}>
                                <Grid item xs={6} sm={4}>
                                    <img src={userImage} style={{width:"100%"}}  alt="user display profile"/>
                                </Grid>
                                <Grid item xs={6} sm={4}>
                                    <div style={{alignItems:"center"}}>

                                        <div>
                                            {userName}<br />
                                            {designation}
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} sm={1}>
                            <div className={classes.toolbar}>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </div>
                        </Grid>
                    </Grid>
                </div>

                <Divider />
                <List>
                    {Object.keys(iconMap).map((text, index) => (
                        <ListItem onClick={() => {props.history.push(links[index])}} button key={text}>
                                {iconMap[text]}
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.content}>
                <div className={classes.toolbar} />
                    <Switch>
                        <Route exact path="/home" component={Dashboard} />
                        <Route exact path="/home/upload-sheet" component={UploadSheetsView} />
                        <Route path="/home" component={WorkInProgress} />
                        {/*<Route exact path="/home" component={Dashboard} />*/}
                    </Switch>
                </div>
            </div>
    );

}

const WorkInProgress = () => {
    return (
        <Grid container justify={"center"}>
            <Grid item sm={6}>
                <img src={workInProgress} width={"70%"} alt={"Work in progress"} />
            </Grid>
        </Grid>
    )
}

