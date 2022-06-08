import axios from "axios";
import {  useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

export default function ModalPost({refreshPages}) {
  const [inputTask, setInputTask] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const handleSubmit = () => {
    // console.log(inputTask, description, status);
    setOpenModal(false);
    ;(async function(){
        await axios.post('http://localhost:5000/tasks',{
            name:inputTask,
            isDone:status==='true',
            description:description
        })
        refreshPages(prev=>++prev)
    })()
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={() => setOpenModal(true)}
      >
        Post Task
      </Button>
      <Modal show={openModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Post new task</Modal.Title>
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
    </>
  );
}
