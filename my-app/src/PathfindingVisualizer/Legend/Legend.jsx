import React, { Component } from "react";
import "./Legend.css";

export default class Legend extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { legendClass, context } = this.props;
    return (
      <li className="legend-li">
        <div className={legendClass + " legend"}></div>
        {context}
      </li>
    );
  }
}
