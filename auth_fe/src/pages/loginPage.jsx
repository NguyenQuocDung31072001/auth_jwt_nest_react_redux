import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginApi } from "../redux/apiRequest";

function LoginPages() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginFnc = async () => {
    await loginApi({ username, password }, dispatch);
  };
  return (
    <div>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button onClick={loginFnc}>login</button>
    </div>
  );
}

export default LoginPages;
