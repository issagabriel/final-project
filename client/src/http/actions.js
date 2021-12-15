import axios from "axios";
import { url } from "./url";

// Standard axios Get
//GET request

export const get = (route) => {
  const token = localStorage.getItem("token");
  return axios.get(`${url}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const post = (route, body) => {
  const token = localStorage.getItem("token");
  console.log(body);
  return axios.post(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const put = (route, body) => {
  const token = localStorage.getItem("token");
  console.log(body);
  return axios.put(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const deleteComp = (route) => {
  const token = localStorage.getItem("token");
  return axios.delete(`${url}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
