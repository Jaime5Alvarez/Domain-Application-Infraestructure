# React Task Manager App

This is a simple React Task Manager app that allows you to add, complete, and view tasks. It uses functional components and state management to handle tasks.

## Installation

To run this app, follow these steps:

1. Clone the repository to your local machine:

git clone <repository-url>

css

2. Navigate to the project directory:

cd <project-directory>

markdown

3. Install the dependencies:

npm install

markdown

4. Start the development server:

npm start

csharp

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to use the app.

## Usage

- The app allows you to add new tasks by entering a task description in the input field and clicking the "Add" button.
- You can mark a task as completed by clicking the "Complete" button next to it.
- The app displays two sections: "Pending Tasks" and "Completed Tasks," which show the respective tasks.

## Components

### `TaskApp`

The main component of the app that manages tasks. It provides the following functionality:

- Adds new tasks using the `Addtask` function.
- Marks tasks as completed using the `ChangeTaskState` function.
- Displays pending and completed tasks.

### `CreateTask`

A simple function to create a task object with an `id`, `description`, and `completed` status.

### `Addtask`

A function that adds a new task to the current task list. It creates a new task object using `CreateTask` and adds it to the list of tasks.

### `ChangeTaskState`

A function that updates the `completed` status of a task when marked as completed.

### `gettasksNotCompleted` and `gettasksCompleted`

Functions that filter and return lists of pending and completed tasks, respectively.

### `CheckIfItIsEmpty`

A function to check if a task description is empty.

## Dependencies

- React: This app is built using React, a JavaScript library for building user interfaces.
- React Hooks: It uses the `useState` hook to manage component state.
- JavaScript ES6: Modern JavaScript syntax is used throughout the code.

## Contributing

Feel free to contribute to this project by creating issues or pull requests. Your contributions are welcome!

## License

This project is licensed under the MIT License.
