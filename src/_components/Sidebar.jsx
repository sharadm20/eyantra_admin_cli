import React from 'react';
import { Nav } from 'react-bootstrap';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    //console.log(this.props.location.pathname)
  }
  render() {
    if(this.props.loggedIn)
    return (
        
    <Nav variant="pills" className="flex-column">
        <Nav.Link exact={true} href="/" activeClassName="active">Home</Nav.Link>
        <Nav.Link  href="/notification" activeClassName="active">Send Notification</Nav.Link>
        <Nav.Link  href="/announcement" activeClassName="active">Edit and Save Announcement</Nav.Link>
    </Nav>
      );
  
  return null    
  }
}
export default Sidebar;
