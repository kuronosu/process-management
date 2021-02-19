import React from "react";
import "../main.less";
import { prepareAction } from "../reducers/actions";
import ProcessCard from "./ProcessCard";

const InactiveProcessesList = ({ processes, dispatch }) => {
  return (
    <div className="process-list">
      <h3>Inactive process</h3>
      <ul>
        {processes.map((it, i) => (
          <li key={i}>
            <ProcessCard
              process={it}
              handeClick={() => dispatch(prepareAction(it))}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InactiveProcessesList;
