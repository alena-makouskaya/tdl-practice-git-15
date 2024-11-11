import React, { useCallback, useEffect, useReducer, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Main } from "./Main";
import { LinearProgress } from "../common/components/LinearProgress/LinearProgress";
import { useSelector } from "react-redux";
import { AppRootState } from "../app/store";
import { RequestStatus } from "../app/app-reducer";
import { ErrorSnackbar } from "../common/components/ErrorSnackbar/ErrorSnackbar";

const App = React.memo(() => {
  console.log("App is called");

  const status = useSelector<AppRootState, RequestStatus>(
    (state) => state.app.status
  );

  return (
    <div className="App">
      <ErrorSnackbar />
      {status === "loading" && <LinearProgress />}
      <Main />
    </div>
  );
});

export default App;
