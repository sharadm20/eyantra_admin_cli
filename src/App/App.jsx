import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import Header from '../_components/Header.jsx';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';

class App extends React.Component {
    constructor(props) {
        super(props);
      console.log(JSON.stringify(props))
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, authentication } = this.props;
        return (
          <div className="wrapper d-flex flex-column">
                <Header loggedIn={authentication.loggedIn}/>
                <div className="main container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <div>
                                <PrivateRoute exact path="/" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                             
                            </div>
                        </Router>
                    </div>
                </div>
                <footer className="main-footer">
                    <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-6">
                        <p>Copyright 2019 © e-Yantra | All Rights Reserved</p>
                        </div>
                        <div className="col-sm-6 text-right">
                        e-Yantra Notification Center
                        </div>
                    </div>
                    </div>
                </footer>
            </div>
      
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 