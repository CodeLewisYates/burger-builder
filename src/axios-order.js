import axios from "axios";

const instance = axios.create({
  baseURL: "https://react-burger-2f085-default-rtdb.firebaseio.com/",
});

export default instance;
