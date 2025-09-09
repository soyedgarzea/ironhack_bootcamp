import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../utils/user.context";
import { Container, Row, Col, Button } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";

const SuccessRegistration = ({ updateModal }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    updateModal(false);
  };

  return (
    <Container fluid className="success-added-page">
      <Row className="my-5 success-row flex-column justify-content-center align-items-center">
        <RubberBand>
          <Col xs={12} className="my-5">
            <p className="text h1 text-white my-5 text-center">
              Tu artículo ha sido agregado con éxito
            </p>
          </Col>
          <Col xs={12} className="my-5 d-flex flex-column align-items-center">
            <p className="text h1 text-white my-5 text-center">
              ¿Deseas agregar otro?
            </p>
            <Button variant="dark" className="text" onClick={handleClick}>
              Agregar otro artículo
            </Button>
          </Col>
          <Col xs={12} className="my-5">
            <Link to={`/profile/${user.username}`}>
              <Button variant="dark" className="text buttonP">
                Ir a mi perfil
              </Button>
            </Link>
          </Col>
        </RubberBand>
      </Row>
    </Container>
  );
};

export default SuccessRegistration;
