import React from 'react';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import Header from '../_components/Header.jsx';
import { Toast } from 'react-bootstrap';
import Sidebar from '../_components/Sidebar';
import { Row, Col } from 'react-bootstrap';

class DefaultLayout extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props.location.pathname)
        this.state = {
            showA: true}
        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }

    render() {
        const { alert } = this.props;
        const { showA } = this.state;
        const toggleShowA = () => this.setState({ showA: !showA });
        return (
          <div className="wrapper d-flex flex-column">
                
                <div aria-live="polite"
                    aria-atomic="true" style={{
                        position: 'relative',
                        minHeight: '100px',
                        paddingTop: '12px'
                    }} className="main container-fluid">

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
                        <Row className="justify-content-md-center">
                            {this.props.children}
                        </Row> 
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
            </div>);
    }
}


function mapStateToProps(state) {
    const { alert, authentication } = state;
    return {
        alert,
        authentication
    };
}

const connectedApp = connect(mapStateToProps)(DefaultLayout);
export { connectedApp as DefaultLayout }; 