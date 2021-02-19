import React from "react";

import icon from "../assets/svg/settings.svg";

const SettingsIcon = ({ handleClick }) => (
  <img
    width="30px"
    onClick={handleClick}
    className="icon clickable"
    alt="settings icon"
    src={icon}
  />
);
export default SettingsIcon;
