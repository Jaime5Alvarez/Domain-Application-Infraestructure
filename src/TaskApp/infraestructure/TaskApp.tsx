import { useEffect, useState } from "react";
import {
  Addtask,
  gettasksNotCompleted,
  gettasksCompleted,
  CheckIfItIsEmpty,
  ChangeTaskState,
} from "../application/TaskManager";
import { Task } from "../../Interfaces";
import { httpCreate } from "./http/create";
import { httpRead } from "./http/read";
import { httpUpdate } from "./http/update";

export const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");

  const FetchTasks = async () => {
    try {
      const ResponseTasks = await httpRead.GetTasks();
      setTasks(ResponseTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addNewTask = async () => {
    if (CheckIfItIsEmpty(description)) {
      return;
    }
    const response = await httpCreate.CreateTask(Addtask(description));
    setTasks([...tasks, response]);
    setDescription("");
  };

  const ChangeTaskAsCompleted = async (_id: string) => {
    const NewTask = ChangeTaskState(tasks, _id);
    if (NewTask) {
      await httpUpdate.UpdateTask(NewTask);

      const updatedList = tasks.map((task: Task) => {
        if (task._id === _id) {
          return { ...NewTask };
        }
        return task;
      });
      setTasks(updatedList);
    }
  };
  const PendingTasks = gettasksNotCompleted(tasks);
  const CompletedTasks = gettasksCompleted(tasks);
  useEffect(() => {
    FetchTasks();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <input
        type="text"
        placeholder="Task description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addNewTask}>Add</button>

      <h2>Pending Tasks</h2>
      <ul>
        {PendingTasks.map((task: Task) => (
          <li key={`pending-task-${task._id}`}>
            {task.description}{" "}
            <button onClick={() => task._id && ChangeTaskAsCompleted(task._id)}>
              Complete
            </button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul placeholder="Completed tasks">
        {CompletedTasks.map((task: Task) => (
          <li key={`completed-task-${task._id}`}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};
