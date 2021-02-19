export const addItem = "ADD_ITEM";
export const removeItem = "REMOVE_ITEM";
export const inactiveListActions = "INACTIVE_LIST_ACTIONS";
export const preparedListActions = "PREPARED_LIST_ACTIONS";
export const suspendedLisActions = "SUSPENDED_LIST_ACTIONS";

export const prepareProcess = "PREPARE_PROCESS";
export const updateConfig = "UPDATE_CONFIG";
export const createRandomProcess = "CREATE_RANDOM_PROCESS";
export const prepareRandom = "PREPARE_RANDOM";
export const executeProcess = "EXECUTE_PROCESS";
export const endOfExecutionStepProcess = "END_OF_EXECUTION_STEP_PROCESS";
export const interactWithTheProcess = "INTERACT_WITH_THE_PROCESS";
export const startSimulation = "START_SIMULATION";
export const stopSimulation = "STOP_SIMULATION";
export const endSimulation = "END_SIMULATION";

export const createListAction = (actionList, action, payload) => ({
  type: actionList,
  payload: {
    action: action,
    payload: payload,
  },
});

export const prepareAction = (process) => ({
  type: prepareProcess,
  payload: process,
});

export const updateConfigAction = (field, value) => ({
  type: updateConfig,
  payload: { field, value },
});

export const createRandomProcessAction = (count) => ({
  type: createRandomProcess,
  payload: count,
});

export const prepareRandomAction = () => ({
  type: prepareRandom,
  payload: 1,
});

export const executeProcessAction = (process) => ({
  type: executeProcess,
  payload: process,
});

export const endOfExecutionStepProcessAction = (process) => ({
  type: endOfExecutionStepProcess,
  payload: process,
});

export const interactWithTheProcessAction = (process) => ({
  type: interactWithTheProcess,
  payload: process,
});

export const startSimulationAction = () => ({
  type: startSimulation,
});
export const stopSimulationAction = () => ({
  type: stopSimulation,
});

export const endSimulationAction = () => ({
  type: endSimulation,
});
