import React, { useState } from "react";
import SuccessRegistration from "./ui/SuccessRegistration";
import LendService from "../services/lendService";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import {
  AccountCircle,
  Face,
  MailOutline,
  VpnKey,
  PhoneIphoneOutlined,
} from "@material-ui/icons";

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

const SignUp = () => {
  const [userState, updateUserState] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: Boolean,
  });

  const [successState, updateSuccessState] = useState(false);

  const [validationState, updateValidationState] = useState({
    email: true,
    username: true,
    phone: true,
  });

  const [validationWayState, updateValidationWayState] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserState(Object.assign({}, userState, { [name]: value }));
  };

  const handleCheckbox = (e) => {
    const { checked } = e.target;
    updateUserState(Object.assign({}, userState, { terms: checked }));
  };

  const isReady = () => {
    if (
      userState.name !== "" &&
      userState.username !== "" &&
      validationState.username === true &&
      userState.email !== "" &&
      validationState.email === true &&
      userState.phone !== "" &&
      userState.password !== "" &&
      userState.confirmPassword !== "" &&
      userState.terms === true
    ) {
      if (userState.password === userState.confirmPassword) {
        if (validationWayState.email || validationWayState.phone) {
          return true;
        } else {
          return false;
        }
      }
    }
  };

  const validateEmail = (e) => {
    const info = e.target.value.toLowerCase();
    const lendService = new LendService();

    lendService.validateEmail(info).then((res) => {
      if (res.data.status === true) {
        updateValidationState(
          Object.assign({}, validationState, { email: false })
        );
      } else {
        updateUserState(Object.assign({}, userState, { email: info }));
        updateValidationState(
          Object.assign({}, validationState, { email: true })
        );
      }
    });
  };

  const validateUsername = (e) => {
    const info = e.target.value.toLowerCase();
    const lendService = new LendService();

    lendService.validateUsername(info).then((res) => {
      if (res.data.status === true) {
        updateValidationState(
          Object.assign({}, validationState, { username: false })
        );
      } else {
        updateUserState(Object.assign({}, userState, { username: info }));
        updateValidationState(
          Object.assign({}, validationState, { username: true })
        );
      }
    });
  };

  const validatePhone = (e) => {
    const { name, value } = e.target;

    const reg = new RegExp(/^[0-9]*$/);

    if (reg.test(value)) {
      updateUserState(Object.assign({}, userState, { [name]: value }));
      updateValidationState(
        Object.assign({}, validationState, { phone: true })
      );
    } else {
      updateValidationState(
        Object.assign({}, validationState, { phone: false })
      );
    }
  };

  const handleValidation = (e) => {
    const { value, checked } = e.target;

    updateValidationWayState({ [value]: checked });
  };

  const handlePassword = () => {
    if (userState.password === userState.confirmPassword) {
      return true;
    } else {
      return false;
    }
  };

  const handleRegister = () => {
    const lendService = new LendService();

    const user = { ...userState, device: validationWayState };

    lendService.signUp(user).then((res) => {
      updateSuccessState(true);
    });
  };

  return (
    <>
      {successState ? (
        <SuccessRegistration device={validationWayState} />
      ) : (
        <Container
          fluid
          className="signup-page d-flex justify-content-center align-items-center"
        >
          <Row className="my-5 signup-row">
            <RubberBand>
              <Col xs={11} lg={4} className="signup-box">
                <p className="h3 text-center titles">Registra tu cuenta</p>
                <Row className="justify-content-center align-items-center my-5">
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Face />
                      </Grid>
                      <Grid item>
                        <CssTextField
                          id="input-with-icon-grid"
                          label="Nombre"
                          className="text"
                          name="name"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <AccountCircle />
                      </Grid>
                      <Grid item>
                        {validationState.username ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Usuario"
                            className="text"
                            name="username"
                            onChange={validateUsername}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Usuario"
                            className="text"
                            name="username"
                            onChange={validateUsername}
                            helperText="Este usuario ya está registrado"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <MailOutline />
                      </Grid>
                      <Grid item>
                        {validationState.email ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Correo"
                            className="text"
                            name="email"
                            onChange={validateEmail}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Correo"
                            className="text"
                            name="email"
                            onChange={validateEmail}
                            helperText="Este correo ya está registrado."
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <PhoneIphoneOutlined />
                      </Grid>
                      <Grid item>
                        {validationState.phone ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Teléfono"
                            className="text"
                            name="phone"
                            onChange={validatePhone}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Teléfono"
                            className="text"
                            name="phone"
                            onChange={validatePhone}
                            helperText="Ingresa solo números"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <VpnKey />
                      </Grid>
                      <Grid item>
                        {handlePassword() ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Contraseña"
                            className="text"
                            type="password"
                            name="password"
                            onChange={handleChange}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Contraseña"
                            className="text"
                            type="password"
                            name="password"
                            onChange={handleChange}
                            helperText="Las contraseñas no coinciden"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8}>
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <VpnKey />
                      </Grid>
                      <Grid item>
                        {handlePassword() ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Confirma Contraseña"
                            className="text"
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Confirma Contraseña"
                            className="text"
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            helperText="Las contraseñas no coinciden"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8} className="mt-5">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Form.Group controlId="terms" className="m-0">
                          <Form.Check
                            type="checkbox"
                            label="Acepto Términos y condiciones"
                            name="terms"
                            onChange={handleCheckbox}
                          />
                        </Form.Group>
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={10} md={8} className="my-3">
                    <p className="titles h5">Validar tu cuenta mediante:</p>
                    <Grid
                      container
                      spacing={1}
                      alignItems="center"
                      className="my-3"
                    >
                      <Grid item>
                        <Form.Check
                          controlId="email"
                          inline
                          type="radio"
                          label="Correo"
                          name="validationWay"
                          value="email"
                          id="email"
                          onChange={handleValidation}
                        />
                        <Form.Check
                          controlId="phone"
                          inline
                          type="radio"
                          label="Celular"
                          name="validationWay"
                          value="phone"
                          id="phone"
                          onChange={handleValidation}
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col
                    xs={10}
                    md={8}
                    className="d-flex justify-content-start align-items-center"
                  >
                    {isReady() ? (
                      <Button
                        variant="dark"
                        className="text"
                        onClick={handleRegister}
                      >
                        Registrar
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        className="text"
                        disabled
                        onClick={handleRegister}
                      >
                        Registrar
                      </Button>
                    )}
                  </Col>
                </Row>
              </Col>
            </RubberBand>
          </Row>
        </Container>
      )}
    </>
  );
};

export default SignUp;
