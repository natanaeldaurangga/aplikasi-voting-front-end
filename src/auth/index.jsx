import axios from "axios";
import { AUTH_URL } from "../constants/url";

export const handleSubmit = (username, pass) => {
  const loginPayload = {
    username: username,
    password: pass,
  };

  return axios
    .post(AUTH_URL, loginPayload)
    .then((response) => {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("name", response.data.data.name);
      localStorage.setItem("role", response.data.data.role.name);
      localStorage.setItem("expiration", response.data.data.expiration);
      localStorage.setItem("userPicture", response.data.data.picture);
      localStorage.setItem("prodi", response.data.data.prodi.name);
      setAuthToken(response.data.data.token);
      return response;
    })
    .catch((err) => {
      return err.response;
    });
};

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const isTokenExpired = (date) => {
  try {
    let expiration = new Date(date);
    let currentTime = new Date();
    return currentTime > expiration;
  } catch (e) {
    return true;
  }
};

export const checkUser = () => {
  let flag = false;
  const localToken = localStorage.getItem("token");
  const expiration = localStorage.getItem("expiration");
  localToken && !isTokenExpired(expiration) ? (flag = true) : (flag = false);
  return flag;
};

export const checkAdmin = () => {
  const role = localStorage.getItem("role");
  return role === "ROLE_ADMIN";
};

export const checkVoter = () => {
  const role = localStorage.getItem("role");
  return role === "ROLE_VOTER";
};

export const logout = () => {
  localStorage.clear();
  setAuthToken(false);
};

export default axios;
