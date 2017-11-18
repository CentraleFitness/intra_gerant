import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';

import Dashboard from './components/Dashboard'
import Home from './components/Home'
import Statistics from "./components/Statistics";
import Profile from "./components/Profile";
import Login from "./components/Login";

import './styles/index.css';

class App extends React.Component {

    checkAlreadyLoggedIn() {
        return true;
    }

    render() {

        const alreadyLoggedIn = this.checkAlreadyLoggedIn();

        if (alreadyLoggedIn) {
            return (
                <Router history={browserHistory}>
                    <Route path={"/"} component={Dashboard}>

                        <IndexRedirect to="/home" />
                        <Route path={"home"} component={Home}/>
                        <Route path={"profile"} component={Profile}/>
                        <Route path={"statistics"} component={Statistics}/>
                    </Route>
                </Router>
            );
        } else {
            return (<Login/>);
        }
    }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
