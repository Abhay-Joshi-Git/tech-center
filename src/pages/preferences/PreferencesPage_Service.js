import * as axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.interceptors.request.use(
  config => {
    if (!config.headers.Authorization) {
      const token = JSON.parse(localStorage.getItem("keycloakToken")).token;

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  error => Promise.reject(error)
);

const getUserProfile = id => {
  return axios.get(`/api/v1/user/${id}/profile`).then(res => res.data);
};

const updateUserProfile = data => {
  return axios
    .patch(`/api/v1/user/${data.id}/profile`, data.userProfileData)
    .then(res => res.data)
    .catch(err => err);
};

export { getUserProfile, updateUserProfile };
