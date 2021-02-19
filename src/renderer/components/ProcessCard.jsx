import React from "react";
import { ProcessStates } from "../../gsop/process";

const ProcessCard = ({
  process,
  showAll = true,
  handeClick,
  clickable = true,
}) => (
  <div
    className={`card ${process.state} ${clickable ? "clickable" : ""}`}
    onClick={() => clickable && handeClick()}
  >
    {process.state != ProcessStates.INACTIVE && <span>PID: {process.pid}</span>}
    <span>Name:{process.name}</span>
    {process.state != ProcessStates.INACTIVE && (
      <>
        <span>POC:{`${process.poc.toFixed(2)}%`}</span>
        <progress max="100" value={process.poc.toFixed(2)} ></progress>
        <div className={showAll ? "" : "hide"}>
          <span>Priority: {process.p}</span>
          <span>PST:{process.u}</span>
          <span>Quantum:{process.quantum}</span>
          <span>{process.i ? "Con interactividad" : "Sin Interactividad"}</span>
        </div>
      </>
    )}
  </div>
);

export default ProcessCard;
