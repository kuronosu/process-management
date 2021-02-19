import React from "react";
import "../main.less";
import { executeProcessAction } from "../reducers/actions";
import ProcessCard from "./ProcessCard";

const PreparedProcessesList = ({ processes, fullProcessData, dispatch }) => {
  return (
    <div className="process-list">
      <h3>Prepared process</h3>
      <ul>
        {processes.map((it) => (
          <li key={it.pid}>
            <ProcessCard
              showAll={fullProcessData}
              process={it}
              clickable={false}
              // handeClick={() => {
              //   dispatch(executeProcessAction(it));
              // }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreparedProcessesList;
