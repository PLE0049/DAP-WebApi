import React from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import NavMenu from './NavMenu';

export default props => (
    <Grid fluid>
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
  </Grid>
);
