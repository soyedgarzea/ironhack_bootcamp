import React, { useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../utils/user.context";
import LendService from "../services/lendService";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import moment from "moment";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import SelectCalendar from "./ui/SelectCalendar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  medium: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Contact = () => {
  const { username } = useParams();

  const classes = useStyles();

  const [userState, updateUserState] = useState({
    name: "",
    email: "",
    phone: "",
    startDate: new Date(),
    finalDate: moment().add(1, "days").toDate(),
  });

  const [ownerState, updateOwnerState] = useState({});

  const [ownerStuffState, updateOwnerStuffState] = useState([]);

  const [stuffSelectedState, updateStuffSelectedState] = useState([]);

  const [totalPriceState, updateTotalPriceState] = useState([0]);

  const { user } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateUserState(Object.assign({}, userState, { [name]: value }));
  };

  const handleCheck = (e) => {
    if (user) {
      updateUserState(
        Object.assign({}, userState, {
          name: user.name,
          email: user.email,
          phone: user.phone,
        })
      );
    }
    const check = e.target.checked;
    const stuff = e.target.value;
    updateStuffSelectedState([
      ...stuffSelectedState,
      (stuffSelectedState[stuff].checked = check),
    ]);
    if (check) {
      totalPrices();
    } else {
      updateTotalPriceState([
        ...totalPriceState,
        -ownerStuffState[stuff].priceLend,
      ]);
    }
  };

  const handleStartDate = (name) => {
    updateUserState(Object.assign({}, userState, { startDate: name }));
  };

  const handleEndDate = (name) => {
    updateUserState(Object.assign({}, userState, { finalDate: name }));
  };

  const getProfileInfo = async () => {
    const lendService = new LendService();

    const res = await lendService.getContact(username);

    updateOwnerState(Object.assign({}, ownerState, res.data.profile));
    updateOwnerStuffState([...ownerStuffState, ...res.data.stuffs]);
    updateStuffSelectedState(
      res.data.stuffs.map((stuff, index) => {
        return { checked: false };
      })
    );
  };

  const totalPrices = () => {
    stuffSelectedState.forEach((e, i) => {
      if (e.checked === true) {
        updateTotalPriceState([
          ...totalPriceState,
          ownerStuffState[i].priceLend,
        ]);
      }
    });
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  const isReady = () => {
    if (
      userState.name !== "" &&
      userState.email !== "" &&
      userState.phone !== "" &&
      totalPriceState.length > 1 &&
      userState.startDate !== userState.finalDate
    ) {
      for (let i = 0; i < stuffSelectedState.length - 1; i++) {
        if (stuffSelectedState[i].checked === true) {
          return true;
        }
      }
    } else {
      return false;
    }
  };

  const handleContactEmail = () => {
    let nameStuffs = "";

    stuffSelectedState.forEach((e, i) => {
      if (e.checked === true) {
        nameStuffs += `%20${ownerStuffState[i].name}`;
      }
    });

    const message = `Hola,%20soy%20${
      userState.name
    }%20y%20estoy%20interesado%20en%20estos%20artículos:${nameStuffs}.%20Las%20fechas%20estimadas%20son%20del%20${moment(
      userState.startDate
    )
      .locale("es")
      .format("LL")}
      %20al%20${moment(userState.finalDate).locale("es").format("LL")}`;

    var link = `mailto:${ownerState.email}?Subject=Hola,%20${ownerState.name},estoy%20interesado%20en%20unos%20artículos&body=${message}`;
    window.location.href = link;
  };

  const handleContactWhats = () => {
    let nameStuffs = "";

    stuffSelectedState.forEach((e, i) => {
      if (e.checked === true) {
        nameStuffs += `%20${ownerStuffState[i].name}`;
      }
    });

    const message = `Hola,%20soy%20${
      userState.name
    }%20y%20estoy%20interesado%20en%20estos%20artículos:${nameStuffs}.%20Las%20fechas%20estimadas%20son%20del%20${moment(
      userState.startDate
    )
      .locale("es")
      .format("LL")}%20al%20${moment(userState.finalDate)
      .locale("es")
      .format("LL")}`;

    const url = `https://api.whatsapp.com/send?phone=52${ownerState.phone}&text=${message}&source=&data=`;

    window.open(url, "_blank");
  };

  return (
    <Container fluid className="contact-page">
      <Row className="justify-content-around align-items-start contact-main-row">
        <Col md={8} xs={12}>
          <Row>
            <Col xs={12} className="contact-cols p-3 my-3">
              <p className="titles text-white h5">Información sobre ti</p>
              <Form.Row className="contact-form">
                <Col className="contact-col">
                  <Form.Label className="text text-white">Nombre</Form.Label>
                  <Form.Control
                    name="name"
                    size="lg"
                    type="text"
                    placeholder={user ? user.name : "Juan Pérez"}
                    className="text"
                    defaultValue={user ? user.name : ""}
                    onChange={handleChange}
                  />
                </Col>
                <Col className="contact-col">
                  <Form.Label className="text text-white">Correo</Form.Label>
                  <Form.Control
                    name="email"
                    size="lg"
                    type="email"
                    placeholder={user ? user.email : "juan.perez@hotmail.com"}
                    className="text"
                    defaultValue={user ? user.email : ""}
                    onChange={handleChange}
                  />
                </Col>
                <Col className="contact-col">
                  <Form.Label className="text text-white">Teléfono</Form.Label>
                  <Form.Control
                    name="phone"
                    size="lg"
                    type="phone"
                    placeholder={user ? user.phone : "5544332211"}
                    className="text"
                    defaultValue={user ? user.phone : ""}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="contact-cols p-3 my-3">
              <Form.Row className="contact-form">
                <Col className="contact-col">
                  <p className="titles text-white h5">
                    ¿En qué artículos estás interesado?
                  </p>
                  <FormGroup row>
                    <div className="d-flex justify-content-around align-items-center flex-wrap">
                      {ownerStuffState.map((e, i) => {
                        return (
                          <div className="m-2">
                            <FormControlLabel
                              className="text text-dark m-0 bg-white rounded px-3 py-2"
                              control={
                                <Checkbox
                                  onChange={handleCheck}
                                  name={e.name}
                                  className="p-0"
                                />
                              }
                              label={e.name}
                              key={i}
                              id={i}
                              value={i}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </FormGroup>
                </Col>
              </Form.Row>
            </Col>
          </Row>
          <Row>
            <Col xs={12} className="contact-cols p-3 my-3">
              <p className="titles text-white h4">
                ¿En qué fechas te gustaría solicitar el préstamo?
              </p>
              <Form.Row className="contact-form">
                <Col className="contact-col">
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <Grid container justify="space-around">
                      <SelectCalendar
                        name="startDate"
                        label="Fecha inicial"
                        value={userState.startDate}
                        onChange={handleStartDate}
                      />
                      <SelectCalendar
                        name="finalDate"
                        label="Fecha final"
                        value={userState.finalDate}
                        onChange={handleEndDate}
                      />
                    </Grid>
                  </MuiPickersUtilsProvider>
                </Col>
              </Form.Row>
            </Col>
          </Row>
        </Col>
        <Col md={3} xs={11} className="contact-cols my-3 p-3">
          <p className="titles text-white h4 my-3">
            Información sobre el pedido
          </p>
          <div className="d-flex justify-content-between align-items-center px-3">
            <Avatar
              className={classes.medium}
              src={ownerState ? ownerState.profilePic : ""}
            />
            <p className="titles h5 text-white">{ownerState.name}</p>
          </div>
          <p className="titles text-white h4 my-3">Artículo elegido</p>
          {stuffSelectedState.map((e, i) => {
            if (e.checked === true) {
              return (
                <div className="d-flex justify-content-between align-items-center px-3 my-2">
                  <img
                    src={ownerStuffState[i].imgPath}
                    className="contact-article-img rounded"
                    alt={ownerStuffState[i].name}
                  />
                  <p className="text text-white h6">
                    {ownerStuffState[i].name}
                  </p>
                  <p className="text text-white h6">
                    ${ownerStuffState[i].priceLend}
                  </p>
                </div>
              );
            }
          })}
          <p className="titles text-white h4 my-3">Total estimado</p>
          <p className="text text-white h5 text-center">
            ${totalPriceState.reduce((a, b) => a + b)}
          </p>
        </Col>
      </Row>
      <Row className="justify-content-around align-items-center">
        <Col xs={12} className="contact-important-cols p-5">
          <p className="titles h3 text-white text-center">
            El costo de los artículos y el tiempo de préstamo dependen del
            propietario por lo tanto puede variar a la información mostrada.
            LEND no interviene en los acuerdos a los que se lleguen.
          </p>
        </Col>
      </Row>
      <Row className="justify-content-around align-items-center my-3">
        <Col xs={11} className=" p-3">
          <p className="titles h3 text-dark text-center">Continuar mediante:</p>
        </Col>
      </Row>
      <Row className="justify-content-around align-items-center my-5">
        <Col xs={6} className="d-flex justify-content-around alig-items-center">
          {isReady() ? (
            <Button
              variant="dark"
              className="text p-2 buttonP"
              onClick={handleContactEmail}
            >
              <MailOutlineIcon className="mr-3" />
              Correo
            </Button>
          ) : (
            <Button variant="dark" className="text p-2 buttonP" disabled>
              <MailOutlineIcon className="mr-3" />
              Correo
            </Button>
          )}
        </Col>
        <Col xs={6} className="d-flex justify-content-around alig-items-center">
          {isReady() ? (
            <Button
              variant="dark"
              className="text p-2 buttonP"
              onClick={handleContactWhats}
            >
              <WhatsAppIcon className="mr-3" />
              WhatsApp
            </Button>
          ) : (
            <Button variant="dark" className="text p-2 buttonP" disabled>
              <WhatsAppIcon className="mr-3" />
              WhatsApp
            </Button>
          )}
        </Col>
      </Row>
      <Row className="justify-content-around align-items-center my-3">
        <Col xs={11} className="p-3">
          <p className="titles h3 text-dark text-center">
            Sigue buscando más artículos
          </p>
        </Col>
        <Col
          xs={11}
          className="p-3 d-flex justify-content-center align-items-center"
        >
          <Link to="/">
            <Button variant="dark" className="text p-2 buttonP">
              Nueva Búsqueda
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
