import React from "react";
import Main from "./Container/Main";
import { Provider } from "react-redux";
import { store } from "./Container/Redux/Store";

export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
