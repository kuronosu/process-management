import React from "react";
import { interactWithTheProcessAction } from "../reducers/actions";
import ProcessCard from "./ProcessCard";

const SuspendedProcessesList = ({ processes, fullProcessData, dispatch }) => {
  return (
    <div className="process-list">
      <h3>Suspended processes</h3>
      <ul>
        {processes.map((it) => (
          <li key={it.pid}>
            <ProcessCard
              showAll={fullProcessData}
              process={it}
              clickable={true}
              handeClick={() => {
                dispatch(interactWithTheProcessAction(it));
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuspendedProcessesList;
