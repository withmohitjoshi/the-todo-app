import React from "react";
import { TodoAppContext } from "../App";
import AddTaskContainer from "../styles/AddTask";
import { addTaskToObjectStore } from "../utilities/addTaskToObjectStore";
const AddTask = () => {
  const { dispatch } = React.useContext(TodoAppContext)!;
  const [taskTitle, setTaskTitle] = React.useState<string>("");

  return (
    <AddTaskContainer>
      <input
        type={"text"}
        maxLength={60}
        value={taskTitle}
        placeholder={"Enter a task"}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setTaskTitle(e.target.value)
        }
      />
      <button
        type={"button"}
        onClick={() => {
          addTaskToObjectStore(dispatch, taskTitle);
          setTaskTitle("");
        }}
      >
        Add
      </button>
    </AddTaskContainer>
  );
};
export default AddTask;
