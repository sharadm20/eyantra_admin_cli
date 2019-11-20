import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { userActions } from '../../_actions';

class AnnouncementModal extends React.Component {

    constructor(props) {
      super(props);
     this.state = {    
        submitted: false,
        id: '',
        title:'',
        description:'',
        link:'',
        thumbnail:'',
        speaker:'',
        duration:'',
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
        title,
       description,
       link,
       thumbnail,
       speaker,
       duration, 
        } =this.state;
  
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add Talk
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Talk</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
                        
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
                                      <Form.Label>Description</Form.Label>
                                      <Form.Control type="text" placeholder="description required" onChange={this.handleChange} name="description" required/>
                                      {submitted && !description &&
                                          <Form.Control.Feedback type="invalid">Description is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Link</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="link" placeholder="youtube url"/>
                                      {submitted && !link &&
                                          <Form.Control.Feedback type="invalid">Youtube url is required</Form.Control.Feedback>
                                      }
                                  </Form.Group> 
                              </Form.Row> 
                              
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Thumbnail</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="thumbnail" placeholder="thumbnail url"/>
                                      {submitted && !thumbnail &&
                                          <Form.Control.Feedback type="invalid">Thumbnail is required</Form.Control.Feedback>
                                      }
                              </Form.Group>
                              
                                  <Form.Group>
                                      <Form.Label>Speaker</Form.Label>
                                      <Form.Control type="text" onChange={this.handleChange} name="speaker" placeholder="speaker of the talk"/>
                                      {submitted && !speaker &&
                                          <Form.Control.Feedback type="invalid">Speaker name is required</Form.Control.Feedback>
                                      }
                                  </Form.Group>                           
                              </Form.Row>
                              <Form.Row>
                                  <Form.Group>
                                      <Form.Label>Duration</Form.Label>
                                      <Form.Control type="number" onChange={this.handleChange} name="duration"/>
                                      {submitted && !duration &&
                                          <Form.Control.Feedback type="invalid">Duration of the talk is required</Form.Control.Feedback>
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