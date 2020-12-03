import React, {useEffect, useState} from "react"
import Graph from "../graphs/graph";
import Grid from "@material-ui/core/Grid";

const graphComponents = [
    {endpoint: "https://mis2020.herokuapp.com/api/mis/count-by-centre-type/", name: "Count by Centre Type"},
    {endpoint: "https://mis2020.herokuapp.com/api/mis/count-by-installation-status/", name: "Count by Installation Status"},
    {endpoint: "https://mis2020.herokuapp.com/api/mis/count-by-qc-status/", name: "Count by QC Status"},
    {endpoint: "https://mis2020.herokuapp.com/api/mis/count-by-mock-status/", name: "Count by Mock Status"},
]

const Dashboard = () => {
    const [graphs, setGraphs] = useState(null)

    useEffect(() => {
        setGraphs( graphComponents.map(
            (graphEntry) => <Graph data={graphEntry} />))
    }, [])

    return(
        <Grid container justify="space-between" alignItems="center" direction="row">{graphs}</Grid>
    )
}

export default Dashboard;