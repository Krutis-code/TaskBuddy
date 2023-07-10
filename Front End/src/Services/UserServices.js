import API from "./baseUrl";

export const userLogin = async (payload) => {
  const url = "/api/user/login";
  return API.post(url, payload);
};

export const userSignup = async (payload) => {
  const url = "/api/user/signup";
  return API.post(url, payload);
};
