import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

class CalendarModal extends React.Component {

    constructor(props) {
      super(props);
     this.state = {    
      submitted: false,
      id: '',
      event: '',
      date:'',
      description:'',
      location:'',
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
        event,
       date,
       description,
       location } =this.state;
  
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add Calendar Entry
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Calendar Entry</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Event name</Form.Label>
                                      <Form.Control type="text" placeholder="event required" onChange={this.handleChange} name="event" required/>
                                      {submitted && !event &&
                                          <Form.Control.Feedback type="invalid" >Event is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Date</Form.Label>
                                      <Form.Control type="date" onChange={this.handleChange} name="date" required/>
                                      {submitted && !date &&
                                          <Form.Control.Feedback type="invalid">Date is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Description</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="description" placeholder="description"/>
                                      {submitted && !description &&
                                          <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              
                            <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Location</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="location" placeholder="location"/>
                                      {submitted && !location &&
                                          <Form.Control.Feedback type="invalid">Location is required</Form.Control.Feedback>
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
export default CalendarModal;