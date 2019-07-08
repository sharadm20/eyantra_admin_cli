import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Jumbotron, Container, Card, Form } from 'react-bootstrap';
import { userActions } from '../../_actions';
import './Notification.css';
class NotificationPage extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

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
         const { title, message, topic } = this.state;
        const { dispatch } = this.props;
        if (title && message) {
            dispatch(userActions.notificationToTopic(title, message, topic));
        }
        
    }

    render() {
        const { user } = this.props;
        const { loading } =this.props;
        const { title, message,topic } = this.state;
        return (
            <Container className="home">
            <Jumbotron className="col-md-8">
                <h2>Hi {user.firstname}!</h2>
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
                                {/* <div className="form-group col-md-8">
                                    <label htmlFor="title">Topic</label>
                                    <input type="text" className={'form-control' + (submitted && !topic ? ' is-invalid' : '')} name="topic" id="topic" placeholder="FCM Token" onChange={this.handleChange} />
                                   
                                </div> */}
                                <Form.Group className="col-md-8">
                                    <Form.Label>Select Topic</Form.Label>
                                    <Form.Control as="select" className={'form-control' + (submitted && !topic ? ' is-invalid' : '')} name="topic" id="topic">
                                    <option value="DEFAULT">Default</option>
                                    <option value="CUSTOM">Custom</option>
                                
                                    </Form.Control>
                                    {submitted && !topic &&
                                        <div className="invalid-feedback">topic is required</div>
                                    }
                                </Form.Group>
                              
                            </div>
                  
                        <button type="submit" className="btn btn-danger">Send Notification</button>
                        </form>
                    </Card.Body>
                    {loading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </Card>
           
            </Jumbotron>
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

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };