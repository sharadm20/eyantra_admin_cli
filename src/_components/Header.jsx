import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';

class Header extends React.Component {
  constructor(props) {
    super(props);
    //console.log(JSON.stringify(props));
  }
  render() {
    return (
      <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">
        <img
          alt=""
          src='./public/img/logomini.png'
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {' e-Yantra'}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      </Navbar.Brand>
      { !!this.props.loggedIn &&
        
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">  
            <Nav>
              <Nav.Link href="/login">Logout</Nav.Link>
            </Nav>
          </Navbar.Collapse>
      }
    </Navbar>)
  }
}


export default Header;