import React from "react";
import { Modal, Button } from "react-bootstrap";

interface DeleteModalProps {
  show: boolean;
  handleClose: () => void;
  handleDeleteConfirm: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  show,
  handleClose,
  handleDeleteConfirm,
}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this student?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeleteConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
