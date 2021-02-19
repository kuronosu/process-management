import {
  Process,
  sample,
  getRandomInt,
  processSortFunction,
} from "../../gsop/process";
import {
  addItem,
  inactiveListActions,
  preparedListActions,
  removeItem,
  suspendedLisActions,
  prepareProcess,
  updateConfig,
  createRandomProcess,
  prepareRandom,
  executeProcess,
  endOfExecutionStepProcess,
  interactWithTheProcess,
  startSimulation,
  endSimulation,
  stopSimulation,
} from "./actions";
import { defaultInitialState, validConfig } from "./state";

const characters = "abcdefghijklmñopqrstuvwxyz0123456789";

export default (state = defaultInitialState, { type, payload }) => {
  switch (type) {
    case inactiveListActions:
      return newStateOnList(state, payload, "inactiveProcesses");
    case preparedListActions:
      return newStateOnList(state, payload, "preparedProcesses");
    case suspendedLisActions:
      return newStateOnList(state, payload, "suspendedProcesses");
    case prepareProcess:
      return prepareProcessReducer(state, payload);
    case updateConfig:
      return { ...state, config: updateConfigReducer(state.config, payload) };
    case createRandomProcess:
      return createRandomProcessReducers(state, payload);
    case prepareRandom:
      return prepareRandomReducer(state);
    case executeProcess:
      return executeProcessReducer(state, payload);
    case endOfExecutionStepProcess:
      return endOfExecutionStepProcessReducer(state, payload);
    case interactWithTheProcess:
      return interactWithTheProcessReducer(state, payload);
    case startSimulation:
      return { ...state, runningSimulation: true, simulationFinished: false };
    case stopSimulation:
      return { ...state, runningSimulation: false, simulationFinished: false };
    case endSimulation:
      return {
        ...state,
        runningSimulation: false,
        simulationFinished: true,
        processes: resetProcess(state.processes),
      };
    default:
      return state;
  }
};

function resetProcess(processes = defaultInitialState.processes) {
  let tmp = [];
  if (processes.executionProcess) {
    processes.executionProcess.complete();
    tmp.push(processes.executionProcess);
  }

  tmp = [
    ...tmp,
    ...processes.inactiveProcesses,
    ...processes.preparedProcesses.map((it) => {
      it.complete();
      return it;
    }),
    ...processes.suspendedProcesses.map((it) => {
      it.complete();
      return it;
    }),
  ];
  return {
    inactiveProcesses: tmp,
    preparedProcesses: [],
    suspendedProcesses: [],
    executionProcess: null,
  };
}

function newStateOnList(state, payload, list) {
  return {
    ...state,
    processes: {
      ...state.processes,
      [list]: listReducer(state.processes[list], payload),
    },
  };
}

const listReducer = (list = [], { action, payload }) => {
  switch (action) {
    case addItem:
      return list.pushAndReturn(payload).sort(processSortFunction);
    case removeItem:
      return list.removeOnce(payload);
    default:
      throw list;
  }
};

function prepareProcessReducer(state, payload) {
  if (payload instanceof Process) {
    payload.prepareRand(state.config);
    return {
      ...state,
      processes: {
        ...state.processes,
        inactiveProcesses: listReducer(state.processes.inactiveProcesses, {
          action: removeItem,
          payload,
        }),
        preparedProcesses: listReducer(state.processes.preparedProcesses, {
          action: addItem,
          payload,
        }),
      },
    };
  }
  return state;
}

function updateConfigReducer(config, { field, value }) {
  let tmp = { ...config, [field]: value };
  if (validConfig(tmp)) {
    localStorage.setObject("config", tmp);
    return tmp;
  }
  return { ...config };
}

function createRandomProcessReducers(state, count) {
  for (let _ = 0; _ < count; _++) {
    let p = new Process(`${sample(characters)}${sample(characters)}`);
    state.processes.inactiveProcesses = state.processes.inactiveProcesses.pushAndReturn(
      p
    );
  }
  return {
    ...state,
    processes: {
      ...state.processes,
      inactiveProcesses: state.processes.inactiveProcesses,
    },
  };
}

function prepareRandomReducer(state) {
  const count = parseInt(
    (getRandomInt(50, 80) / 100) * state.processes.inactiveProcesses.length
  );
  for (let _ = 0; _ < count; _++) {
    let p = sample(state.processes.inactiveProcesses);
    state = prepareProcessReducer(state, p);
  }
  return state;
}

function executeProcessReducer(state, payload) {
  if (state.processes.executionProcess == null && payload instanceof Process) {
    payload.execute();
    return {
      ...state,
      processes: {
        ...state.processes,
        executionProcess: payload,
        preparedProcesses: listReducer(state.processes.preparedProcesses, {
          action: removeItem,
          payload,
        }),
      },
    };
  }
  return state;
}

function endOfExecutionStepProcessReducer(state, payload) {
  if (payload instanceof Process) {
    const list = payload.endExecutionStep();
    return {
      ...state,
      processes: {
        ...state.processes,
        executionProcess: null,
        [list]: listReducer(state.processes[list], {
          action: addItem,
          payload,
        }),
      },
    };
  }
  return state;
}

function interactWithTheProcessReducer(state, payload) {
  if (payload instanceof Process) {
    payload.interact();
    return {
      ...state,
      processes: {
        ...state.processes,
        preparedProcesses: listReducer(state.processes.preparedProcesses, {
          action: addItem,
          payload,
        }),
        suspendedProcesses: listReducer(state.processes.suspendedProcesses, {
          action: removeItem,
          payload,
        }),
      },
    };
  }
  return state;
}
