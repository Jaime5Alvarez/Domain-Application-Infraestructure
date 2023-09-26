import "@testing-library/jest-dom";
import { httpCreate } from "./http/create";
// import { httpRead } from "./http/read";
// import { httpUpdate } from "./http/update";
import {
  RenderResult,
  act,
  fireEvent,
  render,
  waitFor,
} from "@testing-library/react";
import { TaskApp } from "./TaskApp";
import { httpUpdate } from "./http/update";
import { httpRead } from "./http/read";

jest.mock("./http/create");
jest.mock("./http/read");
jest.mock("./http/update");
describe("Task app tests", () => {
  const expectedPendingTaskId = "pending-task-id-2323-324";
  const expectedCompletedTaskId = "completed-task-id-33323-323";

  const expectedCreatedTaskDescription = "New task";
  const updatedTaskDescription = "New task Updated";

  let component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  beforeEach(async () => {
    // given
    (httpCreate.CreateTask as jest.Mock).mockResolvedValue({
      _id: "sdsdsddededd",
      description: `${expectedCreatedTaskDescription}-new`,
      completed: false,
    });
    (httpUpdate.UpdateTask as jest.Mock).mockResolvedValue({
      _id: "sdsdsd",
      description: updatedTaskDescription,
      completed: true,
    });
    (httpRead.GetTasks as jest.Mock).mockResolvedValue([
      {
        _id: expectedPendingTaskId,
        description: expectedCreatedTaskDescription,
        completed: false,
      },
      {
        _id: "dadasass",
        description: `${expectedCreatedTaskDescription}-eqwwqw`,
        completed: false,
      },
      {
        _id: expectedCompletedTaskId,
        description: `${expectedCreatedTaskDescription}-eqwdwddwqw`,
        completed: true,
      },
      {
        _id: "ewedwewewew",
        description: `${expectedCreatedTaskDescription}-eqwdwewewddwqw`,
        completed: true,
      },
    ]);
    component = await act(async () => render(<TaskApp />));
  });
  afterEach(() => jest.clearAllMocks());
  it("Should get all the pending tasks in the first render", async () => {
    await waitFor(() => {
      const pendingTasks = component.getAllByTestId("pending-task-item");

      expect(pendingTasks).toHaveLength(2);
      expect(httpRead.GetTasks).toHaveBeenCalledTimes(1);
    });
  });
  it("Should get all the completed tasks in the first render", async () => {
    await waitFor(() => {
      const completedTasks = component.getAllByTestId("completed-task-item");
      expect(completedTasks).toHaveLength(2);
      expect(httpRead.GetTasks).toHaveBeenCalledTimes(1);
    });
  });
  test("Adding a task", async () => {
    const input = component.getByPlaceholderText("Task description");
    fireEvent.change(input, {
      target: { value: expectedCreatedTaskDescription },
    });

    const buttonAdd = component.getByText("Add");
    fireEvent.click(buttonAdd);
    await waitFor(() =>
      expect(
        component.getByText(expectedCreatedTaskDescription)
      ).toBeInTheDocument()
    );
  });
  test("does not add a task with empty description", async () => {
    const addButton = component.getByText("Add");
    fireEvent.click(addButton);
    await waitFor(() => {
      const newTask = component.queryByText(
        `${expectedCreatedTaskDescription}-new`
      );
      expect(newTask).toBeNull();
      expect(httpCreate.CreateTask).not.toHaveBeenCalled();
    });
  });

  test("moves a task to completed when clicking 'Complete'", async () => {
    //when
    const input = component.getByPlaceholderText("Task description");
    fireEvent.change(input, {
      target: { value: expectedCreatedTaskDescription },
    });
    const buttonAdd = component.getByText("Add");
    fireEvent.click(buttonAdd);

    const completeButton = component.getByTestId(
      `change-state-button-${expectedPendingTaskId}`
    );
    fireEvent.click(completeButton);
    //then
    await waitFor(() => {
      const CompletedTaskList = component.getAllByTestId("completed-task-item");
      expect(CompletedTaskList).toHaveLength(2);
    });
  });
  it("Should be rendered task item component when there are pending items available", () => {
    (httpRead.GetTasks as jest.Mock).mockResolvedValue([
      {
        _id: expectedPendingTaskId,
        description: expectedCreatedTaskDescription,
        completed: false,
      },
      {
        _id: "dadasass",
        description: `${expectedCreatedTaskDescription}-eqwwqw`,
        completed: false,
      },
    ]);
    expect(component.getAllByTestId("pending-task-item")).toHaveLength(2);
  });
  it("Should be rendered task item component when there are completed items available", () => {
    (httpRead.GetTasks as jest.Mock).mockResolvedValue([
      {
        _id: expectedPendingTaskId,
        description: expectedCreatedTaskDescription,
        completed: true,
      },
      {
        _id: "dadasass",
        description: `${expectedCreatedTaskDescription}-eqwwqw`,
        completed: true,
      },
    ]);
    expect(component.getAllByTestId("completed-task-item")).toHaveLength(2);
  });
  it("Should change a task to the pending list when clicking if it is available at completed list", async () => {
    const changeStateButton = component.getByTestId(
      `change-state-button-${expectedCompletedTaskId}`
    );
    fireEvent.click(changeStateButton);
    await waitFor(() => {
      const pendingTaskList = component.getAllByTestId("pending-task-item");
      expect(pendingTaskList).toHaveLength(3);
    });
  });
});
