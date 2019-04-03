import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Container, Card,Button, Form,FormGroup, FormControl, FormLabel, Spinner } from 'react-bootstrap';
import "./Login.css";

import { userActions } from '../_actions';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
       
        // reset login status
        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        const { dispatch } = this.props;
        if (username && password) {
            dispatch(userActions.login(username, password));
        }
    }
 



    render() {
 
        const { loggingIn } = this.props;
        const { username, password, submitted } = this.state;
        return (
            <Container className="Login">
                <Card>
                    <Card.Header>Login</Card.Header>
                <Card.Body>
                <form name="form" onSubmit={this.handleSubmit}>
                     <FormGroup>
                        <FormLabel>Username</FormLabel>
                        <FormControl type="text" name="username" value={username} onChange={this.handleChange} isInvalid={submitted && !username} required/>
                        {submitted && !username &&
                            <Form.Control.Feedback type="invalid">Username is invalid</Form.Control.Feedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <FormControl type="password" name="password" value={password} onChange={this.handleChange} isInvalid={submitted && !password} required/>
                        {submitted && !password &&
                            <Form.Control.Feedback type="invalid">Password is invalid</Form.Control.Feedback>
                        }
                    </FormGroup>
                    <FormGroup>
                        <Button variant="danger" type="submit">Login</Button>
                        {loggingIn &&
                            <div>
                            <Spinner animation="grow" variant="primary" />
                            <Spinner animation="grow" variant="secondary" />
                            <Spinner animation="grow" variant="success" />
                            <Spinner animation="grow" variant="danger" />
                            <Spinner animation="grow" variant="warning" /></div>
                        }
                      
                    </FormGroup> 

                </form>
               </Card.Body>         
            </Card> 
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { loggingIn } = state.authentication;
    return {
        loggingIn
    };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage }; 