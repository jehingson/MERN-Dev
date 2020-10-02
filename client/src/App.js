import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { DataProvider } from "context/GlobalState";
import Header from "componentes/header/Header";
import Pages from "componentes/paginacion/Pages"


function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
            <Header />
            <Pages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
