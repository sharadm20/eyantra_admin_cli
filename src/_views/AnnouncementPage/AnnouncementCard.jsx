import React from 'react';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './Announcement.css';



class AnnouncementCard extends React.Component {

  constructor(props) {
    super(props);
   this.state = {    
    editing: false
};
}

handleSubmit=()=>{
  //this.props.handleSubmit();
  this.setState({editing:!this.state.editing})
}
  
    render(){
    const { id, title, subText, color, textColor, body, imageUrl } = this.props.announcement || {};
    const { editing }= this.state; 
    if(!editing)   
    return (
        <Card style={{ width: '18rem' }} bg="info" text="white">
      <Card.Body>
      <Card.Title>Id :{id}</Card.Title>
      <Card.Title className="mb-2">Title: {title}</Card.Title>
      <Card.Text>
          <p>Color : {color}  </p>
          <p>Text Color: {textColor}</p>
          <p>Sub text: {subText}</p>
      </Card.Text>
          Body: {body}
          <Row>
            <Col><Button type="button" variant="warning" onClick={this.handleSubmit}>Edit</Button></Col>
            <Col> <Button type="button" variant="danger">Delete</Button></Col>
          </Row>
          </Card.Body>
      </Card>);
    if(editing){
      return(
        <Card style={{ width: '18rem' }} bg="info" text="white">
      <Card.Body>
      <Card.Title>Edit :{id}</Card.Title>
      <Card.Title className="mb-2">Title: {title}</Card.Title>
      <Card.Text>
        there will be inputs
      </Card.Text>
          OK {body}
          <Row>
            <Col><Button type="button" variant="success">Save</Button></Col>
            <Col> <Button type="button" variant="info" onClick={this.handleSubmit}>Close</Button></Col>
          </Row>
          </Card.Body>
      </Card>
      );
    }
  }
}
export default AnnouncementCard;