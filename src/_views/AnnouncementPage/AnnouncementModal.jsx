import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { userActions } from '../../_actions';

class AnnouncementModal extends React.Component {

    constructor(props) {
      super(props);
     this.state = {    
      submitted: false,
      id: '',
      title: '',
      subText:'',
      imageUrl:'',
      color:'',
      textColor:'',
      body:'',
      type:'',
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
       subText,
       imageUrl,
       color,
       textColor,
       body, 
       type } =this.state;
  
    return (
      <>
        <Button variant="primary" onClick={this.handleShow}>
          Add Announcement
        </Button>
  
        <Modal show={this.state.show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Announcement</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          
                             <Form.Row> 
                                  <Form.Group controlId="type">
                                      <Form.Label>Announcement Type</Form.Label>
                                          <Form.Control name="type" onChange={this.handleChange} as="select">
                                          <option value="" hidden> select </option>
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
                                      <Form.Control as="textarea" onChange={this.handleChange} name="body" rows="5"/>
                                      {submitted && !body &&
                                          <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
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