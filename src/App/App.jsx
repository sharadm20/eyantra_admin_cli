import React from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import Header from '../_components/Header.jsx';
import { HomePage } from '../_views/HomePage';
import { LoginPage } from '../_views/LoginPage';
import { Toast } from 'react-bootstrap';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showA: true}
      console.log(JSON.stringify(props))
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert, authentication } = this.props;
        const { showA } = this.state;
        const toggleShowA = () => this.setState({ showA: !showA });
        return (
          <div className="wrapper d-flex flex-column">
                <Header loggedIn={authentication.loggedIn}/>
                <div aria-live="polite"
                    aria-atomic="true" style={{
                        position: 'relative',
                        minHeight: '100px',
                    }} className="main container">
                <div>
                    {alert.message &&
                            // <div className={`alert ${alert.type}`}>{alert.message}</div>
                            <Toast className={`${alert.type}`} show={showA} onClose={toggleShowA} style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                              }}>
                                <Toast.Header>
                                    <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
                                    <strong className="mr-auto">{alert.message}</strong>
                                    
                                </Toast.Header>
                                {/* <Toast.Body className={`alert ${alert.type}`}>{alert.message}</Toast.Body> */}
                                </Toast>
                        }
                    </div>
                    <div className="col-sm-8 col-sm-offset-2">
                        
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