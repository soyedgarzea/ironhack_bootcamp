import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";

const NotFound = () => {
  return (
    <Container fluid className="notfound-page">
      <Row className="my-5 notfound-row flex-column justify-content-center align-items-center">
        <RubberBand>
          <Col xs={12} className="my-5">
            <p className="text h1 text-dark my-5 text-center">
              No hemos encontrado lo que estás buscando
            </p>
          </Col>
          <Col xs={12} className="my-5">
            <Link to="/">
              <Button variant="dark" className="text">
                Regresa al inicio
              </Button>
            </Link>
          </Col>
        </RubberBand>
      </Row>
    </Container>
  );
};

export default NotFound;
