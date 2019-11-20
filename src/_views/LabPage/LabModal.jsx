import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class AnnouncementModal extends React.Component {

    constructor(props) {
      super(props);
     this.state = {    
      submitted: false,
      id: '',
      collegeId: '',
      college:'',
      latitude:'',
      longitude:'',
    
      show: false,
      };
  }

    handleClose = () => {
        this.setState({show:false})
    }
    handleShow = () => {
        this.setState({show: true})
    }
    handleChange=(e) => {
            const { name, value } = e.target;
            this.setState({ [name]: value });
    }
    handleSubmit=(e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        this.props.handleSubmit(this.state)
        
        this.handleClose()
    }
    
   render(){ 
       const { submitted, 
       collegeId, college, latitude, longitude } =this.state;
  
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add eLSI Labs
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>eLSI Labs</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>College Id</Form.Label>
                                      <Form.Control type="text" placeholder="id" onChange={this.handleChange} name="collegeId" required/>
                                      {submitted && !collegeId &&
                                          <Form.Control.Feedback type="invalid" >CollegeId is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>College Name</Form.Label>
                                      <Form.Control type="text" placeholder="college name" onChange={this.handleChange} name="college" required/>
                                      {submitted && !college &&
                                          <Form.Control.Feedback type="invalid">College name is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Latitude</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="latitude" placeholder="latitude"/>
                                      {submitted && !latitude &&
                                          <Form.Control.Feedback type="invalid">Latitude is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Longitude</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="longitude" placeholder="longitude"/>
                                      {submitted && !longitude &&
                                          <Form.Control.Feedback type="invalid">Longitude is required</Form.Control.Feedback>
                                      }
                              </Form.Group>                                   
                              </Form.Row>           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
          </Form>
        </Modal>
      </>
    );
  }
}
export default AnnouncementModal;