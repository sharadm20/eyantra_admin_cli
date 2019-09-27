import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { PrivateRoute } from '../_components';
import { HomePage } from '../_views/HomePage';
import { LoginPage } from '../_views/LoginPage';
import { NotificationPage } from '../_views/NotificationPage';
import { AnnouncementPage } from '../_views/AnnouncementPage';
import { DefaultLayout, DashboardLayout } from '../_layouts';

class App extends React.Component {
    constructor(props) {
        super(props);

    }
    renderWithDefaultLayout(Component, Layout){
        return <Layout><Component /></Layout>
    }
    renderWithDashboardLayout(Path, Component, Layout){
        return <Layout><PrivateRoute path={Path} component={Component}/></Layout>
    }

    render() {
        return (   
        <Router history={history}> 
            <Switch >
            <Route exact path='/' render={() => this.renderWithDashboardLayout(this.path, HomePage, DashboardLayout)} />
            <Route path='/notification' render={() => this.renderWithDashboardLayout(this.path, NotificationPage, DashboardLayout)} />
            <Route path='/announcement' render={() => this.renderWithDashboardLayout(this.path, AnnouncementPage, DashboardLayout)} />
            <Route path='/login' render={() => this.renderWithDefaultLayout(LoginPage, DefaultLayout)} />
            </Switch>
        </Router>    
         );
    }
}


const connectedApp = connect()(App);
export { connectedApp as App }; 