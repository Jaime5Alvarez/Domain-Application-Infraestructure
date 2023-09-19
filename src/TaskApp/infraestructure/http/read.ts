import axios from "axios";
import { API_URL } from "../../../urls";
export const httpRead = {
  GetTasks: async function () {
    try {
      const promise = await axios.get(`${API_URL}`);
      return promise.data;
    } catch (error) {
      console.log(error);
    }
  },
};
