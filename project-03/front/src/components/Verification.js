import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import LendService from "../services/lendService";
import SuccessValidation from "./ui/SuccessValidation";

const Verification = () => {
  const [codeState, updateCodeState] = useState({
    code: "",
  });

  const [successState, updateSuccessState] = useState(false);

  const [failedState, updateFailedState] = useState(false);

  const handleCode = (e) => {
    updateCodeState(Object.assign({}, codeState, { code: e.target.value }));
  };

  const isReady = () => {
    if (codeState.code.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleVerification = () => {
    const lendService = new LendService();

    lendService.verificationAccount(codeState).then((res) => {
      if (res.data.answer) {
        updateSuccessState(true);
      } else {
        updateFailedState(true);
      }
    });
  };

  return (
    <>
      {successState ? (
        <SuccessValidation />
      ) : (
        <Container fluid className="verification-page">
          <Row className="my-5 flex-column align-items-center justify-content-center">
            <Col xs={11}>
              <p className="titles text-white h1 text-center my-5">
                Vamos a verificar tu cuenta
              </p>
            </Col>
            <Col xs={11}>
              <p className="text text-white text-center my-3 h4">
                Ingresa el código que te fue enviado
              </p>
            </Col>
            <Col xs={6}>
              <Form.Group>
                <Form.Control
                  size="lg"
                  type="text"
                  className="text"
                  onChange={handleCode}
                />
              </Form.Group>
            </Col>
            <Col
              xs={6}
              className="d-flex justify-content-center align-items-center"
            >
              {isReady() ? (
                <Button
                  variant="dark"
                  className="text buttonP my-5"
                  onClick={handleVerification}
                >
                  Verificar
                </Button>
              ) : (
                <Button
                  disabled
                  variant="dark"
                  className="text my-5"
                  onClick={handleVerification}
                >
                  Verificar
                </Button>
              )}
            </Col>
            {failedState && (
              <Col xs={11} className="failed-box">
                <p className="text text-dark text-center my-3 h3">
                  No hemos encontrado el código que has ingresado
                </p>
                <p className="text text-dark text-center my-3 h3">
                  Inténtalo de nuevo o genera un nuevo código de verificación
                </p>
              </Col>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Verification;
