import Button from '@material-ui/core/Button';
import React, {Suspense, useState} from "react";
import {DropzoneDialog} from "material-ui-dropzone";
import PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Grid} from "@material-ui/core";
import {misErrors, misUpload} from "./Utils";
import CircularProgress from "@material-ui/core/CircularProgress";

const CenterTable = React.lazy(() => import('./centreTable'));

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    uploader: {
        alignItems: "center",
        alignContent: "center",
        padding: theme.spacing(6)
    }
}));

export const UploadSheetsView = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
            id: `scrollable-force-tab-${index}`,
            'aria-controls': `scrollable-force-tabpanel-${index}`,
        };
    }

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs value={value} onChange={handleChange} variant="fullWidth" indicatorColor="primary"
                      textColor="primary" aria-label="scrollable force tabs example">
                    <Tab label="Add/Update Project" {...a11yProps(0)} />
                    <Tab label="Remove centers"  {...a11yProps(1)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <Grid container direction={"row"} justify="center">
                    <UploadAndSave title={"Add new Project"}/>
                    <UploadAndSave title={"Add new centres"} />
                    <UploadAndSave title={"Update projects"} />
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container direction={"row"} justify="center">
                    <Suspense fallback={<div><CircularProgress /></div>}>
                        <CenterTable />
                    </Suspense>
                </Grid>
            </TabPanel>
        </div>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const UploadAndSave = (props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [notification, setNotification] = useState(null)

    const formatMsgs = (errorMsgs) => {
        const errors =  errorMsgs.map((error) => {
            return (
                <p>Error in Column {error.column} at {error.row} with {error.value}</p>
            )
        })
        return errors
    }

    const setNotificationUtil = (type, errors=null) => {
        let title, msgs
        if(type === "success") {
            title = "Added Successfully"
            msgs = null
        } else {
            title = "Error occurred"
            msgs = formatMsgs(errors)
        }
        setNotification({
            type: type,
            title: title,
            msg: <div>{msgs}</div>
        })
        setTimeout(()=>{
            setNotification(null)
        }, 5000)
    }
    const SUCCESS = "success"
    const ERROR = "error"

    const uploadFile = (files) => {
        console.log('Files:', files);
        misUpload(files[0]).then((res) => {
                console.log(res.id)
                misErrors(res.id).then((res) => {
                    setOpen(false);
                    if(res.length) {
                        setNotificationUtil(ERROR, res)
                    } else {
                        setNotificationUtil(SUCCESS)
                    }
                }).catch((err) => {
                    setNotificationUtil(ERROR, res)
                })

            }).catch((err) => {
                console.log(err)
                setOpen(false);
            })

    }
    const validTypes = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/vnd.oasis.opendocument.spreadsheet',
    ];

    return (
        <div className={classes.uploader}>
            <Grid item sm={12}>
                <Grid item sm={12}>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
                        {props.title}
                    </Button>

                    <DropzoneDialog acceptedFiles={validTypes} cancelButtonText={"Cancel"} filesLimit={1}
                                    submitButtonText={"Upload"} maxFileSize={5000000}
                                    open={open} onClose={() => setOpen(false)}
                                    onSave={uploadFile}
                                    showPreviews={false} showFileNamesInPreview={false}/>
                </Grid>
                {notification &&
                <Grid item sm={12}>
                    <Alert severity={notification.type}>
                        <AlertTitle>{notification.title}</AlertTitle>
                        {notification.msg}
                    </Alert>
                </Grid>
                }
            </Grid>
        </div>
    )
}