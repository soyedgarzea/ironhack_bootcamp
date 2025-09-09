import React from "react";
import { Button, Image, Modal } from "react-bootstrap";

const ModalDeleteStuff = ({ show, handleClose, src, handleDelete }) => {
  return (
    <Modal show={show} onHide={handleClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>¿Estás seguro de borrar este artículo?</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex justify-content-center align-items-center">
        <Image
          src={src.imgPath}
          width="100px"
          height="100px"
          rounded
          className="mx-3 img-stuff-profile"
        />
        <p className="titles mx-3">{src.name}</p>
        <p className="text mx-3">{src.available ? "Disponible" : "Préstamo"}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="dark" onClick={handleClose} className="buttonP">
          Cancelar
        </Button>
        <Button variant="danger" onClick={handleDelete} className="buttonP">
          Eliminar Artículo
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteStuff;
