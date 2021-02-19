import React, { useRef } from "react";
import { Process } from "../../gsop/process";
import {
  addItem,
  createListAction,
  inactiveListActions,
} from "../reducers/actions";

const AddProcess = ({ dispatch }) => {
  const processNameRef = useRef(null);
  return (
    <>
      <input ref={processNameRef} type="text" placeholder="Name of process" />
      <button
        onClick={() => {
          let val = processNameRef.current.value.trim();
          if (val) {
            dispatch(
              createListAction(inactiveListActions, addItem, new Process(val))
            );
            processNameRef.current.value = "";
          }
        }}
      >
        Add process
      </button>
    </>
  );
};

export default AddProcess;
