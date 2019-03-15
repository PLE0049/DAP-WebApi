import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem, NavDropdown, Form, Button, FormControl} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default () => (
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
                <LinkContainer to={'/counter'}>
                    <NavItem>
                        <Glyphicon glyph='education' /> Counter
                </NavItem>
                </LinkContainer>
                <LinkContainer to={'/fetchdata'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Fetch data
                </NavItem>
                </LinkContainer>
                <LinkContainer to={'/graph'}>
                    <NavItem>
                        <Glyphicon glyph='th-list' /> Graph
                </NavItem>
                </LinkContainer>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-success">Search</Button>
            </Form>
        </Navbar.Collapse>
    </Navbar>
)
