import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';
import Footer from './Footer';

const Layout =  props => (
    <Grid fluid id="page-container">
        <div id="content-wrap">
            <Row>
                <Col sm={12}>
                    <NavMenu />
                </Col>
            </Row>
            <Row>
                <Col sm={12}>
                    {props.children}
                </Col>
            </Row>
        </div>     
        <Footer/>        
  </Grid>
);

export default Layout;