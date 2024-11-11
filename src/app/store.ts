import {
  applyMiddleware,
  combineReducers,
  legacy_createStore,
  UnknownAction,
} from "redux";
import { todolistsReducer } from "../features/model/todolists-reducer";
import { tasksReducer } from "../features/model/tasks-reducer";
import { thunk, ThunkDispatch } from "redux-thunk";
import { useDispatch } from "react-redux";
import { appReducer } from "./app-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
});

export type AppRootState = ReturnType<typeof rootReducer>;

export const store = legacy_createStore(
  rootReducer,
  {},
  applyMiddleware(thunk)
);

export type AppDispatchType = ThunkDispatch<
  AppRootState,
  unknown,
  UnknownAction
>;
export const useAppDispatch = useDispatch<AppDispatchType>;

// @ts-ignore
window.store = store;
