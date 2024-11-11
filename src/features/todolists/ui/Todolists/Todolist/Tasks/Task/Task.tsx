// @flow
import * as React from "react";
import { TodolistDomainType } from "../../../../../../model/todolists-reducer";
import { useAppDispatch } from "../../../../../../../app/store";
import {
  removeTaskTC,
  updateTaskTC,
} from "../../../../../../model/tasks-reducer";
import { EditableSpan } from "../../../../../../../common/components/EditableSpan";
import { TaskStatuses } from "../../../../../../../common/enums/enums";
import { TaskType } from "../../../../../../../api/todolists-api";
type Props = {
  todolist: TodolistDomainType;
  task: TaskType;
};
export const Task = React.memo(({ todolist, task }: Props) => {
  const dispatch = useAppDispatch();

  const changeTaskStatus = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      let status = e.currentTarget.checked
        ? TaskStatuses.Completed
        : TaskStatuses.Completed;
      dispatch(updateTaskTC(todolist.id, task.id, { status }));
    },
    [updateTaskTC, todolist.id, task.id]
  );

  const editTaskTitle = React.useCallback(
    (title: string) => {
      dispatch(updateTaskTC(todolist.id, task.id, { title }));
    },
    [updateTaskTC, todolist.id, task.id]
  );

  const removeTask = React.useCallback(() => {
    dispatch(removeTaskTC(todolist.id, task.id));
  }, [removeTaskTC, todolist.id, task.id]);

  return (
    <li>
      <input
        type="checkbox"
        checked={task.status === TaskStatuses.Completed ? true : false}
        onChange={changeTaskStatus}
      />
      <EditableSpan title={task.title} callBack={editTaskTitle} />

      <button onClick={removeTask}> x </button>
    </li>
  );
});
