import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";

import { TaskType, UpdateTaskModelType } from "../../api/todolists-api";
import { Dispatch } from "redux";
import { AppRootState } from "../../app/store";
import { UpdateDomainTaskModelType } from "../todolists/api/tasksAPI.types";
import { tasksAPI } from "../todolists/api/tasksAPI";
import { setAppErrorAC, setAppStatusAC } from "../../app/app-reducer";
import { ResultCode } from "../../common/enums/enums";
import { handleServerAppError } from "../../common/utils/handleServerAppError";
import { handleServerNetworkError } from "../../common/utils/handleServerNetworkError";
import { error } from "console";

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionType
): TasksStateType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(
          (task) => task.id !== action.taskId
        ),
      };
    }

    case "ADD-TASK": {
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };
    }

    case "UPDATE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map((task) =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };
    }

    case "ADD-TODOLIST": {
      let stateCopy = { ...state };

      stateCopy[action.todolist.id] = [];

      return stateCopy;
    }

    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.todolistId];
      return stateCopy;
    }

    case "SET-TODOLISTS": {
      let stateCopy = { ...state };
      action.todolists.forEach((tl) => {
        stateCopy[tl.id] = [];
      });

      return stateCopy;
    }

    case "SET-TASKS": {
      return {
        ...state,
        [action.todolistId]: [...action.tasks],
      };

      // const copyState = { ...state };
      // copyState[action.todolistId] = action.tasks;

      // return copyState;
    }

    default:
      return state;
  }
};

export const RemoveTaskAC = (todolistId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todolistId, taskId } as const);

export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);

export const SetTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({ type: "SET-TASKS", todolistId, tasks } as const);

export const UpdateTaskAC = (
  todolistId: string,
  taskId: string,
  model: UpdateDomainTaskModelType
) => ({ type: "UPDATE-TASK", todolistId, taskId, model } as const);
// thunks

export const fetchTaskTC = (todolistId: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  tasksAPI
    .getTasks(todolistId)
    .then((res) => {
      const action = SetTasksAC(todolistId, res.data.items);
      dispatch(setAppStatusAC("succeeded"));
      dispatch(action);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTaskTC =
  (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .delteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          const action = RemoveTaskAC(todolistId, taskId);
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const addTaskTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          const action = addTaskAC(res.data.data.item);
          dispatch(setAppStatusAC("succeeded"));
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const updateTaskTC =
  (
    todolistId: string,
    taskId: string,
    domainModel: UpdateDomainTaskModelType
  ) =>
  (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState();

    const task = state.tasks[todolistId].find((task) => task.id === taskId);

    if (!task) {
      throw new Error("task not found in the state");
      return;
    }

    const apiModel: UpdateTaskModelType = {
      title: task.title,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      deadline: task.deadline,
      status: task.status,
      ...domainModel,
    };

    dispatch(setAppStatusAC("loading"));
    tasksAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          let action = UpdateTaskAC(todolistId, taskId, apiModel);
          dispatch(setAppStatusAC("succeeded"));
          dispatch(action);
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch);
      });
  };

// types

export type TasksStateType = {
  [key: string]: TaskType[];
};

export type AddTaskActionType = ReturnType<typeof addTaskAC>;
export type RemoveTaskActionType = ReturnType<typeof RemoveTaskAC>;
export type SetTasksActionType = ReturnType<typeof SetTasksAC>;
export type UpdateTaskActionType = ReturnType<typeof UpdateTaskAC>;

type ActionType =
  | RemoveTaskActionType
  | AddTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType
  | UpdateTaskActionType;

let initialState: TasksStateType = {};
