import React from "react";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import ModalUpdateComponent from "../components/ModalUpdate";
import ModalDeleteComponent from "../components/ModalDelete";
import ModalPostComponent from "../components/ModalPost";
import { useEffect, useState } from "react";
import { getTask } from "../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
import { createAxios } from "../instances/createInstance";
import { login } from "../redux/authSlices";
import { useNavigate } from "react-router-dom";

function TaskPage() {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState({ status: false, keyModal: null });
  const [openModalDelete, setOpenModalDelete] = useState({
    status: false,
    keyModal: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.login);

  const [refreshPages, setRefreshPages] = useState(1);
  let axiosJwt = createAxios(user, dispatch, login);

  useEffect(() => {
    if (!user.accessToken) {
      navigate("/login");
    }
    (async function () {
      let dataRes = await getTask(user.accessToken, axiosJwt);
      setData(dataRes);
    })();
    console.log("refresh page task");
  }, [refreshPages, user]);

  return (
    <div>
      <ModalPostComponent
        refreshPages={setRefreshPages}
        accessToken={user.accessToken}
        axiosJwt={axiosJwt}
      />
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
                      <ModalUpdateComponent
                        value={value}
                        keyModal={openModal.keyModal}
                        closeModal={setOpenModal}
                        refreshPages={setRefreshPages}
                        accessToken={user.accessToken}
                        axiosJwt={axiosJwt}
                      />
                    )}
                    {openModalDelete.status && (
                      <ModalDeleteComponent
                        value={value}
                        keyModal={openModalDelete.keyModal}
                        closeModal={setOpenModalDelete}
                        refreshPages={setRefreshPages}
                        accessToken={user.accessToken}
                        axiosJwt={axiosJwt}
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
