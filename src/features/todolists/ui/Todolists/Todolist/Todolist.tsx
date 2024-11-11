// @flow
import * as React from "react";
import { TodolistDomainType } from "../../../../model/todolists-reducer";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { AddItemForm } from "../../../../../common/components/AddItemForm";
import { AppRootState, useAppDispatch } from "../../../../../app/store";
import { addTaskTC } from "../../../../model/tasks-reducer";

import { Tasks } from "./Tasks/Tasks";
import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { useSelector } from "react-redux";
import { RequestStatus } from "../../../../../app/app-reducer";
type Props = {
  todolist: TodolistDomainType;
};
export const Todolist = React.memo(({ todolist }: Props) => {

  const dispatch = useAppDispatch();

  const addTask = React.useCallback(
    (title: string) => {
      dispatch(addTaskTC(todolist.id, title));
    },
    [addTaskTC, todolist.id]
  );

  return (
    <div className="tdlCard">
      <TodolistTitle todolist={todolist} disabled={todolist.entityStatus === "loading"}/>
      <AddItemForm callBack={addTask} disabled={todolist.entityStatus === "loading"}/>
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
