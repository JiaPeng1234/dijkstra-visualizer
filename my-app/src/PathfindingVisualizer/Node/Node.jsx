import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {
      row,
      col,
      isStart,
      isFinish,
      isVisited,
      isWall,
      onMouseDown,
      onMouseUp,
      onMouseEnter,
    } = this.props;
    const extraClass = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : isWall
      ? "node-wall"
      : "node-item";
    return (
      <div
        id={`node-${col}-${row}`}
        className={extraClass}
        onMouseDown={() => {
          onMouseDown(row, col);
        }}
        onMouseUp={() => {
          onMouseUp();
        }}
        onMouseEnter={() => {
          onMouseEnter(row, col);
        }}
      ></div>
    );
  }
}
