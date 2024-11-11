// @flow
import * as React from "react";
import { EditableSpan } from "../../../../../../common/components/EditableSpan";
import {
  TodolistDomainType,
  editTodolistTitleTC,
  removeTodolistTC,
} from "../../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../app/store";

type Props = {
  todolist: TodolistDomainType;
  disabled? : boolean
};
export const TodolistTitle = React.memo(({ todolist, disabled }: Props) => {
  const dispatch = useAppDispatch();

  const editTodolistTitle = React.useCallback(
    (title: string) => {
      dispatch(editTodolistTitleTC(todolist.id, title));
    },
    [editTodolistTitleTC, todolist.id]
  );

  const removeTodolist = React.useCallback(() => {
    dispatch(removeTodolistTC(todolist.id));
  }, [removeTodolistTC, todolist.id]);

  return (
    <h3>
      <EditableSpan title={todolist.title} callBack={editTodolistTitle} />-{" "}
      <button onClick={removeTodolist} disabled={disabled}> x </button>
    </h3>
  );
});
