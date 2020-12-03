import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import React from "react";
import {default as ListOwner} from "./component/owner/ListOwner";
import Login from "./component/Login";

const AppRouter: React.FC = () => (
    <Router>
        <Switch>
            <Route path="/login" component={Login} />
            <Route path="/owner" component={ListOwner} />
        </Switch>
    </Router>
);

export default AppRouter;
