import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import ModalComponent from "../components/ModalUpdate";
import ModalDeleteComponent from "../components/ModalDelete";
import ModalPost from "../components/ModalPost";
import { useEffect, useState } from "react";
import { getTask } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../instances/createInstance";
import { login } from "../redux/authSlices";

function TaskPage() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState({ status: false, keyModal: null });
  const [openModalDelete, setOpenModalDelete] = useState({
    status: false,
    keyModal: null,
  });
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.login);

  const [refreshPages, setRefreshPages] = useState(1);
  let axiosJWT = createAxios(user, dispatch, login);

  useEffect(() => {
    (async function () {
      let dataRes = await getTask(user.accessToken, axiosJWT);
      setData(dataRes);
    })();
    console.log("refresh page task")
  }, [refreshPages,user]);

  return (
    <div>
      <ModalPost refreshPages={setRefreshPages} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Task Name</th>
            <th>Description</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((value, index) => {
              return (
                <tr key={index}>
                  <td>{value.id}</td>
                  <td>{value.name}</td>
                  <td>{value.description}</td>
                  <td>{`${value.isDone}`}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setOpenModal({ status: true, keyModal: value.id });
                      }}
                    >
                      Update
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setOpenModalDelete({
                          status: true,
                          keyModal: value.id,
                        });
                      }}
                    >
                      Delete
                    </Button>
                    {openModal.status && (
                      <ModalComponent
                        value={value}
                        keyModal={openModal.keyModal}
                        closeModal={setOpenModal}
                        refreshPages={setRefreshPages}
                      />
                    )}
                    {openModalDelete.status && (
                      <ModalDeleteComponent
                        value={value}
                        keyModal={openModalDelete.keyModal}
                        closeModal={setOpenModalDelete}
                        refreshPages={setRefreshPages}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default TaskPage;
