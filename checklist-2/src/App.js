import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import QuizForm from "../src/Admin/QuizForm";

function App() {
  const reducer = combineReducers({
    form: reduxFormReducer,
  });
  const store = (window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore)(reducer);
  return (
    <Provider store={store}>
      <React.Fragment>
        <QuizForm />
      </React.Fragment>
    </Provider>
  );
}

export default App;
