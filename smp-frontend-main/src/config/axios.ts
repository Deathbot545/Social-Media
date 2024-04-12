import axios from "axios";

const i = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

export default i;
