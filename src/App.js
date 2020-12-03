import React from "react"
import {LoginView} from "./components/login/LoginView";
import {Route, Switch} from "react-router-dom";
import {Home} from "./components/home/home";
import CenterTable from "./components/uploadSheets/centreTable";

const App = () => {
    return (
        <Switch>
            <Route exact path="/" component={LoginView} />
            <Route path="/home" component={Home}/>
        </Switch>
    );
}

export default App;
