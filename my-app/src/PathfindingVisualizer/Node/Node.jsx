import React, { Component } from "react";
import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { row, col, isStart, isFinish, isVisited } = this.props;
    const extraClass = isFinish
      ? "node-finish"
      : isStart
      ? "node-start"
      : isVisited
      ? "node-visited"
      : "node-item";
    return <div id={`node-${col}-${row}`} className={extraClass}></div>;
  }
}
