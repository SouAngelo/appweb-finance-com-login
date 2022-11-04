import React from "react";
import { BrowserRouter } from "react-router-dom";
import Header from "./Components/Header";
import OperationProvider from "./Contexts/operationDashboard";
import { ToastContainer, toast } from 'react-toastify';
import RoutesApp from "./Routes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <OperationProvider>
          <RoutesApp />
          <ToastContainer />
        </OperationProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
