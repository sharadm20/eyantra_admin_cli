import React from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Card, Row, Button, Form } from 'react-bootstrap';
import { userActions } from '../../_actions';
import './Announcement.css';
import Sidebar from '../../_components/Sidebar';
import AnnouncementCard from './AnnouncementCard';

class AnnouncementPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            announcements: [], announcement: [], currentPage: null, totalPages: null,
            submitted: false
        };
    }

    componentDidMount(){
        const { dispatch } = this.props;
        dispatch(userActions.getAllAnnouncement())
    }

    handleChange=(e) => {
        const { name, value } = e.target;
        console.log(name)
        console.log(value)
        this.setState({ [name]: value });
    }

    onPageChanged = data => {
        const { allCountries } = this.state;
        const { currentPage, totalPages, pageLimit } = data;
    
        const offset = (currentPage - 1) * pageLimit;
        const currentCountries = announcements.slice(offset, offset + pageLimit);
    
        this.setState({ currentPage, announcement, totalPages });
      }
 
    handleSubmit=(e) => {
        e.preventDefault();
        // this.setState({ submitted: true });
        //  const { title, subText, imageUrl, color, textColor, body, type } = this.state;
        // const { dispatch } = this.props;
        
        // if (title && type=='IMAGE') {
        //     dispatch(userActions.addAnnouncementImage(title, body, imageUrl, type, subText));
        // }

        // if (title && type=='TEXT') {
        //     console.log('handle submit');
        //     dispatch(userActions.addAnnouncementText(title, body, color, textColor, type, subText));
        // }

    }

    announcementRows(rows){
        if(rows && rows.length>0){
            return (rows.map(column=>{
            console.log(column)
            return (<AnnouncementCard announcement={column} />)
            }))
                }
    }

    render() {
        const { user, announcement } = this.props;
        
       
        const { title, subText, imageUrl, color, textColor, body, type, submitted } = this.state;
        return (
            <Container fluid="true" className="home">
            <Row>
            {/* <div className="col-md-3">            
            <Sidebar/> 
            </div> */}
            {announcement && this.announcementRows(announcement.items)}
            {/* <Jumbotron className="col-md-10 col-md-offset-1">
                <h2>Hi {user.user.firstName}!</h2>
                <p className="alert alert-primary">You're logged in with eYantra!!</p>
                <h3>Announcement Setting Panel:</h3>
                <Card bg="dark" text="white">
                    <Card.Header>
                        Settings
                    </Card.Header>
                    <Card.Body>
                    
                        <Form onSubmit={this.handleSubmit}>
                           <Form.Row> 
                                <Form.Group controlId="type">
                                    <Form.Label>Announcement Type</Form.Label>
                                        <Form.Control name="type" value={this.state.type} onChange={this.handleChange} as="select">
                                        
                                        <option value="TEXT">TEXT</option>
                                        <option value="IMAGE">IMAGE</option>
                                        </Form.Control>
                                </Form.Group>
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="title required" onChange={this.handleChange} name="title" required/>
                                    {submitted && !title &&
                                        <Form.Control.Feedback type="invalid" >Title is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Sub Text</Form.Label>
                                    <Form.Control type="text" placeholder="sub text required" onChange={this.handleChange} name="subText" required/>
                                    {submitted && !subText &&
                                        <Form.Control.Feedback type="invalid">Sub Text is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="imageUrl" placeholder="image url/thumbnails"/>
                                    {submitted && !imageUrl &&
                                        <Form.Control.Feedback type="invalid">Image url is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="color" placeholder="color as 0xFFFF00"/>
                                    {submitted && !color &&
                                        <Form.Control.Feedback type="invalid">Color is required</Form.Control.Feedback>
                                    }
                            </Form.Group>
                            
                                <Form.Group>
                                    <Form.Label>Text Color</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="textColor" placeholder="text color as 0xFFFF00"/>
                                    {submitted && !textColor &&
                                        <Form.Control.Feedback type="invalid">Text color is required</Form.Control.Feedback>
                                    }
                                </Form.Group>                           
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <Form.Control tas="textarea" onChange={this.handleChange} name="body" rows="3"/>
                                    {submitted && !body &&
                                        <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row>  
                        
                        <Button type="submit" variant="danger">Send Announcement</Button>
                        
                        </Form >
                     </Card.Body>    
                    {loading &&
                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                    }
                </Card>
            
            </Jumbotron> */}
            </Row>
        </Container>
        );
    }
}

function mapStateToProps(state) {
    const {  authentication, announcement } = state;
    const { user } = authentication;
    return {
        user,
        announcement
    };
}

const connectedAnnouncementPage = connect(mapStateToProps)(AnnouncementPage);
export { connectedAnnouncementPage as AnnouncementPage };