import { CreateTask } from "../domain/Tarea";
import { Task } from "../../Interfaces";
import { Dispatch, SetStateAction } from "react";
import { httpUpdate } from "../infraestructure/http/update";

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

export const useChangeTaskAsCompleted = async (
  _id: string,
  tasks: Task[],
  setTasks: Dispatch<SetStateAction<Task[]>>
) => {
  const NewTask = ChangeTaskState(tasks, _id);
  if (NewTask) {
    await httpUpdate.UpdateTask(NewTask);

    const updatedList = tasks.map((task) => {
      if (task._id === _id) {
        return { ...NewTask };
      }
      return task;
    });
    setTasks(updatedList);
  }
};
