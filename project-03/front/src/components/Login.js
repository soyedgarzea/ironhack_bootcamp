import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import LendService from "../services/lendService";
import UserContext from "../utils/user.context";
import { Container, Row, Col, Button } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";
import { withStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";
import { MailOutline, VpnKey } from "@material-ui/icons";

const CssTextField = withStyles({
  root: {
    color: "black",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "black",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "black",
      },
      "&.Mui-focused fieldset": {
        borderColor: "black",
      },
    },
  },
})(TextField);

const Login = () => {
  const history = useHistory();

  const [userState, updateUserState] = useState({
    credential: "",
    password: "",
  });

  const [errorUserState, updateErrorUserState] = useState(false);

  const [errorPassState, updateErrorPassState] = useState(false);

  const { updateUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserState(Object.assign({}, userState, { [name]: value }));
  };

  const isReady = () => {
    if (userState.credential !== "" && userState.password !== "") {
      return true;
    } else {
      return false;
    }
  };

  const handleLogin = () => {
    const lendService = new LendService();

    lendService.logIn(userState).then((res) => {
      if (res.data.messagePass) {
        updateErrorUserState(false);
        return updateErrorPassState(true);
      }
      if (res.data.messageUser) {
        return updateErrorUserState(true);
      }
      updateUserState({ credential: "", password: "" });
      updateUser(res.data);
      history.push(`/`);
    });
  };

  return (
    <Container fluid className="login-page d-flex align-items-center">
      <Row className="my-5 login-row">
        <RubberBand>
          <Col xs={10} lg={6} className="login-box">
            <p className="h3 text-center titles">Inicia sesión</p>
            <Row className="justify-content-center align-items-center">
              <Col
                xs={11}
                md={8}
                lg={10}
                className="d-flex justify-content-around align-items-center my-3"
              >
                <MailOutline />
                <CssTextField
                  id="input-with-icon-grid"
                  label="Correo"
                  className="text"
                  name="credential"
                  onChange={handleChange}
                />
              </Col>

              <Col
                xs={11}
                md={8}
                lg={10}
                className="d-flex justify-content-around align-items-center my-3"
              >
                <VpnKey />
                {errorPassState ? (
                  <CssTextField
                    error
                    id="input-with-icon-grid"
                    label="Contraseña"
                    className="text"
                    type="password"
                    name="password"
                    onChange={handleChange}
                    helperText="Tu contraseña no es correcta"
                  />
                ) : (
                  <CssTextField
                    id="input-with-icon-grid"
                    label="Contraseña"
                    className="text"
                    type="password"
                    name="password"
                    onChange={handleChange}
                  />
                )}
              </Col>

              {errorUserState && (
                <Col
                  xs={11}
                  className="d-flex justify-content-around align-items-center my-3"
                >
                  <p className="h5 text-center titles">
                    No hemos encontrado este usuario
                  </p>
                </Col>
              )}

              <Col
                xs={11}
                className="d-flex justify-content-around align-items-center my-3"
              >
                {isReady() ? (
                  <Button
                    variant="dark"
                    className="text buttonP"
                    onClick={handleLogin}
                  >
                    Inicia sesión
                  </Button>
                ) : (
                  <Button variant="dark" className="text" disabled>
                    Inicia sesión
                  </Button>
                )}
              </Col>
            </Row>
          </Col>
        </RubberBand>
      </Row>
    </Container>
  );
};

export default Login;
