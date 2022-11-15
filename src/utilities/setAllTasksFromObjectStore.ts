import { AllTasksReducerAction } from "../reducer/AllTasksReducer";
import { AllTasksActions } from "./constants";

export const setAllTasksFromObjectStore = (
  dispatch: React.Dispatch<AllTasksReducerAction>
) => {
  const idb = window.indexedDB;
  const IdbOpenRequest = idb.open("the-todo-app-database", 1);
  IdbOpenRequest.onsuccess = () => {
    const dbRef = IdbOpenRequest.result;
    const dbTransaction = dbRef.transaction("tasks-object-store", "readwrite");
    const objectRef = dbTransaction.objectStore("tasks-object-store");
    const gettingTask = objectRef.getAll();
    gettingTask.onsuccess = () => {
      dispatch({
        type: AllTasksActions.SET_ALL_TASKS,
        payload: gettingTask.result,
      });
      dbTransaction.oncomplete = () => {
        dbRef.close();
      };
    };
  };
};
