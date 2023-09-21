import "@testing-library/jest-dom";
import {
  RenderResult,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { TaskApp } from "./TaskApp";
describe("Task app tests", () => {
  let component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  beforeEach(() => {
    component = render(<TaskApp />);
  });

  test("Adding a task", async () => {
    const input = component.getByPlaceholderText("Task description");
    fireEvent.change(input, { target: { value: "New task" } });

    const buttonAdd = component.getByText("Add");
    fireEvent.click(buttonAdd);
    await waitFor(() => component.getAllByText("New task"));
  });
  test("does not add a task with empty description", async () => {
    const addButton = component.getByText("Add");

    fireEvent.click(addButton);

    await waitFor(() => {
      const newTask = component.queryByText("New Task");
      expect(newTask).toBeNull();
    });
  });

  test("moves a task to completed when clicking 'Complete'", async () => {
    const input = component.getByPlaceholderText("Task description");
    fireEvent.change(input, { target: { value: "New task" } });

    const buttonAdd = component.getByText("Add");
    fireEvent.click(buttonAdd);
    await waitFor(() => component.getByText("New task"));
    const completeButton = component.getByText("Complete");

    fireEvent.click(completeButton);

    await waitFor(() => {
      const CompletedTaskList =
        component.getByPlaceholderText("Completed tasks").childNodes;
      expect(CompletedTaskList).toHaveLength(1);
    });
  });
});
