import axios from "axios";
import { url } from "./url";

const token = localStorage.getItem("token");

// Standard axios Get
//GET request

export const get = (route) => {
  return axios.get(`${url}${route}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
export const post = (route, body) => {
  console.log(body);
  return axios.post(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const put = (route, body) => {
  console.log(body);
  return axios.put(`${url}${route}`, body, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};
