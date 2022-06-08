import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import { deleteTask } from "../redux/apiRequest";

export default function ModalDeleteComponent({
  value,
  keyModal,
  closeModal,
  refreshPages,
  accessToken,
  axiosJwt,
}) {
  const handleClose = () => {
    closeModal((prev) => (prev.status = false));
  };
  const handleSubmit = () => {
    closeModal((prev) => (prev.status = false));
    (async function () {
      await deleteTask(value.id,accessToken,axiosJwt);
      refreshPages((prev) => prev + 1);
    })();
  };
  return (
    <>
      {value.id === keyModal && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`delete task ${value.id}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body></Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}
