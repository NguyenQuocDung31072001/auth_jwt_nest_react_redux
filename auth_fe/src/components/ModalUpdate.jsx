import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalComponent({ value, keyModal, closeModal ,refreshPages}) {
  const [inputTask, setInputTask] = useState(value.name);
  const [description, setDescription] = useState(value.description);
  const [status, setStatus] = useState(value.isDone);
  const handleClose = () => {
    closeModal((prev) => (prev.status = false));
  };
  const handleSubmit = () => {
    // console.log(value.id,inputTask, description, status);
    closeModal((prev)=>prev.status=false)
    ;(async function(){
        await axios.put('http://localhost:5000/tasks',{
            id:value.id,
            name:inputTask,
            description:description,
            isDone:status==='true'
        })
        refreshPages(prev=>prev+1)
    })()
  };
  return (
    <>
      {value.id === keyModal && (
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{`update task ${value.id}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <Form.Label htmlFor="inputTaskName">TaskName</Form.Label>
              <Form.Control
                type="text"
                id="inputTaskName"
                aria-describedby="passwordHelpBlock"
                value={inputTask}
                onChange={(e) => setInputTask(e.target.value)}
              />
            </div>
            <div>
              <Form.Label htmlFor="inputTaskName">Description</Form.Label>
              <Form.Control
                type="text"
                id="inputTaskName"
                aria-describedby="passwordHelpBlock"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div>
              <Form.Label htmlFor="inputTaskName">Status</Form.Label>
              <Form.Control
                type="text"
                id="inputTaskName"
                aria-describedby="passwordHelpBlock"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </div>
          </Modal.Body>
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
