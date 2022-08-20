import React from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-slice";
const Notifications = ({ type, message }) => {
  const dispatch = useDispatch();
  const notfication = useSelector((state) => state.ui.notfication);
  const handleClose = () => {
    dispatch(
      uiActions.showNotification({
        open: false,
      })
    );
  };
  return (
    <div>
      {notfication && (
        <Alert onClose={handleClose} severity={type}>
          {message}
        </Alert>
      )}
    </div>
  );
};

export default Notifications;
