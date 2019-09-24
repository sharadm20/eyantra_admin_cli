import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function Sidebar() {
    
        return (
            
        <Nav variant="pills" defaultActiveKey="/" className="flex-column">
            <Nav.Link href="/" activeClassName="active">Home</Nav.Link>
            <Nav.Link href="/notification" activeClassName="active">Notification</Nav.Link>
        </Nav>
          );
        }

export default Sidebar;