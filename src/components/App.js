import React from 'react';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import Dashboard from './Dashboard';
import Home from './Home';
import Subscription from './Subscription';
import Events from './Events';
import CustomPrograms from './CustomPrograms';
import Display from './Display';
import Equipment from './Equipment';
import Contact from './Contact';
import Statistics from "./Statistics";
import Profile from "./Profile";
import Login from "./Login";
import EnsureLoggedInContainer from "./EnsureLoggedInContainer";
import Register from "./Register";

class App extends React.Component {

    render() {
        return (

            <Router history={browserHistory}>
                <Route path={"/auth"} component={Login}/>
                <Route path={"/register"} component={Register}/>
                <Route component={EnsureLoggedInContainer}>
                    <Route path={"/"} component={Dashboard}>
                        <IndexRedirect to="/home" />
                        <Route path={"home"} component={Home}/>
                        <Route path={"subscription"} component={Subscription}/>
                        <Route path={"profile"} component={Profile}/>
                        <Route path={"statistics"} component={Statistics}/>
                        <Route path={"events"} component={Events}/>
                        <Route path={"customprograms"} component={CustomPrograms}/>
                        <Route path={"display"} component={Display}/>
                        <Route path={"equipment"} component={Equipment}/>
                        <Route path={"contact"} component={Contact}/>
                    </Route>
                </Route>
            </Router>
        );
    }
}

export default App;