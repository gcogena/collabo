import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import { Neo4jProvider, createDriver } from 'use-neo4j'
const driver = createDriver('bolt', 'localhost', 7687, 'ogena', 'ogena1234');

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  <React.StrictMode>
    <Neo4jProvider driver={driver}>
      <App />
    </Neo4jProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
