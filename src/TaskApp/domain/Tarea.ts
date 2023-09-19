import { Task } from "../../Interfaces";

export const CreateTask = ({ _id, description, completed }: Task) => {
  return {
    _id,
    description,
    completed,
  };
};
