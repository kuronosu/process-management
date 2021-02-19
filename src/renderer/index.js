import React from "react";
import { render } from "react-dom";

import App from "./App";
import initPrototype from "./prototypes";

initPrototype();

render(<App />, document.getElementById("app"));
