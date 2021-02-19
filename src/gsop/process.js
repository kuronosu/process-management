var _pid = 1;

export const ProcessStates = {
  INACTIVE: "inactive",
  PREPARED: "prepared",
  SUSPENDED: "suspended",
  EXECUTION: "execution",
};

export function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

function randomPriority(minPriority = 4, maxPriority = 1) {
  if (minPriority < maxPriority)
    minPriority, (maxPriority = maxPriority), minPriority;
  return getRandomInt(maxPriority, minPriority);
}

function randomProcessorTime(minProcessorTime = 20, maxProcessorTime = 100) {
  return getRandomInt(minProcessorTime, maxProcessorTime);
}

export const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];

export const processSortFunction = (a, b) =>
  a.pid > b.pid ? 1 : b.pid > a.pid ? -1 : 0;

export class Process {
  constructor(name) {
    this.name = name;
    this.pid = NaN; // Process ID
    this.p = 0; // Priority
    this.u = 0; // Processor Time
    this.i = false; // Interactivity
    this.state = ProcessStates.INACTIVE; // State of process
    this.poc = 0.0; // Percentage of completion
    this.quantum = 0;
    this.executeCounter = 0;
  }

  prepareRand({
    minPriority,
    maxPriority,
    minProcessorTime,
    maxProcessorTime,
    quantumRat,
  }) {
    this.pid = _pid++;
    this.p = randomPriority(minPriority, maxPriority);
    this.u = randomProcessorTime(minProcessorTime, maxProcessorTime);
    this.i = sample([true, false, false]);
    this.state = ProcessStates.PREPARED;
    this.quantum = this.u / quantumRat;
  }

  execute() {
    this.state = ProcessStates.EXECUTION;
    this.executeCounter++;
    this.poc = (this.executeCounter / this.quantum) * 100;
    if (this.poc > 100) this.poc = 100;
  }

  endExecutionStep() {
    if (this.state == ProcessStates.EXECUTION) {
      if (this.executeCounter >= this.quantum) {
        this.complete();
      } else {
        this.state = this.i ? ProcessStates.SUSPENDED : ProcessStates.PREPARED;
      }
      switch (this.state) {
        case ProcessStates.INACTIVE:
          return "inactiveProcesses";
        case ProcessStates.PREPARED:
          return "preparedProcesses";
        case ProcessStates.SUSPENDED:
          return "suspendedProcesses";
      }
    }
  }

  interact() {
    if (this.state == ProcessStates.SUSPENDED)
      this.state = ProcessStates.PREPARED;
  }

  complete() {
    this.pid = NaN;
    this.p = 0;
    this.u = 0;
    this.i = false;
    this.state = ProcessStates.INACTIVE;
    this.poc = 0.0;
    this.quantum = 0;
    this.executeCounter = 0;
  }
}
