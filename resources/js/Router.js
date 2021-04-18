import React from 'react';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import Login from './views/Login/Login';
import Register from './views/Register/Register';
import NotFound from './views/NotFound/NotFound'
// User is LoggedIn
import PrivateRoute from './PrivateRoute';
import Users from './views/User/Users/Users';
import CreateUser from './views/User/Users/CreateUser';
import EditUser from './views/User/Users/EditUser';

import Home from './views/Home/Home';
import Datas from './views/Datas/Datas';
import Charts from './views/Charts/Charts';

const Main = (props) => (
    <Switch>
        {/*User might LogIn*/}
        <Route exact path='/' component={(props) => <Login {...props} />} />
        {/*User will LogIn*/}
        <Route path='/login' component={(props) => <Login {...props} />} />
        <Route path='/register' component={(props) => <Register {...props} />} />
        {/* User is LoggedIn*/}
        <PrivateRoute path='/createuser' component={(props) => <CreateUser {...props} />} />
        <PrivateRoute path='/users/:id/edit' component={(props) => <EditUser {...props} />} />
        <PrivateRoute path='/users' component={(props) => <Users {...props} />} />
        {/*Page Not Found*/}
        <PrivateRoute path='/home' component={(props) => <Home {...props} />} />
        <PrivateRoute path='/datas' component={(props) => <Datas {...props} />} />
        <PrivateRoute path='/charts' component={(props) => <Charts {...props} />} />
        <Route component={(props) => <NotFound {...props} />} />

    </Switch>
);
export default Main;
