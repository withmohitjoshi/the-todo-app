import { AllTasksReducerAction } from "../reducer/AllTasksReducer";
import { AllTasksActions } from "./constants";
import { setAllTasksFromObjectStore } from "./setAllTasksFromObjectStore";

// This hook is responsible for opening database and creating object store in it
export const createCollectionsInIndexedDB = (
  dispatch: React.Dispatch<AllTasksReducerAction>
) => {
  const idb = window.indexedDB;
  if (!idb) {
    alert("This Broswer doesn't support IndexedDB");
    dispatch({
      type: AllTasksActions.BROWSER_SUPPORT_INDEXED_DB,
      payload: false,
    });
  } else {
    const IdbOpenRequest = idb.open("the-todo-app-database", 1);
    // Error while opening database(the-todo-app-database)
    IdbOpenRequest.onerror = (e) => {
      alert("Database is not opened please refresh the page");
    };

    // Success while opening database(the-todo-app-database) then closing it.
    IdbOpenRequest.onsuccess = (e) => {
      const dbRef = IdbOpenRequest.result;
      setAllTasksFromObjectStore(dispatch);
      dbRef.close();
    };

    // Creating our default Object Store(tasks-object-store) in database(the-todo-app-database)
    // if no object store is there
    IdbOpenRequest.onupgradeneeded = (e) => {
      const dbRef = IdbOpenRequest.result;
      if (!dbRef.objectStoreNames.contains("tasks-object-store")) {
        dbRef.createObjectStore("tasks-object-store", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  }
};
