import React, {useEffect, useState} from "react"
import {callApi} from "../dashboard/Utils";
import CircularProgress from "@material-ui/core/CircularProgress";
import {Grid} from "@material-ui/core";
import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from "recharts";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import responsiveFontSizes from "@material-ui/core/styles/responsiveFontSizes";
import {ThemeProvider} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const useStyles = makeStyles((theme) => ({
    root_hash: {
        display: 'flex',
        backgroundColor: "#fff",
        padding: theme.spacing(6),
    },
    small_pad: {
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    }
}));

const Graph = (props) => {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState(null)
    const [graphData, setGraphData] = useState(null)

    const data1 = [
        {
            "name": "Page A",
            "uv": 4000,
            "pv": 2400
        },
        {
            "name": "Page B",
            "uv": 3000,
            "pv": 1398
        },
        {
            "name": "Page C",
            "uv": 2000,
            "pv": 9800
        },
        {
            "name": "Page D",
            "uv": 2780,
            "pv": 3908
        },
        {
            "name": "Page E",
            "uv": 1890,
            "pv": 4800
        },
        {
            "name": "Page F",
            "uv": 2390,
            "pv": 3800
        },
        {
            "name": "Page G",
            "uv": 3490,
            "pv": 4300
        }
    ]

    useEffect(() => {
        callApi(props.data.endpoint)
            .then((res) => {
                if(res) {
                    setData(res.data)
                    setIsLoading(false)
                }
            })
    }, [])

    useEffect(() => {
        if(isLoading) {
            setGraphData(Loader())
        } else {
            if( data === null) {
                setGraphData(null)
            } else {
                setGraphData(LoadGraph())
            }
        }
    }, [isLoading, data])

    const Loader = () => {
        return (
            <Grid>
                <CircularProgress />
            </Grid>
        )
    }

    const LoadGraph = () => {
        console.log(data)
        return (
            <Grid item>
                <Box boxShadow={2} bgcolor="background.paper" className={classes.small_pad} >
                    <Grid item xs={12} sm={10} justify={"center"} alignItems={"center"}>
                        <Grid direction={"column"} container alignItems={"center"} justify={"center"} >
                            <ThemeProvider theme={theme}>
                                <Typography variant="h5">{props.data.name}</Typography>
                            </ThemeProvider><br />
                            <BarChart width={480} height={320} data={data1}>
                                <CartesianGrid strokeDasharray="3 4" />
                                <XAxis dataKey="label" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="uv" fill="#8884d8" />
                            </BarChart>
                        </Grid>
                    </Grid>
                </Box>
            </Grid>
        )
    }



    return (
        <div>{graphData}</div>

    )
}

export default Graph;

