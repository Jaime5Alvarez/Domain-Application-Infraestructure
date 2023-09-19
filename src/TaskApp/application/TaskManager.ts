import { CreateTask } from "../domain/Tarea";
import { Task } from "../../Interfaces";

export const Addtask = (description: string) => {
  const NewTask = CreateTask({
    description,
    completed: false,
  });

  return NewTask;
};

export const ChangeTaskState = (currentState: Task[], _id: string) => {
  const MyTask = currentState.find((task) => task._id === _id);
  if (MyTask) {
    const NewTask = { ...MyTask, completed: !MyTask.completed };
    return NewTask as Task;
  }
};

export const gettasksNotCompleted = (currentState: Task[]) =>
  currentState.filter((task) => !task.completed);

export const gettasksCompleted = (currentState: Task[]) =>
  currentState.filter((task) => task.completed);
console.log("ejecutando");

export const CheckIfItIsEmpty = (description: string) => {
  if (description == "") {
    return true;
  }
  return false;
};
