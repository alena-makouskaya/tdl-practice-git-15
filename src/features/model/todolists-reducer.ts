import { Dispatch } from "redux";
import { TodolistType } from "../todolists/api/todolistsAPI.types";
import { todolistAPI } from "../todolists/api/todolistsAPI";
import { RequestStatus, setAppStatusAC } from "../../app/app-reducer";
import { handleServerNetworkError } from "../../common/utils/handleServerNetworkError";
import { ResultCode } from "../../common/enums/enums";
import { handleServerAppError } from "../../common/utils/handleServerAppError";

let initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionType
): TodolistDomainType[] => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.id !== action.todolistId);
    }

    case "ADD-TODOLIST": {
      return [
        {
          ...action.todolist,
          filter: "all",
          entityStatus: "idle",
        },
        ...state,
      ];
    }

    case "EDIT-TODOLIST-TITLE": {
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, title: action.title } : tl
      );
    }

    case "CHANGE-TODOLIST-FILTER": {
      return state.map((tl) =>
        tl.id === action.todolistId ? { ...tl, filter: action.filter } : tl
      );
    }

    case "SET-TODOLISTS": {
      return action.todolists.map((tl) => {
        return {
          ...tl,
          filter: "all",
          entityStatus: "idle",
        };
      });
    }

    case "CHANGE-TODOLIST-ENTITY-STATUS": {
      return state.map((tl) =>
        tl.id === action.todolistId
          ? { ...tl, entityStatus: action.entityStatus }
          : tl
      );
    }

    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string) =>
  ({ type: "REMOVE-TODOLIST", todolistId } as const);

export const addTodolistAC = (todolist: TodolistType) =>
  ({ type: "ADD-TODOLIST", todolist } as const);

export const editTodolistTitleAC = (todolistId: string, title: string) =>
  ({ type: "EDIT-TODOLIST-TITLE", todolistId, title } as const);

export const changeTodolistFilterAC = (
  todolistId: string,
  filter: FilterValueType
) => ({ type: "CHANGE-TODOLIST-FILTER", todolistId, filter } as const);

export const setTodolistsAC = (todolists: Array<TodolistType>) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const changeTodolistEntityStatusAC = (
  todolistId: string,
  entityStatus: RequestStatus
) =>
  ({
    type: "CHANGE-TODOLIST-ENTITY-STATUS",
    todolistId,
    entityStatus,
  } as const);

// thunks
export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));

  todolistAPI
    .getTodolists()
    .then((res) => {
      const action = setTodolistsAC(res.data);
      dispatch(setAppStatusAC("succeeded"));
      dispatch(action);
    })
    .catch((error) => {
      handleServerNetworkError(error, dispatch);
    });
};

export const removeTodolistTC =
  (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todolistId, "loading"));
    todolistAPI.deleteTodolist(todolistId).then((res) => {
      dispatch(setAppStatusAC("succeeded"));
      dispatch(removeTodolistAC(todolistId));
    });
  };

export const addTodolistTC = (title: string) => (dispatch: Dispatch) => {
  dispatch(setAppStatusAC("loading"));
  todolistAPI
    .createTodolist(title)
    .then((res) => {
      if (res.data.resultCode === ResultCode.Success) {
        let todolist = res.data.data.item;
        let action = addTodolistAC(todolist);
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

export const editTodolistTitleTC =
  (todolistId: string, title: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatusAC("loading"));
    todolistAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === ResultCode.Success) {
          let action = editTodolistTitleAC(todolistId, title);
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

export type FilterValueType = "all" | "active" | "completed";

export type ChangeTodolistFilterActionType = ReturnType<
  typeof changeTodolistFilterAC
>;
export type EditTodolistTitleActionType = ReturnType<
  typeof editTodolistTitleAC
>;
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;
export type ChangeTodolistEntityStatusActionType = ReturnType<
  typeof changeTodolistEntityStatusAC
>;

export type ActionType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | EditTodolistTitleActionType
  | ChangeTodolistFilterActionType
  | SetTodolistsActionType
  | ChangeTodolistEntityStatusActionType;

export type TodolistDomainType = TodolistType & {
  filter: FilterValueType;
  entityStatus: RequestStatus;
};
