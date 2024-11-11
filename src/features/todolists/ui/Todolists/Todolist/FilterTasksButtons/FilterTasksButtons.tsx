// @flow
import * as React from "react";
import {
  FilterValueType,
  TodolistDomainType,
  changeTodolistFilterAC,
} from "../../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../app/store";
type Props = {
  todolist: TodolistDomainType;
};
export const FilterTasksButtons = React.memo(({ todolist }: Props) => {
  const dispatch = useAppDispatch();

  const changeTodolistFilter = React.useCallback(
    (filter: FilterValueType) => {
      dispatch(changeTodolistFilterAC(todolist.id, filter));
    },
    [changeTodolistFilterAC, todolist.id]
  );

  return (
    <div>
      <button
        className={todolist.filter === "all" ? "isActive" : ""}
        onClick={() => changeTodolistFilter("all")}
      >
        All
      </button>
      <button
        className={todolist.filter === "active" ? "isActive" : ""}
        onClick={() => changeTodolistFilter("active")}
      >
        Active
      </button>
      <button
        className={todolist.filter === "completed" ? "isActive" : ""}
        onClick={() => changeTodolistFilter("completed")}
      >
        Completed
      </button>
    </div>
  );
});
