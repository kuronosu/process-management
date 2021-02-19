import React, { useEffect, useRef, useState } from "react";

import reducer from "./reducers";

import "./main.less";
import InactiveProcessesList from "./components/InactiveProcessesList";
import PreparedProcessesList from "./components/PreparedProcessesList";
import SettingsIcon from "./components/SettingsIcon";
import SettingsModal from "./components/SettingsModal";
import { loadInitialState } from "./reducers/state";
import ProcessPanel from "./components/ProcessPanel";
import SuspendedProcessesList from "./components/SuspendedProcessesList";
import RunningProcess from "./components/RunningProcess";
import {
  endOfExecutionStepProcessAction,
  endSimulationAction,
  executeProcessAction,
  startSimulationAction,
  stopSimulationAction,
} from "./reducers/actions";

var _state;
var _id;

const App = () => {
  const [isSettingOverlayShowed, setIsSettingOverlayShowed] = useState(false);
  const [state, dispatch] = React.useReducer(reducer, loadInitialState());
  const [id, setID] = useState(null);

  _state = state;
  _id = id;
  useEffect(() => () => clearInterval(id), [id]);

  function interval() {
    if (_state.processes.executionProcess != null) {
      dispatch(
        endOfExecutionStepProcessAction(_state.processes.executionProcess)
      );
    }
    let prep = _state.processes.preparedProcesses;
    if (prep.length > 0) dispatch(executeProcessAction(prep[0]));
    else if (
      _state.processes.preparedProcesses.length == 0 &&
      _state.processes.suspendedProcesses.length == 0
    ) {
      clearInterval(_id);
      dispatch(endSimulationAction());
    }
  }

  const handleStart = () => {
    dispatch(startSimulationAction());
    setID(
      setInterval(() => {
        interval();
      }, 250 * state.config.quantumRat)
    );
  };

  const handleStop = () => {
    dispatch(stopSimulationAction());
    clearInterval(id);
  };

  const handleEnd = () => {
    clearInterval(id);
    dispatch(endSimulationAction());
  };

  return (
    <>
      <SettingsIcon handleClick={() => setIsSettingOverlayShowed(true)} />
      <SettingsModal
        cfg={state.config}
        show={isSettingOverlayShowed}
        closeAction={() => setIsSettingOverlayShowed(false)}
        dispatch={dispatch}
        simulationFinished={state.simulationFinished}
      />
      <ProcessPanel
        dispatch={dispatch}
        startInterval={handleStart}
        stopInterval={handleStop}
        endSimulation={handleEnd}
        runningSimulation={state.runningSimulation}
        simulationFinished={state.simulationFinished}
      />
      <div className="process-list-container">
        <InactiveProcessesList
          processes={state.processes.inactiveProcesses}
          dispatch={dispatch}
        />
        <PreparedProcessesList
          fullProcessData={state.config.showAllProcessData}
          processes={state.processes.preparedProcesses}
          dispatch={dispatch}
        />
        <RunningProcess
          process={state.processes.executionProcess}
          dispatch={dispatch}
        />
        <SuspendedProcessesList
          fullProcessData={state.config.showAllProcessData}
          processes={state.processes.suspendedProcesses}
          dispatch={dispatch}
        />
      </div>
    </>
  );
};

export default App;
