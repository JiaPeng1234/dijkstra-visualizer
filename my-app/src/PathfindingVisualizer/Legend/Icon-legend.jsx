import React, { Component } from "react";
import "./Legend.css";

export default class IconLegend extends Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    const { svg, context, LegendIconClass } = this.props;
    return (
      <li className="legend-li">
        <div className="legend-icon">
          <svg aria-hidden="true" className={LegendIconClass}>
            <use xlinkHref={svg} />
          </svg>
        </div>
        {context}
      </li>
    );
  }
}
