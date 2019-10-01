import React from 'react';
import { Nav } from 'react-bootstrap';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const location = window.location.pathname;
    if(this.props.loggedIn)
    return (
        
    <Nav defaultActiveKey={location} variant="pills" className="flex-column">
        <Nav.Link exact={true} href="/" activeClassName="active">Home</Nav.Link>
        <Nav.Link  href="/notification" activeClassName="active">Send Notification</Nav.Link>
        <Nav.Link  href="/announcement" activeClassName="active">Announcement entry</Nav.Link>
        <Nav.Link  href="/calendar" activeClassName="active">Calendars entry</Nav.Link>
        <Nav.Link  href="/lab" activeClassName="active">Labs entry</Nav.Link>
        <Nav.Link  href="/talk" activeClassName="active">Talks entry</Nav.Link>
    </Nav>
      );
  
  return null    
  }
}
export default Sidebar;
