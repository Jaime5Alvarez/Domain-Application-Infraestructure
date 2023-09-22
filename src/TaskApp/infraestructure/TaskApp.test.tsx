import "@testing-library/jest-dom";
import { httpCreate } from "./http/create";
// import { httpRead } from "./http/read";
// import { httpUpdate } from "./http/update";
import {
  RenderResult,
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
  const expectedCreatedTaskDescription = "New task created";
  const updatedTaskDescription = "New task Updated";

  let component: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  >;
  beforeEach(() => {
    // given
    (httpCreate.CreateTask as jest.Mock).mockResolvedValue({
      _id: "sdsdsd",
      description: expectedCreatedTaskDescription,
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
    ]);
    component = render(<TaskApp />);
  });
  afterEach(() => jest.clearAllMocks());
  it("Should get all the pending tasks in the first render", async () => {
    await waitFor(() => {
      const pendingTasks = component.getAllByTestId("pending-task-item");

      expect(pendingTasks).toHaveLength(2);
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
      const newTask = component.queryByText(expectedCreatedTaskDescription);
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
      `complete-button-${expectedPendingTaskId}`
    );
    fireEvent.click(completeButton);
    //then
    await waitFor(() => {
      const CompletedTaskList = component.getAllByTestId("completed-task-list");
      expect(CompletedTaskList).toHaveLength(1);
    });
  });
});
