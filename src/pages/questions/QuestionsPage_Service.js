import * as axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
  config => {
    // if (!config.headers.Authorization) {
    //   const token = JSON.parse(localStorage.getItem("keycloakToken")).token;

    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    // }

    return config;
  },
  error => Promise.reject(error)
);

const fetchQuestionsSummaryDataAPI = id => {
  return axios.get(`/api/v1/user/${id}/home`);
};

export { fetchQuestionsSummaryDataAPI };
