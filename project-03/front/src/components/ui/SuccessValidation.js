import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";

const SuccessValidation = () => {
  return (
    <Container fluid className="success-added-page">
      <Row className="my-5 success-row flex-column justify-content-center align-items-center">
        <RubberBand>
          <Col xs={12} className="my-5 py-5">
            <p className="titles h1 text-white my-5 py-5 text-center">
              Tu cuenta ha sido validada con éxito
            </p>
          </Col>
          <Col xs={12} className="my-5">
            <Link to="/">
              <Button variant="dark" className="text buttonP">
                Ir al inicio
              </Button>
            </Link>
          </Col>
        </RubberBand>
      </Row>
    </Container>
  );
};

export default SuccessValidation;
