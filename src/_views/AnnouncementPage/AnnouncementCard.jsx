import React from 'react';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Card, Button, Row, Col, Form } from 'react-bootstrap';
import './Announcement.css';



class AnnouncementCard extends React.Component {

  constructor(props) {
    super(props);
   this.state = {    
    editing: false,
    submitted: false,
    id: '',
    title: '',
    subText:'',
    imageUrl:'',
    color:'',
    textColor:'',
    body:'',
    type:''
    };
}


componentDidMount=()=>{
 if(this.props.announcement){
  const { id, title, subText, color, textColor, body, imageUrl, type } = this.props.announcement || {};
   this.setState({
     id: id,
     type: type,
     title: title,
     subText: subText,
     color:color,
     textColor:textColor,
     body: body,
     imageUrl: imageUrl
   })
 }
}

handleForm=()=>{
  this.props.handleSubmit(this.state);
  this.setState({editing:!this.state.editing})
}
handleChange=(e) => {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}

handleEdit=()=>{
  this.setState({editing:!this.state.editing})
}
onDelete=()=>{
  this.props.handleDelete(this.state.id)
}
  
    render(){
   const { id, title, subText, color, textColor, body, imageUrl, type, editing , submitted } = this.state;
    if(!editing)   
    return (
        <Card style={{ width: '20rem' }} bg="info" text="white">
      <Card.Body>
      <Card.Title>Id :{id}</Card.Title>
      <Card.Title className="mb-2">Title: {title}</Card.Title>
      <Card.Text>
          <p>Color : {color}  </p>
          <p>imageUrl: {imageUrl}</p>
          <p>Text Color: {textColor}</p>
          <p>Sub text: {subText}</p>
      </Card.Text>
          Body: {body}
          <Row>
            <Col><Button type="button" variant="warning" onClick={this.handleEdit}>Edit</Button></Col>
            <Col> <Button type="button" variant="danger" onClick={this.onDelete}>Delete</Button></Col>
          </Row>
          </Card.Body>
      </Card>);
    if(editing){
      return(
        <Card style={{ width: '18rem' }} bg="info" text="white">
      <Card.Body>
      <Form onSubmit={this.handleForm}>
                           <Form.Row> 
                                <Form.Group controlId="type">
                                    <Form.Label>Announcement Type</Form.Label>
                                        <Form.Control name="type" value={type} onChange={this.handleChange} as="select">
                                        
                                        <option value="TEXT">TEXT</option>
                                        <option value="IMAGE">IMAGE</option>
                                        </Form.Control>
                                </Form.Group>
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="title required" onChange={this.handleChange} name="title" value={title} required/>
                                    {submitted && !title &&
                                        <Form.Control.Feedback type="invalid" >Title is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Sub Text</Form.Label>
                                    <Form.Control as="textarea" onChange={this.handleChange} value={subText} name="subText" rows="2" required/>
                                    {submitted && !subText &&
                                        <Form.Control.Feedback type="invalid">Sub Text is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="imageUrl" value={imageUrl} placeholder="image url/thumbnails"/>
                                    {submitted && !imageUrl &&
                                        <Form.Control.Feedback type="invalid">Image url is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row> 
                            
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="color" value={color} placeholder="color as 0xFFFF00"/>
                                    {submitted && !color &&
                                        <Form.Control.Feedback type="invalid">Color is required</Form.Control.Feedback>
                                    }
                            </Form.Group>
                            
                                <Form.Group>
                                    <Form.Label>Text Color</Form.Label>
                                    <Form.Control type="text" onChange={this.handleChange} name="textColor" value={textColor} placeholder="text color as 0xFFFF00"/>
                                    {submitted && !textColor &&
                                        <Form.Control.Feedback type="invalid">Text color is required</Form.Control.Feedback>
                                    }
                                </Form.Group>                           
                            </Form.Row>
                            <Form.Row>
                                <Form.Group>
                                    <Form.Label>Body</Form.Label>
                                    <MarkdownEditor
                                        value={body}
                                        onChange={this.handleChange}
                                      />
                                    {/* <Form.Control as="textarea" onChange={this.handleChange} name="body" value={body} rows="5"/> */}
                                    {submitted && !body &&
                                        <Form.Control.Feedback type="invalid">Body is required</Form.Control.Feedback>
                                    }
                                </Form.Group> 
                            </Form.Row>  
          
                    <Button type="submit" variant="success">Save</Button>
                    <Button type="button" variant="info" onClick={this.handleEdit}>Close</Button>
          </Form>
          </Card.Body>
      </Card>
      );
    }
  }
}
export default AnnouncementCard;