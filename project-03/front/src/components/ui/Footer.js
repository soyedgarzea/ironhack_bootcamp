import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const FooterP = () => {
  return (
    <Container fluid className="footer">
      <Row className="justify-content-around">
        <Image src="/images/presta-logo.svg" className="logo-footer" />
      </Row>
      <Row className="justify-content-around">
        <Col>
          <p className="text-footer text">Términos y condiciones</p>
        </Col>
        <Col>
          <p className="text-footer text">Aviso de Privacidad</p>
        </Col>
      </Row>
    </Container>
  );
};

export default FooterP;
