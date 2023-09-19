import axios from "axios";
import { Task } from "../../../Interfaces";
import { API_URL } from "../../../urls";
export const httpCreate = {
  CreateTask: async function (newTask: Task) {
    try {
      const response = await axios.post(`${API_URL}`, newTask);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
