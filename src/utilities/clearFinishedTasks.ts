import { AllTasksReducerAction } from "../reducer/AllTasksReducer";
import { deleteTaskFromIndexedDb } from "./deleteTaskFromIndexedDb";

export const clearFinishedTasks = (
  dispatch: React.Dispatch<AllTasksReducerAction>
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
    const clearingfinishedTasks = objectRef.getAll();
    // on successfuly putting data to store
    clearingfinishedTasks.onsuccess = () => {
      clearingfinishedTasks.result.forEach((task) => {
        if (task.state === "finished")
          deleteTaskFromIndexedDb(dispatch, task.id);
      });
      // on completing transcation we close the dbRef
      dbTransaction.oncomplete = () => {
        dbRef.close();
      };
    };
  };
};
