import { AllTasksActions } from "../utilities/constants";

export type TaskType = {
  id: number;
  taskTitle: string;
  state: "pending" | "finished";
};
export type TasksType = TaskType[];

export type AllTasksReducerState = {
  allTasks: TasksType;
  browserSupportIndexedDb: boolean;
};

export type AllTasksReducerAction = {
  type: AllTasksActions;
  payload: any;
  id?: number;
};

export const AllTasksReducer = (
  state: AllTasksReducerState,
  action: AllTasksReducerAction
) => {
  switch (action.type) {
    case AllTasksActions.SET_ALL_TASKS:
      return {
        ...state,
        allTasks: state.allTasks.concat(action.payload),
      };
    case AllTasksActions.BROWSER_SUPPORT_INDEXED_DB:
      return { ...state, browserSupportIndexedDb: action.payload };
    case AllTasksActions.UPDATE_TASK:
      let tasksArray = [...state.allTasks];
      const eleNeedToBeUpdate = tasksArray.filter(
        (value) => value.id === action.id
      );
      const indexOfEleNeedToBeUpdate = tasksArray.indexOf(eleNeedToBeUpdate[0]);
      tasksArray.splice(indexOfEleNeedToBeUpdate, 1, action.payload);
      return {
        ...state,
        allTasks: [...tasksArray],
      };
    case AllTasksActions.DELETE_TASK:
      const tasksArr = [...state.allTasks];
      const eleNeedToBeDelete = tasksArr.filter(
        (value) => value.id === action.id
      );
      const indexOfEleNeedToBeDelete = tasksArr.indexOf(eleNeedToBeDelete[0]);
      tasksArr.splice(indexOfEleNeedToBeDelete, 1);
      return {
        ...state,
        allTasks: [...tasksArr],
      };
    default:
      return state;
  }
};
