import React, { useRef } from "react";
import { updateConfigAction } from "../reducers/actions";

const SettingsModal = ({
  cfg,
  dispatch,
  show = false,
  closeAction,
  simulationFinished,
}) => {
  const modalRef = useRef(null);
  const handleInputChange = (event) => {
    const target = event.target;
    const value =
      target.type === "checkbox" ? target.checked : parseInt(target.value);
    const name = target.name;
    if (simulationFinished || target.type === "checkbox") dispatch(updateConfigAction(name, value));
  };

  window.onclick = function (event) {
    if (event.target == modalRef.current) {
      closeAction();
    }
  };

  return (
    <div ref={modalRef} className={`modal ${show ? "" : "hide"}`}>
      <div className="modal-content">
        <span className="close" onClick={closeAction}>
          &times;
        </span>
        <div className="modal-body">
          <form className="form-inline">
            <div className="form-group">
              <label htmlFor="minPriority">Min Priority</label>
              <input
                className="form-control"
                type="number"
                id="minPriority"
                name="minPriority"
                value={cfg.minPriority}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxPriority">Max Priority</label>
              <input
                className="form-control"
                type="number"
                id="maxPriority"
                name="maxPriority"
                value={cfg.maxPriority}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="minProcessorTime">Min Processor Time</label>
              <input
                className="form-control"
                type="number"
                id="minProcessorTime"
                name="minProcessorTime"
                value={cfg.minProcessorTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="maxProcessorTime">Max Processor Time</label>
              <input
                className="form-control"
                type="number"
                id="maxProcessorTime"
                name="maxProcessorTime"
                value={cfg.maxProcessorTime}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="quantumRat">Quantum Rat</label>
              <input
                className="form-control"
                type="number"
                id="quantumRat"
                name="quantumRat"
                step="2"
                value={cfg.quantumRat}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group form-check">
              <label className="form-check-label" htmlFor="showAllProcessData">
                Show all process data
              </label>
              <input
                type="checkbox"
                id="showAllProcessData"
                name="showAllProcessData"
                checked={cfg.showAllProcessData}
                onChange={handleInputChange}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
