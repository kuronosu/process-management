export const defaultInitialState = {
  processes: {
    inactiveProcesses: [],
    preparedProcesses: [],
    suspendedProcesses: [],
    executionProcess: null,
  },
  config: {
    minPriority: 4,
    maxPriority: 1,
    minProcessorTime: 20,
    maxProcessorTime: 100,
    showAllProcessData: true,
    quantumRat: 4,
  },
  runningSimulation: false,
  simulationFinished: true
};

export const loadInitialState = () => {
  let config = localStorage.getObject("config", (config) => {
    if (config == null) {
      return defaultInitialState.config;
    }
    let {
      minPriority = defaultInitialState.config.minPriority,
      maxPriority = defaultInitialState.config.maxPriority,
      minProcessorTime = defaultInitialState.config.minProcessorTime,
      maxProcessorTime = defaultInitialState.config.maxProcessorTime,
      showAllProcessData = true,
      quantumRat = defaultInitialState.config.quantumRat,
    } = config;
    if (isNaN(minPriority))
      minPriority = defaultInitialState.config.minPriority;
    if (isNaN(maxPriority))
      maxPriority = defaultInitialState.config.maxPriority;
    if (isNaN(minProcessorTime))
      minProcessorTime = defaultInitialState.config.minProcessorTime;
    if (isNaN(maxProcessorTime))
      maxProcessorTime = defaultInitialState.config.maxProcessorTime;
    if (isNaN(quantumRat)) quantumRat = defaultInitialState.config.quantumRat;

    if (minPriority < maxPriority) {
      minPriority = defaultInitialState.config.minPriority;
      maxPriority = defaultInitialState.config.maxPriority;
    }
    if (minProcessorTime > maxProcessorTime) {
      minProcessorTime = defaultInitialState.config.minProcessorTime;
      maxProcessorTime = defaultInitialState.config.maxProcessorTime;
    }
    if (typeof showAllProcessData !== "boolean") {
      showAllProcessData = defaultInitialState.config.showAllProcessData;
    }
    if (quantumRat % 2 != 0) {
      quantumRat = defaultInitialState.config.quantumRat;
    }
    return {
      minPriority,
      maxPriority,
      minProcessorTime,
      maxProcessorTime,
      showAllProcessData,
      quantumRat,
    };
  });
  return { ...defaultInitialState, config };
};

export const validConfig = ({
  minPriority,
  maxPriority,
  minProcessorTime,
  maxProcessorTime,
  quantumRat,
}) =>
  minPriority > 0 &&
  maxPriority > 0 &&
  minProcessorTime > 0 &&
  maxProcessorTime > 0 &&
  minPriority > maxPriority &&
  minProcessorTime < maxProcessorTime &&
  quantumRat % 2 == 0;
