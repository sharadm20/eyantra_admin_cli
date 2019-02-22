import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {

    constructor(props) {
        super(props);

        // reset login status
        //this.props.dispatch(userActions.logout());

        this.state = {
            title: '',
            message: '',
            submitted: false
        };

        //this.handleChange = this.handleChange.bind(this);
        //this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange=(e)=> {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }
    componentDidMount() {
        //this.props.dispatch(userActions.getAll());
    }

    // handleDeleteUser(id) {
    //     return (e) => this.props.dispatch(userActions.delete(id));
    // }
    handleSubmit=(e)=> {
        e.preventDefault();
        this.setState({ submitted: true });
         const { title, message } = this.state;
        const { dispatch } = this.props;
        if (title && message) {
            dispatch(userActions.notification(title, message));
        }
        console.log("hello");
    }

    render() {
        const { user } = this.props;
        const { loading } =this.props;
        const { title, message, submitted } = this.state;
        return (
            <div className="col-md-8 col-md-offset-2">
                <h1>Hi {user.user.name}!</h1>
                <p>You're logged in with eYantra!!</p>
                <h3>Notification Setting Panel:</h3>
                <div className="card">
                    <div className="card-header">
                        Settings
                    </div>
                    <div className="card-body">
                        {/* <h5 className="card-title">Special title treatment</h5>
                        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p> */}
                        {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label for="title">Title</label>
                                    <input type="text" className={'form-control' + (submitted && !title ? ' is-invalid' : '')} name="title" id="title" placeholder="Title" onChange={this.handleChange}/>
                                    {submitted && !title &&
                                        <div className="invalid-feedback">Title is required</div>
                                    }
                            </div>
                                <div className="form-group col-md-6">
                            <label for="message">Body</label>
                                    <input type="text" className={'form-control' + (submitted && !message ? ' is-invalid' : '')} name="message" id="message" placeholder="Body" onChange={this.handleChange}/>
                                    {submitted && !message &&
                                        <div className="invalid-feedback">Body is required</div>
                                    }
                            </div>
                        </div>
                        <button type="submit" className="btn btn-danger">Send Notification</button>
                        </form>
                    </div>
                    {loading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </div>
                <button className="btn btn-light">
                    <Link to="/login">Logout</Link>
                </button>
            </div>
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