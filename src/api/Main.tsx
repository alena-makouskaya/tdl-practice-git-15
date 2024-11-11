// @flow
import * as React from "react";
import { useAppDispatch } from "../app/store";
import { AddItemForm } from "../common/components/AddItemForm";
import { addTodolistTC } from "../features/model/todolists-reducer";
import { Todolists } from "../features/todolists/ui/Todolists/Todolists";
type Props = {};

export const Main = React.memo((props: Props) => {
  const dispatch = useAppDispatch();

  const addTodolist = React.useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [addTodolistTC]
  );

  return (
    <div className="main">
      <AddItemForm callBack={addTodolist} />
      <Todolists />
    </div>
  );
});
