import AllTasks from "./components/AllTasks";
import AppHeading from "./components/AppHeading";
import GlobalStyles from "./styles";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import PendingTasks from "./components/PendingTasks";
import FinishedTasks from "./components/FinishedTasks";
import AddTask from "./components/AddTask";
import AppContainer from "./styles/App";
import React from "react";
import { createCollectionsInIndexedDB } from "./utilities/createCollectionsInIndexedDB";
import {
  AllTasksReducer,
  AllTasksReducerAction,
  AllTasksReducerState,
} from "./reducer/AllTasksReducer";
import ClearFinishedTasks from "./components/ClearFinishedTasks";
const initialState = {
  browserSupportIndexedDb: true,
  allTasks: [],
};
export type TodoAppContextType = {
  state: AllTasksReducerState;
  dispatch: React.Dispatch<AllTasksReducerAction>;
} | null;
export const TodoAppContext = React.createContext<TodoAppContextType>(null);
const App = () => {
  const [state, dispatch] = React.useReducer(AllTasksReducer, initialState);

  React.useEffect(() => {
    createCollectionsInIndexedDB(dispatch);
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <AppHeading />
        {state.browserSupportIndexedDb ? (
          <>
            <TodoAppContext.Provider value={{ state, dispatch }}>
              <AddTask />
              <NavBar />
              <Routes>
                <Route
                  index
                  path="/"
                  element={<AllTasks allTasks={state.allTasks} />}
                />
                <Route
                  path="/pending"
                  element={
                    <PendingTasks
                      pendingTasks={state.allTasks.filter(
                        (value) => value.state === "pending"
                      )}
                    />
                  }
                />
                <Route
                  path="/finished"
                  element={
                    <FinishedTasks
                      finishedTasks={state.allTasks.filter(
                        (value) => value.state === "finished"
                      )}
                    />
                  }
                />
              </Routes>
              {state.allTasks.length > 0 && <ClearFinishedTasks />}
            </TodoAppContext.Provider>
          </>
        ) : (
          <p>Browser doesn't support IndexedDb</p>
        )}
      </AppContainer>
    </>
  );
};

export default App;
