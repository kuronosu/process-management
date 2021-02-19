import React, { useState } from "react";
import {
  createRandomProcessAction,
  prepareRandomAction,
} from "../reducers/actions";
import AddProcess from "./AddProcess";

const ProcessPanel = ({
  dispatch,
  startInterval,
  stopInterval,
  endSimulation,
  runningSimulation,
  simulationFinished
}) => {
  const [processCount, setProcessCount] = useState(10);
  return (
    <div>
      <AddProcess dispatch={dispatch} />
      <input
        value={processCount}
        onChange={(e) => {
          const target = e.target;
          const value = parseInt(target.value);
          if (isNaN(value) || value <= 0) value = 1;
          setProcessCount(value);
        }}
        type="number"
      />
      <button onClick={() => dispatch(createRandomProcessAction(processCount))}>
        Add random processes
      </button>
      <button onClick={() => dispatch(prepareRandomAction())}>
        Prepare random
      </button>
      {runningSimulation ? (
        <button onClick={stopInterval}>Stop simulation</button>
      ) : (
        <button onClick={startInterval}>Start simulation</button>
      )}
      <button disabled={simulationFinished} onClick={endSimulation}>
        End simulation
      </button>
    </div>
  );
};

export default ProcessPanel;
