import React from "react";
import { Modal } from "react-bootstrap";
import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const CssCircularProgress = withStyles({
  root: {
    width: "250px !important",
    height: "250px !important",
    color: "white",
  },
})(CircularProgress);

const ModalLoader = ({ show }) => {
  return (
    <Modal show={show} centered backdrop="static" className="modal-loader">
      <Modal.Body className="d-flex justify-content-center align-items-center bg-dark rounded p-5">
        <CssCircularProgress />
      </Modal.Body>
    </Modal>
  );
};

export default ModalLoader;
