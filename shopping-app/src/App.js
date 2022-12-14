import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import Notifications from "./components/Notifications";
import { uiActions } from "./store/ui-slice";

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);
  const cart = useSelector((state) => state.cart);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  useEffect(() => {
    const sendRequest = async () => {
      //send state as sending request
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request",
          type: "warning",
        })
      );
      const res = await fetch(
        `https://redux-http-e4dcd-default-rtdb.firebaseio.com/cartItems.json`,
        {
          method: "PUT",
          body: JSON.stringify(cart),
        }
      );
      const data = await res.json();
      //send state as Request is Successful
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sent Request to Database Successfully ",
          type: "success",
        })
      );
    };
    sendRequest().catch((err) => {
      //Send state as Error
      dispatch(
        uiActions.showNotification({
          open: true,
          message: "Sending Request Failed",
          type: "error",
        })
      );
    });
  }, [cart]);
  return (
    <div className="App">
      {notification && (
        <Notifications
          type={notification.type}
          message={notification.message}
        />
      )}
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <Layout />}
    </div>
  );
}

export default App;
