import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, Form, Button, FormControl} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const NavMenu = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
            Data science
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <LinkContainer to={'/'} exact>
                    <NavItem>
                        <Glyphicon glyph='home' /> Home
                </NavItem>
                </LinkContainer>
                <LinkContainer to={'/Net23DStepOne'}>
                    <NavItem>
                        Graph to 3D
                </NavItem>
                </LinkContainer>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

export default NavMenu;
