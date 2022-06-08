import axios from "axios";

import { login, logout } from "./authSlices";

export const registerApi = async ({ username, password }) => {
  try {
    const res = await axios.post("http://localhost:5000/auth/resgister", {
      username: username,
      password: password,
    });
  } catch (error) {
    console.log(error.message);
  }
};
export const loginApi = async ({ username, password }, dispatch) => {
  try {
    const res = await axios.post("http://localhost:5000/auth/login", {
      username: username,
      password: password,
    });
    const payload = {
      username: res.data.user.username,
      password: res.data.user.password,
      accessToken: res.data.user.access_token,
    };
    dispatch(login(payload));
  } catch (error) {
    console.log(error.message);
  }
};
export const getTask = async (accessToken, axiosJwt) => {
  try {
    const res = await axiosJwt.get("http://localhost:5000/tasks", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    return res.data;
  } catch (error) {
    console.log(error.message);
  }
};
export const updateTask = async (data, accessToken, axiosJwt) => {
  console.log(axiosJwt);
  try {
    const res = await axiosJwt.put(
      "http://localhost:5000/tasks",
      {
        id: data.id,
        name: data.name,
        description: data.description,
        isDone: data.status,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("update", res.data);
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteTask = async (id, accessToken, axiosJwt) => {
  // console.log(axiosJwt)
  try {
    const res = await axiosJwt.delete(`http://localhost:5000/tasks/${id}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log("delete", res.data);
  } catch (error) {
    console.log(error.message);
  }
};
export const postTask = async (data, accessToken, axiosJwt) => {
    console.log(axiosJwt)
  try {
    const res = await axiosJwt.post(
      "http://localhost:5000/tasks",
      {
        name: data.name,
        description: data.description,
        isDone: data.isDone,
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    console.log("update", res.data);
  } catch (error) {
    console.log(error.message);
  }
};
