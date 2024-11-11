// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../../../app/store";
import {
  TodolistDomainType,
  fetchTodolistsTC,
} from "../../../model/todolists-reducer";
import { TodolistType } from "../../../../api/todolists-api";
import { Todolist } from "./Todolist/Todolist";
type Props = {};
export const Todolists = React.memo((props: Props) => {
  const todolists = useSelector<AppRootState, TodolistDomainType[]>(
    (state) => state.todolists
  );

  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(fetchTodolistsTC());
  }, []);

  return (
    <div className="tdlList">
      {todolists.map((tl) => {
        return <Todolist key={tl.id} todolist={tl} />;
      })}
    </div>
  );
});
