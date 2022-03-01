import React from "react";

import "./Switch.css";

const SwitchUnit = ({ clickThis, unit }) => {
  return (
    <div>
      <div className="unit-selection">
        <div>
          <label className="switch">
            <input type="checkbox" onClick={clickThis} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="unit">
          <p>{unit}</p>
        </div>
      </div>
    </div>
  );
};

export default SwitchUnit;
