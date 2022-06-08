import axios from "axios";
import jwt_decode from "jwt-decode";

const refreshToken = async ({ username, password }) => {
  try {
    const res = await axios.post("http://localhost:5000/auth/login", {
      username: username,
      password: password,
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const createAxios = (user, dispatch, login) => {
  //user.username, user.password, user.accessToken
  console.log("axios interceptor")
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      let date = new Date();
      const decodedToken = jwt_decode(user?.accessToken);

      if (decodedToken.exp < date.getTime() / 1000) {
        const data = await refreshToken({
          username: user.username,
          password: user.password,
        });

        const payload = {
          username: data.user.username,
          password: data.user.password,
          accessToken: data.user.access_token,
        };

        dispatch(login(payload));

        config.headers["Authorization"] = "Bearer " + data.access_token;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
