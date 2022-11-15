import React from "react";
import { TasksType } from "../reducer/AllTasksReducer";
import TasksContainer from "../styles/TasksContainer";
import TaskItem from "./TaskItem";

const AllTasks = ({ allTasks }: { allTasks: TasksType }) => {
  if (allTasks.length === 0) {
    return <p>No Task Added </p>;
  }

  return (
    <>
      <TasksContainer>
        {allTasks.map((task) => (
          <TaskItem task={task} key={task.id} />
        ))}
      </TasksContainer>
    </>
  );
};
export default AllTasks;
