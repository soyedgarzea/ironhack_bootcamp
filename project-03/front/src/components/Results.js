import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import LendService from "../services/lendService";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import Zoom from "react-reveal/Zoom";
import Result from "./ui/Result";

const Results = (props) => {
  const { stuff } = useParams();

  const [searchState, updateSearchState] = useState("");

  const [toggleState, updateToggleState] = useState(false);

  const [stuffsResultState, updateStuffResultState] = useState([]);

  const handleChange = (e) => {
    const { value } = e.target;
    updateSearchState(value);
  };

  useEffect(() => {
    getResults(stuff);
  }, []);

  const getResults = (stuff) => {
    const lendService = new LendService();

    lendService.getSearch(stuff).then((res) => {
      updateStuffResultState([...res.data]);
      updateToggleState(true);
    });
  };

  return (
    <Container className="result-page" fluid>
      <Row className="justify-content-center align-items-center">
        <Col xs={11} className="results-col">
          <p className="titles">Busca de nuevo</p>
          <div className="form-results-box">
            <InputGroup>
              <FormControl
                placeholder="¿Qué estás buscando?"
                aria-label="¿Qué estás buscando?"
                aria-describedby="basic-addon2"
                name="search"
                onChange={(e) => handleChange(e)}
                className="text"
              />
              <InputGroup.Append>
                <Button
                  variant="dark"
                  className="text"
                  onClick={() => getResults(searchState)}
                >
                  Buscar
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-around align-items-center">
        {stuffsResultState.length > 0 ? (
          stuffsResultState.map((e, i) => {
            return (
              <Col md={3} className="m-3" key={i}>
                <Zoom collapse when={toggleState}>
                  <Result result={e} />
                </Zoom>
              </Col>
            );
          })
        ) : (
          <Col md={12} className="m-3">
            <p className="titles text-center h3 my-5">
              Parece que aún no tenemos este artículo
            </p>
            <p className="titles text-center h4 my-5">
              Realiza una nueva búsqueda
            </p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Results;
