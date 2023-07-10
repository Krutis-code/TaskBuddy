import { getToken } from "../helpers/utility";
import API from "./baseUrl";

const getHeaders = () => {
  return {
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  };
};

export const fetchAllTasks = async () => {
  console.log("fetch all tasks", getHeaders());
  const url = "/api/tasks/";
  return API.get(url, getHeaders());
};

export const updateTask = async (id, payload) => {
  const url = `/api/tasks/${id}`;
  return API.patch(url, payload, getHeaders());
};

export const createTask = async (payload) => {
  const url = "/api/tasks/create";
  return API.post(url, payload, getHeaders());
};

export const deleteTaskById = async (id) => {
  const url = `/api/tasks/${id}`;
  return API.delete(url, getHeaders());
};
