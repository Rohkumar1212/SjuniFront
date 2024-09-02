import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import Login from '../src/components/login';
import Dashboard from '../src/components/Dashboard';
import Logout from 'components/Logout';

const PrivateRoute = ({ component: Component, ...rest }: any) => (
    <Route
        {...rest}
        render={props =>
            localStorage.getItem("token") ? (
                <Component {...props} />
            ) : (
                <Redirect to="/login" />
            )
        }
    />
);

const App: React.FC = () => {

    return (
        <Router>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Redirect from="/" to="/login" />
                <Route path="/logout" component={Logout} />
            </Switch>
        </Router>
    );
};

export default App;
