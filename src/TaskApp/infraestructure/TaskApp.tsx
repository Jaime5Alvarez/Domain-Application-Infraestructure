import { useEffect, Dispatch, SetStateAction, useState } from "react";
import {
  Addtask,
  gettasksNotCompleted,
  gettasksCompleted,
  CheckIfItIsEmpty,
  useChangeTaskAsCompleted,
} from "../application/TaskManager";
import { Task } from "../../Interfaces";
import { httpCreate } from "./http/create";
import { httpRead } from "./http/read";

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
          <li key={task._id}>
            <TaskItem
              _id={task._id}
              description={task.description}
              type={"pending"}
              tasks={tasks}
              setTasks={setTasks}
            />
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {CompletedTasks.map((task: Task) => (
          <li key={task._id}>
            <TaskItem
              type={"completed"}
              _id={task._id}
              description={task.description}
              tasks={tasks}
              setTasks={setTasks}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const TaskItem = ({
  _id,
  description,
  type,
  tasks,
  setTasks,
}: {
  _id?: string;
  description: string;
  type: string;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}) => {
  return (
    <>
      <span data-testid={`${type}-task-item`}>
        {description}
        <button
          data-testid={`change-state-button-${_id}`}
          onClick={() => _id && useChangeTaskAsCompleted(_id, tasks, setTasks)}
        >
          {type == "pending" ? "Complete" : "Undo"}
        </button>
      </span>
    </>
  );
};
