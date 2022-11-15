import {
  faPenToSquare,
  faCheck,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { TodoAppContext } from "../App";
import { TaskType } from "../reducer/AllTasksReducer";
import { deleteTaskFromIndexedDb } from "../utilities/deleteTaskFromIndexedDb";
import { updateTaskInIndexedDb } from "../utilities/updateTaskInIndexedDb";
const TaskItem = ({ task }: { task: TaskType }) => {
  const [checked, setChecked] = React.useState<boolean>(false);
  const [isEditing, setIsEditing] = React.useState<boolean>(false);
  const [newTaskTitle, setNewTaskTitle] = React.useState<string>(
    task.taskTitle
  );
  const { dispatch } = React.useContext(TodoAppContext)!;
  React.useEffect(() => {
    if (task.state === "finished") setChecked(true);
  }, [task.state]);
  return (
    <div>
      <div className="check-box">
        <input
          type={"checkbox"}
          checked={checked}
          onChange={(e) => {
            setChecked((prevState) => !prevState);
            updateTaskInIndexedDb(dispatch, {
              taskTitle: task.taskTitle,
              state: e.target.checked ? "finished" : "pending",
              id: task.id,
            });
          }}
          disabled={isEditing}
        />
      </div>
      {isEditing ? (
        <div className="edit-task">
          <input
            type={"text"}
            maxLength={60}
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </div>
      ) : (
        <div className="task-title">
          <p>{task.taskTitle}</p>
        </div>
      )}

      <div className="button-group">
        {isEditing ? (
          <FontAwesomeIcon
            id="tick-btn"
            icon={faCheck}
            onClick={() => {
              updateTaskInIndexedDb(dispatch, {
                taskTitle: newTaskTitle,
                state: task.state,
                id: task.id,
              });
              setIsEditing(false);
            }}
          />
        ) : (
          <FontAwesomeIcon
            id="edit-btn"
            icon={faPenToSquare}
            onClick={() => setIsEditing(true)}
          />
        )}
        <span />

        <FontAwesomeIcon
          id="delete-btn"
          icon={faTrash}
          onClick={() => deleteTaskFromIndexedDb(dispatch, task.id)}
        />
      </div>
    </div>
  );
};
export default TaskItem;
