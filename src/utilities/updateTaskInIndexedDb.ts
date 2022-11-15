import { AllTasksReducerAction, TaskType } from "../reducer/AllTasksReducer";
import { AllTasksActions } from "./constants";

// this function is responsible for updating a task, it's state and it's id to the IndexedDb Object Store(tasks-object-store)
export const updateTaskInIndexedDb = (
  dispatch: React.Dispatch<AllTasksReducerAction>,
  updatedTask: TaskType
) => {
  const idb = window.indexedDB;
  const IdbOpenRequest = idb.open("the-todo-app-database", 1);
  // on opening IndexedDB successfuly
  IdbOpenRequest.onsuccess = () => {
    const dbRef = IdbOpenRequest.result;
    // create a transtion for Object store(tasks-object-store) of readwite type
    const dbTransaction = dbRef.transaction("tasks-object-store", "readwrite");
    // get ref to object store(tasks-object-store)
    const objectRef = dbTransaction.objectStore("tasks-object-store");
    // putting data to object store
    const updatingTask = objectRef.put({
      id: updatedTask.id,
      taskTitle: updatedTask.taskTitle,
      state: updatedTask.state,
    });

    // on successfuly putting data to store
    updatingTask.onsuccess = () => {
      const res = objectRef.get(updatingTask.result);
      // on completing transcation we close the dbRef
      dbTransaction.oncomplete = () => {
        dispatch({
          type: AllTasksActions.UPDATE_TASK,
          payload: res?.result,
          id: updatingTask.result as number,
        });
        dbRef.close();
      };
    };
    // on failing putting data to store
    updatingTask.onerror = () => {
      alert("Task is not added");
    };
  };
};
