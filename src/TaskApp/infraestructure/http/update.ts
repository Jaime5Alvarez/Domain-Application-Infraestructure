import axios from "axios";
import { Task } from "../../../Interfaces";
import { API_URL } from "../../../urls";

export const httpUpdate = {
  UpdateTask: async (task: Task) => {
    try {
      await axios.put(`${API_URL}/${task._id}`, {
        description: task.description,
        completed: task.completed,
      });
    } catch (error) {
      console.log(error);
    }
  },
};
