// @flow
import * as React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../../app/store";
type Props = {};

export const ErrorSnackbar = (props: Props) => {
  const [open, setOpen] = React.useState(true);

  const error = useSelector<AppRootState, null | string>(state => state.app.error)

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      {error !== null && open && (
        <div className="errorSnackbar">
          <p>{error}</p>
          <button onClick={handleClose}> x </button>
        </div>
      )}
    </>
  );
};
