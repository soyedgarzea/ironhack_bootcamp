import React, { useState } from "react";
import LendService from "../services/lendService";
import SuccessStuffAdded from "./ui/SuccessStuffAdded";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import RubberBand from "react-reveal/RubberBand";
import ModalLoader from "./ui/ModalLoader";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { TextField, Grid } from "@material-ui/core";
import {
  Assignment,
  Description,
  MonetizationOn,
  AddCircle,
  PhotoCamera,
} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import ButtonM from "@material-ui/core/Button";

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

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

const AddNewStuff = () => {
  const [newStuffState, updateNewStuffState] = useState({});

  const [stuffFileState, updateStuffFileState] = useState();

  const [show, setShow] = useState(false);

  const [successState, updateSuccessState] = useState(false);

  const [loadingState, updateLoadingState] = useState(false);

  const [validatePriceState, updateValidatePriceState] = useState({
    realPrice: true,
    priceLend: true,
  });

  const classes = useStyles();

  const handleClose = () => setShow(false);

  const handleSave = () => {
    setShow(false);

    updateLoadingState(true);

    const lendService = new LendService();

    const uploadImg = new FormData();

    uploadImg.append("img", newStuffState.img);

    lendService.uploadPhoto(uploadImg).then((res) => {
      updateNewStuffState(
        Object.assign({}, newStuffState, { img: res.data.secure_url })
      );
      updateLoadingState(false);
    });
  };

  const handleShow = () => {
    updateLoadingState(false);
    setShow(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateNewStuffState(Object.assign({}, newStuffState, { [name]: value }));
  };

  const handleFile = (e) => {
    if (e.target.files[0]) {
      updateLoadingState(true);
      updateStuffFileState(URL.createObjectURL(e.target.files[0]));
      updateNewStuffState(
        Object.assign({}, newStuffState, { img: e.target.files[0] })
      );
      handleShow();
    }
  };

  const validatePrice = (e) => {
    const { name, value } = e.target;

    const reg = new RegExp(/^[0-9]*$/);

    if (reg.test(value)) {
      updateNewStuffState(Object.assign({}, newStuffState, { [name]: value }));
      updateValidatePriceState(
        Object.assign({}, validatePriceState, { [name]: true })
      );
    } else {
      updateValidatePriceState(
        Object.assign({}, validatePriceState, { [name]: false })
      );
    }
  };

  const isReady = () => {
    if (
      newStuffState.name &&
      newStuffState.name !== "" &&
      newStuffState.description &&
      newStuffState.description !== "" &&
      newStuffState.quantity &&
      newStuffState.quantity !== "" &&
      newStuffState.realPrice &&
      newStuffState.realPrice !== 0 &&
      newStuffState.priceLend &&
      newStuffState.priceLend !== 0 &&
      newStuffState.img &&
      newStuffState.img !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleAdd = () => {
    updateLoadingState(true);

    const lendService = new LendService();

    lendService.newStuff(newStuffState).then((res) => {
      updateLoadingState(false);
      updateSuccessState(true);
    });
  };

  return (
    <>
      {successState ? (
        <SuccessStuffAdded updateModal={updateSuccessState} />
      ) : (
        <Container
          fluid
          className="addStuff-page d-flex justify-content-center align-items-center"
        >
          <ModalLoader show={loadingState} />
          <Row className="my-5 addStuff-row">
            <RubberBand>
              <Col xs={11} lg={4} className="addStuff-box">
                <p className="h3 text-center titles">
                  Agrega un nuevo artículo
                </p>
                <Row className="justify-content-center align-items-center my-5">
                  <Col xs={8} className="my-2">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Assignment />
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
                  <Col xs={8} className="my-2">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <Description />
                      </Grid>
                      <Grid item>
                        <CssTextField
                          id="input-with-icon-grid"
                          label="Descripción"
                          className="text"
                          name="description"
                          multiline
                          rows={4}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={8} className="my-2">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <AddCircle />
                      </Grid>
                      <Grid item>
                        <CssTextField
                          id="input-with-icon-grid"
                          label="Cantidad"
                          className="text"
                          name="quantity"
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={8} className="my-2">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <MonetizationOn />
                      </Grid>
                      <Grid item>
                        {validatePriceState.realPrice ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Precio Real"
                            className="text"
                            name="realPrice"
                            onChange={validatePrice}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Precio Real"
                            className="text"
                            name="realPrice"
                            onChange={validatePrice}
                            helperText="Ingresa solo números"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={8} className="my-2">
                    <Grid container spacing={1} alignItems="center">
                      <Grid item>
                        <MonetizationOn />
                      </Grid>
                      <Grid item>
                        {validatePriceState.priceLend ? (
                          <CssTextField
                            id="input-with-icon-grid"
                            label="Precio Préstamo"
                            className="text"
                            name="priceLend"
                            onChange={validatePrice}
                          />
                        ) : (
                          <CssTextField
                            error
                            id="input-with-icon-grid"
                            label="Precio Préstamo"
                            className="text"
                            name="priceLend"
                            onChange={validatePrice}
                            helperText="Ingresa solo números"
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Col>
                  <Col xs={8}>
                    <div className={classes.root}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        name="photo"
                        type="file"
                        onChange={handleFile}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        name="img"
                        type="file"
                        onChange={handleFile}
                      />
                      <label htmlFor="contained-button-file">
                        <ButtonM
                          variant="contained"
                          color="primary"
                          component="span"
                          className="buttonP"
                        >
                          Subir imagen
                        </ButtonM>
                      </label>
                    </div>
                  </Col>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Imagen seleccionada</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="d-flex justify-content-center align-items-center">
                      <img
                        className="edit-profile-modal rounded-circle"
                        src={stuffFileState}
                        alt="Imagen cargada por el usuario"
                      />
                    </Modal.Body>
                    <Modal.Footer>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-file"
                        name="photo"
                        type="file"
                        onChange={handleFile}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        name="img"
                        type="file"
                        onChange={handleFile}
                      />
                      <label htmlFor="contained-button-file">
                        <ButtonM
                          variant="contained"
                          color="primary"
                          component="span"
                          className="buttonP"
                        >
                          Elegir otra imagen
                        </ButtonM>
                      </label>
                      <Button
                        variant="primary"
                        onClick={handleSave}
                        className="buttonP"
                      >
                        Guardar imagen
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Col
                    xs={8}
                    className="d-flex justify-content-start align-items-center"
                  >
                    {isReady() ? (
                      <Button
                        variant="dark"
                        className="text buttonP"
                        onClick={handleAdd}
                      >
                        Agregar artículo
                      </Button>
                    ) : (
                      <Button
                        variant="dark"
                        className="text"
                        disabled
                        onClick={handleAdd}
                      >
                        Agregar artículo
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

export default AddNewStuff;
