import React from "react";
import NewTodoForm from "../components/NewTodoForm";
import ToDoList from "../components/ToDoList";
import "../css/Home.css";

const Home = () => {
  return (
    <section className="home-page">
      <div className="home-page-heading">To-do List App</div>

      <NewTodoForm />

      <ToDoList />
    </section>
  );
};

export default Home;
