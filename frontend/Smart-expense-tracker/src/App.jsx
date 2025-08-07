import React from "react";


import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Home from "./pages/Dashboard/Home";
import Expense from "./pages/Dashboard/expense";
import Income from "./pages/Dashboard/income";
const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path = "/" element={<Root/>} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<Signup />} />
          <Route path = "/dashboard" exact element={<Home/>} />
          <Route path="/expense" exact element={<Expense />} />
          <Route path = "/income" exact element={<Income/>} />

        </Routes>
      </Router>
    </div>
  );
}
  export default App;


const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? (
    <Navigate to="/dashboard" replace />
  ) : (
    <Navigate to="/login" replace />
  );
}