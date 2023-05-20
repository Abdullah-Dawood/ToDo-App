import { useContext, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserAuth } from "./contexts/AuthContext";
import axios from "axios";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { TodoListContext } from "./contexts/TodoListContext";

function App() {
  const { id, username } = useContext(UserAuth);

  axios.defaults.withCredentials = true;

  return (
    <TodoListContext>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={!id ? <Login /> : <Home />}></Route>
          <Route path="/signup" element={!id ? <Signup /> : <Home />}></Route>
          <Route path="/home" element={id ? <Home /> : <Login />}></Route>
        </Routes>
      </BrowserRouter>
    </TodoListContext>
  );
}

export default App;
