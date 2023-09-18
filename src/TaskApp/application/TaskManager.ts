import { CreateTask } from "../domain/Tarea";
import { Task } from "../../Interfaces";
export const Addtask = (currentState:Task[], description:string) => {
  const NewTask = CreateTask({
    id:currentState.length + 1,
    description,
    completed:false
  }
  );
  return [...currentState, NewTask];
};

export const ChangeTaskState  = (currentState:Task[], id:number) =>
  currentState.map((task) =>
    task.id === id ? { ...task, completed: true } : task
  );

export const gettasksNotCompleted = (currentState:Task[]) =>
  currentState.filter((task) => !task.completed);

export const gettasksCompleted = (currentState:Task[]) =>
  currentState.filter((task) => task.completed);
