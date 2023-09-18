// src/infraestructura/TareasApp.js
import React, { useState } from "react";

import {
  Addtask,
  ChangeTaskState,
  gettasksNotCompleted,
  gettasksCompleted,
  CheckIfItIsEmpty,
} from "../application/TaskManager";
import { Task } from "../../Interfaces";
export const TaskApp = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [description, setDescription] = useState("");

  const addNewTask = () => {
    if (CheckIfItIsEmpty(description)) {
      return;
    }
    setTasks(Addtask(tasks, description));
    setDescription("");
  };

  const ChangeTaskAsCompleted = (id: number) => {
    setTasks(ChangeTaskState(tasks, id));
  };

  const PendingTasks = gettasksNotCompleted(tasks);
  const CompletedTasks = gettasksCompleted(tasks);

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
          <li key={task.id}>
            {task.description}{" "}
            <button onClick={() => ChangeTaskAsCompleted(task.id)}>
              Complete
            </button>
          </li>
        ))}
      </ul>

      <h2>Completed Tasks</h2>
      <ul>
        {CompletedTasks.map((task: Task) => (
          <li key={task.id}>{task.description}</li>
        ))}
      </ul>
    </div>
  );
};
