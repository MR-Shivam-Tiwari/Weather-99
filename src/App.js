// App.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import "./App.css"; // Import your CSS file
import Weather from "./Components/Weather";

function App() {
  return (
    <div className="App">
      <Weather />
    </div>
  );
}

export default App;
