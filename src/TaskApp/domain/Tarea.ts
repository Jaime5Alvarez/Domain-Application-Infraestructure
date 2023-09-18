import { Task } from "../../Interfaces";


export const CreateTask = ({id, description, completed}:Task) => {
    return {
    id,
    description,
    completed,
  }
}

  