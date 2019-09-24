import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Card, Row } from 'react-bootstrap';
import { userActions } from '../../_actions';
import './Calendar.css';
import Sidebar from '../../_components/Sidebar';

class CalendarPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            message: '',
            fcm_token: '',
            click_action:'',
            sound:'',
            status:'',
            screen:'',
            submitted: false
        };
    }

    handleChange=(e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
 
    handleSubmit=(e) => {
        e.preventDefault();
        this.setState({ submitted: true });
         const { title, message, fcm_token, click_action, sound, status, screen } = this.state;
        const { dispatch } = this.props;
        if (title && message) {
            dispatch(userActions.notification(title, message, fcm_token, screen));
        }

    }

    render() {
        const { user, loading } = this.props;
        
        const { title, message, fcm_token,submitted, click_action, sound, status, screen } = this.state;
        return (
            <Container className="home">
            <Row>
            <div className="col-md-3">            
            <Sidebar/> 
            </div>

            <Jumbotron className="col-md-8">
                <h2>Hi {user.user.firstName}!</h2>
                <p className="alert alert-primary">You're logged in with eYantra!!</p>
                <h3>Notification Setting Panel:</h3>
                <Card bg="dark" text="white">
                    <Card.Header>
                        Settings
                    </Card.Header>
                    <Card.Body>
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className={'form-control' + (submitted && !title ? ' is-invalid' : '')} name="title" id="title" placeholder="Title" onChange={this.handleChange}/>
                                    {submitted && !title &&
                                        <div className="invalid-feedback">Title is required</div>
                                    }
                            </div>
                                <div className="form-group col-md-6">
                            <label htmlFor="message">Body</label>
                                    <input type="text" className={'form-control' + (submitted && !message ? ' is-invalid' : '')} name="message" id="message" placeholder="Body" onChange={this.handleChange}/>
                                    {submitted && !message &&
                                        <div className="invalid-feedback">Body is required</div>
                                    }
                            </div>
                        </div>
                            <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label htmlFor="title">Fcm Token</label>
                                    <input type="text" className={'form-control' + (submitted && !fcm_token ? ' is-invalid' : '')} name="fcm_token" id="fcm_token" placeholder="FCM Token" onChange={this.handleChange} />
                                    {submitted && !fcm_token &&
                                        <div className="invalid-feedback">Fcm token is required</div>
                                    }
                                </div>
                              
                            </div>
                             <div className="form-row">
                                <div className="form-group col-md-8">
                                    <label htmlFor="title">Screen</label>
                                    <input type="text" className={'form-control' + (submitted && !screen ? ' is-invalid' : '')} name="screen" id="screen" placeholder="Screen" onChange={this.handleChange} />
                                    {submitted && !screen &&
                                        <div className="invalid-feedback">Screen text is required</div>
                                    }
                                </div>
                              
                            </div>
                        <button type="submit" className="btn btn-danger">Send Notification</button>
                        </form>
                    </Card.Body>
                    {loading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </Card>
           
            </Jumbotron>
            </Row>
        </Container>
        );
    }
}

function mapStateToProps(state) {
    const {  authentication } = state;
    const { user } = authentication;
    return {
        user
    };
}

const connectedCalendarPage = connect(mapStateToProps)(CalendarPage);
export { connectedCalendarPage as CalendarPage };