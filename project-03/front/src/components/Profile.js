import React, { useState, useEffect, useContext } from "react";
import UserContext from "../utils/user.context";
import { Link, useParams, useHistory, useLocation } from "react-router-dom";
import LendService from "../services/lendService";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import ModalLoader from "./ui/ModalLoader";
import ModalDeleteStuff from "./ui/ModalDeleteStuff";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

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
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
  },
}));

const Profile = () => {
  const { username } = useParams();

  const location = useLocation();

  const history = useHistory();

  const classes = useStyles();

  const [loadingState, updateLoadingState] = useState(true);

  const [userInfoState, updateUserInfoState] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    stuffs: [],
    profilePic: "",
    since: "",
    recommendations: [],
  });

  const [ownerState, updateOwnerState] = useState();

  const [ownerStuffState, updateOwnerStuffState] = useState([]);

  const [ownerRecommendationState, updateOwnerRecommendationState] = useState(
    []
  );

  const [boxRecommendationState, updateBoxRecommendatioState] = useState(false);

  const [recommendationState, updateRecommendationState] = useState({});

  const [recommSentState, updateRecommSentState] = useState(false);

  const [deleteModalState, updateDeleteModalState] = useState(false);

  const [indexStuffState, updateIndexStuffState] = useState(0);

  const { user } = useContext(UserContext);

  const showBox = () => {
    if (user) {
      updateRecommendationState(
        Object.assign({}, recommendationState, { name: user._id })
      );
    }
    updateBoxRecommendatioState(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateRecommendationState(
      Object.assign({}, recommendationState, { [name]: value })
    );
  };

  const handleShow = (e) => {
    updateIndexStuffState(e.target.id);
    updateDeleteModalState(true);
  };

  const handleClose = () => updateDeleteModalState(false);

  const handleDelete = async () => {
    updateLoadingState(true);

    const lendService = new LendService();

    await lendService.deleteStuff(ownerStuffState[indexStuffState]._id);

    updateIndexStuffState(0);
    handleClose();
    getProfileInfo();
  };

  const toggleAvailable = async (e) => {
    const lendService = new LendService();

    await lendService.toggleAvailability(e.target.name, e.target.value);

    getProfileInfo();
  };

  const sendRecom = () => {
    const lendService = new LendService();

    updateLoadingState(true);

    lendService
      .sendRecommendation(recommendationState, userInfoState._id)
      .then((res) => {
        updateRecommendationState({});
        getProfileInfo();
        updateBoxRecommendatioState(false);
        updateRecommSentState(true);
        updateLoadingState(false);
      });
  };

  const getProfileInfo = async () => {
    const lendService = new LendService();

    const res = await lendService.getProfile(username);

    if (res.data.profile) {
      updateUserInfoState(res.data.profile);
      updateOwnerState(res.data.owner);
      updateOwnerStuffState([...res.data.stuffs]);
      updateOwnerRecommendationState([...res.data.recom]);
      updateLoadingState(false);
    } else {
      history.push("/*");
    }
  };

  const isReady = () => {
    if (
      recommendationState.details &&
      recommendationState.details.length > 0 &&
      recommendationState.rate
    ) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getProfileInfo();
  }, [location]);

  return (
    <Container fluid className="profile-page">
      {loadingState ? (
        <ModalLoader show={loadingState} />
      ) : (
        <Row className="justify-content-center align-items-center">
          <Col xs={12} className="profile-main-row">
            {ownerState && !userInfoState.validatedProfile && (
              <Row className="profile-box-row p-2">
                <div class="alert alert-danger" role="alert">
                  <p className="titles m-0 h3">
                    Tu correo aún no ha sido validado
                  </p>
                </div>
              </Row>
            )}
            <Row className="profile-box-row p-2">
              <p className="text-white text-center h4 titles m-0">
                Miembro desde : {userInfoState.since}
              </p>
            </Row>
            <Row className="profile-box-row px-md-5 px-3 py-3">
              <Col
                xs={11}
                md={2}
                className="d-flex justify-content-center align-items-center"
              >
                <Avatar
                  className={classes.large}
                  src={userInfoState.profilePic}
                />
              </Col>
              <Col xs={11} md={4}>
                <p className="text-white h2 titles">{userInfoState.name}</p>
                <p className="text-white h3 titles">{userInfoState.username}</p>
                <p className="text-white h4 text">
                  Correo : {userInfoState.email}
                </p>
                <p className="text-white h4 text">
                  Celular :{" "}
                  {userInfoState.phone
                    ? userInfoState.phone
                    : "Aún no tienes un número registrado"}
                </p>
              </Col>
              <Col xs={11} md={4}>
                <p className="text-white h5 my-2 text">
                  Artículos totales : {userInfoState.stuffs.length}
                </p>
              </Col>
            </Row>
            {ownerState ? (
              <Row className="profile-box-row p-3">
                <Col
                  xs={11}
                  md={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Link to={`/edit-profile/${username}`}>
                    <Button variant="dark" size="lg" className="buttonP">
                      Editar perfil
                    </Button>
                  </Link>
                </Col>
              </Row>
            ) : (
              <Row className="profile-box-row p-3">
                <Col
                  xs={11}
                  md={3}
                  className="d-flex justify-content-center align-items-center"
                >
                  <Link to={`/contact/${username}`}>
                    <Button variant="dark" size="lg" className="buttonP">
                      Contactar
                    </Button>
                  </Link>
                </Col>
              </Row>
            )}
          </Col>
          <Col xs={11} className="profile-row my-3">
            <Row className="profile-box-row p-3">
              <Col xs={11}>
                <p className="text-dark h2 titles my-3">Lista de Artículos</p>
              </Col>
              {userInfoState.stuffs && userInfoState.stuffs.length > 0 ? (
                ownerStuffState.map((e, i) => {
                  return (
                    <Col xs={11} className="profile-list py-3">
                      <Image
                        src={e.imgPath}
                        width="100px"
                        height="100px"
                        rounded
                        className="img-stuff-profile"
                      />
                      <p className="text-dark h2 titles">{e.name}</p>
                      <p className="h4 text-dark titles">
                        Estatus :
                        {e.available ? (
                          <span className="text-dark rounded p-3 span-available">
                            Disponible
                          </span>
                        ) : (
                          <span className="rounded p-3 span-lend">
                            Préstamo
                          </span>
                        )}
                      </p>
                      {ownerState &&
                        (e.available ? (
                          <Button
                            variant="warning"
                            size="lg"
                            name={e._id}
                            onClick={toggleAvailable}
                            className="buttonP"
                          >
                            Prestar
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            size="lg"
                            name={e._id}
                            onClick={toggleAvailable}
                            className="buttonP"
                          >
                            Devolver
                          </Button>
                        ))}
                      {ownerState && (
                        <Button
                          variant="danger"
                          size="lg"
                          id={i}
                          onClick={handleShow}
                          className="buttonP"
                        >
                          Eliminar Artículo
                        </Button>
                      )}
                    </Col>
                  );
                })
              ) : (
                <Col xs={11} className="profile-list py-3">
                  <p className="titles text-dark h5">Aún no hay artículos</p>
                </Col>
              )}
              {deleteModalState && (
                <ModalDeleteStuff
                  show={deleteModalState}
                  handleClose={handleClose}
                  src={ownerStuffState[indexStuffState]}
                  handleDelete={handleDelete}
                />
              )}
              {ownerState ? (
                <Col
                  xs={11}
                  className="d-flex justify-content-around align-items-center py-3"
                >
                  <Link to="/add-new-stuff">
                    <Button variant="dark" size="lg" className="buttonP">
                      Agrega un nuevo artículo
                    </Button>
                  </Link>
                </Col>
              ) : (
                <Col
                  xs={11}
                  className="d-flex justify-content-around align-items-center py-3"
                >
                  <Link to="/">
                    <Button variant="dark" size="lg" className="buttonP">
                      Buscar un nuevo artículo
                    </Button>
                  </Link>
                </Col>
              )}
            </Row>
          </Col>
          <Col xs={11} className="profile-row my-3">
            <Row className="justify-content-around align-items-center p-3">
              <Col xs={11}>
                <p className="text-dark h2 titles my-3">Recomendaciones</p>
              </Col>
              <Col xs={11}>
                <Row className="justify-content-around align-items-center flex-wrap">
                  {userInfoState.recommendations &&
                  userInfoState.recommendations.length > 0 ? (
                    ownerRecommendationState.map((e) => {
                      return (
                        <Col
                          xs={11}
                          md={3}
                          className="py-3 rate-profile rounded border border-dark"
                        >
                          <div className="profile-recommendation ">
                            <p className="text-dark h4 titles">{e.username}</p>
                            <p className="text-dark h6 text text-center">
                              {e.details}
                            </p>
                            <p className="text-dark text text-center">
                              {e.date}
                            </p>
                            <p className="text-dark h6 text text-center">
                              Calificación : {e.rate}
                            </p>
                          </div>
                        </Col>
                      );
                    })
                  ) : (
                    <Col xs={11} className="profile-list py-3">
                      <p className="titles text-dark h5">
                        Aún no hay Recomendaciones
                      </p>
                    </Col>
                  )}
                </Row>
              </Col>
              {boxRecommendationState ? (
                <>
                  {user ? (
                    <>
                      {user.username !== userInfoState.username && (
                        <>
                          <Col xs={11} className="my-3 ">
                            <p className="titles text-dark h3 text-center">
                              Agrega tu recomendación
                            </p>
                          </Col>
                          <Col
                            xs={11}
                            className="my-3 d-flex justify-content-around align-items-center"
                          >
                            <Form.Row className="contact-form justify-content-around">
                              <Col className="contact-col">
                                <Form.Label className="text text-dark">
                                  Nombre
                                </Form.Label>
                                <Form.Control
                                  name="name"
                                  size="lg"
                                  type="text"
                                  value={user.name}
                                  className="text"
                                  className="border border-dark"
                                />
                              </Col>
                              <Col className="contact-col">
                                <Form.Label className="text text-dark">
                                  Descripción
                                </Form.Label>
                                <Form.Control
                                  as="textarea"
                                  rows="3"
                                  name="details"
                                  size="lg"
                                  type="text"
                                  placeholder="Excelentes artículos"
                                  className="text"
                                  onChange={handleChange}
                                  className="border border-dark"
                                />
                              </Col>
                              <Col className="contact-col">
                                <Form.Label className="text text-dark">
                                  Calificación
                                </Form.Label>
                                <Form.Control
                                  as="select"
                                  multiple
                                  onChange={handleChange}
                                  name="rate"
                                  className="border border-dark"
                                >
                                  <option value="1" className="text">
                                    1
                                  </option>
                                  <option value="2" className="text">
                                    2
                                  </option>
                                  <option value="3" className="text">
                                    3
                                  </option>
                                  <option value="4" className="text">
                                    4
                                  </option>
                                  <option value="5" className="text">
                                    5
                                  </option>
                                </Form.Control>
                              </Col>
                            </Form.Row>
                          </Col>
                          <Col
                            xs={11}
                            className="my-3 d-flex justify-content-center align-items-center"
                          >
                            {isReady() ? (
                              <Button
                                variant="dark"
                                size="lg"
                                onClick={sendRecom}
                                className="buttonP"
                              >
                                Enviar
                              </Button>
                            ) : (
                              <Button
                                disabled
                                variant="dark"
                                size="lg"
                                onClick={sendRecom}
                              >
                                Enviar
                              </Button>
                            )}
                          </Col>
                        </>
                      )}
                    </>
                  ) : (
                    <Col
                      xs={11}
                      className="my-3 d-flex justify-content-center align-items-center"
                    >
                      <p className="titles text-dark h3 text-center">
                        Inicia sesión para dejar tus comentarios
                      </p>
                    </Col>
                  )}
                </>
              ) : (
                <>
                  {user ? (
                    <>
                      {user.username !== userInfoState.username && (
                        <>
                          {recommSentState ? (
                            <Col
                              xs={11}
                              className="my-3 d-flex justify-content-center align-items-center"
                            >
                              <p className="titles text-dark h3 text-center">
                                Tu recomendación ha sido agregada
                              </p>
                            </Col>
                          ) : (
                            <Col
                              xs={11}
                              className="my-3 d-flex justify-content-center align-items-center"
                            >
                              <Button
                                variant="dark"
                                size="lg"
                                onClick={showBox}
                                className="buttonP"
                              >
                                Agregar una recomendación
                              </Button>
                            </Col>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <Col
                      xs={11}
                      className="my-3 d-flex justify-content-center align-items-center"
                    >
                      <Button
                        variant="dark"
                        size="lg"
                        onClick={showBox}
                        className="buttonP"
                      >
                        Agregar una recomendación
                      </Button>
                    </Col>
                  )}
                </>
              )}
            </Row>
          </Col>
          {!ownerState && (
            <Col xs={11} className="my-3">
              <Row className="p-3 justify-content-center align-items-center">
                <Link to={`/contact/${username}`}>
                  <Button variant="dark" size="lg" className="buttonP">
                    Contactar
                  </Button>
                </Link>
              </Row>
            </Col>
          )}
        </Row>
      )}
    </Container>
  );
};

export default Profile;
