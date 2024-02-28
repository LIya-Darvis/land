import { StrictMode, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import ScenePage from "./pages/ScenePage";

function App() {

  return (
    <StrictMode>
      <ScenePage/>
    </StrictMode>
  );
}

export default App;
