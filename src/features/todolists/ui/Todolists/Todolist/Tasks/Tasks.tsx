// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../../../../../app/store";

import {
  TasksStateType,
  fetchTaskTC,
} from "../../../../../model/tasks-reducer";
import { TodolistDomainType } from "../../../../../model/todolists-reducer";

import { Task } from "./Task/Task";
import { TaskStatuses } from "../../../../../../common/enums/enums";

type Props = {
  todolist: TodolistDomainType;
};
export const Tasks = React.memo(({ todolist }: Props) => {
  const tasks = useSelector<AppRootState, TasksStateType>(
    (state) => state.tasks
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTaskTC(todolist.id));
  }, []);

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === "active") {
    tasksForTodolist = allTodolistTasks.filter(
      (task) => task.status === TaskStatuses.New
    );
  }

  if (todolist.filter === "completed") {
    tasksForTodolist = allTodolistTasks.filter(
      (task) => task.status === TaskStatuses.Completed
    );
  }

  return (
    <>
      {tasksForTodolist.map((task) => {
        return <Task key={task.id} todolist={todolist} task={task} />;
      })}
    </>
  );
});
