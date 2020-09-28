import React from "react";
import "./App.css";
import { Provider } from 'react-redux'
import store from './PathfindingVisualizer/store'
import PathfindingVisualizer from "./PathfindingVisualizer/PathfindingVisualizer";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PathfindingVisualizer></PathfindingVisualizer>
      </div>
    </Provider>
  );
}

export default App;
