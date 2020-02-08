import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";

import Header from "./components/common/Header";
import PageBody from "./components/common/PageBody";

function App() {
  return (
    <div className="App">
      <Header />
      <PageBody>
        <br />
        <h1>Hello Dev Launchers!</h1>
        <hr />
        <h3>Start editing to see some magic</h3>
        <p>
          This is the beginning of your very own app! Begin making changes to
          the index.js file, along with the components to get a feel for how
          React apps are structured.
        </p>
      </PageBody>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
