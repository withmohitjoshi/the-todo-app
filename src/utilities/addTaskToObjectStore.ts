import { AllTasksReducerAction } from "../reducer/AllTasksReducer";
import { AllTasksActions } from "./constants";

// this function is responsible for adding a task,it's state and it's id to the IndexedDb Object Store(tasks-object-store)
export const addTaskToObjectStore = (
  dispatch: React.Dispatch<AllTasksReducerAction>,
  taskTitle: string
) => {
  if (taskTitle.length > 0) {
    const idb = window.indexedDB;
    const IdbOpenRequest = idb.open("the-todo-app-database", 1);
    // on opening IndexedDB successfuly
    IdbOpenRequest.onsuccess = () => {
      const dbRef = IdbOpenRequest.result;
      // create a transtion for Object store(tasks-object-store) of readwite type
      const dbTransaction = dbRef.transaction(
        "tasks-object-store",
        "readwrite"
      );
      // get ref to object store(tasks-object-store)
      const objectRef = dbTransaction.objectStore("tasks-object-store");
      // putting data to object store
      const addingTask = objectRef.put({
        taskTitle: taskTitle,
        state: "pending",
      });
      // on successfuly putting data to store
      addingTask.onsuccess = () => {
        const res = objectRef.get(addingTask.result);

        // on completing transcation we close the dbRef
        dbTransaction.oncomplete = () => {
          dispatch({
            type: AllTasksActions.SET_ALL_TASKS,
            payload: res?.result,
          });
          dbRef.close();
        };
      };
      // on failing putting data to store
      addingTask.onerror = () => {
        alert("Task is not added");
      };
    };
  }
};
