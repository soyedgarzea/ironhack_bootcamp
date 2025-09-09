import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";

const Home = (props) => {
  const [searchState, updateSearchState] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    updateSearchState(value);
  };

  return (
    <Container className="home" fluid>
      <Row className="search-row justify-content-center align-items-center">
        <Col xs={11} md={9} className="search-col">
          <p>Encuentra eso que necesitas el día de hoy</p>
          <div className="form-box">
            <InputGroup className="mb-3">
              <FormControl
                placeholder="¿Qué estás buscando?"
                aria-label="¿Qué estás buscando?"
                aria-describedby="basic-addon2"
                onChange={(e) => handleChange(e)}
                name="search"
              />
              <InputGroup.Append>
                <Link to={`/results/${searchState}`}>
                  <Button variant="dark" className="buttonP">
                    Buscar
                  </Button>
                </Link>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
