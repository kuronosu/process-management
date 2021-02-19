import React from "react";
import { endOfExecutionStepProcessAction } from "../reducers/actions";
import ProcessCard from "./ProcessCard";

const RunningProcess = ({ process, dispatch }) => {
  if (process)
    return (
      <div >
        <h3>Running processes</h3>
        <ProcessCard
          showAll={true}
          process={process}
          clickable={false}
          // clickable={true}
          // handeClick={() => {
          //   dispatch(endOfExecutionStepProcessAction(process));
          // }}
        />
      </div>
    );
  return null;
};

export default RunningProcess;
