import React, { useContext, useState } from "react";
import Input from "./Form Components/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { TodoList } from "../contexts/TodoListContext";

const RenderTask = ({ task, handleEditMode, handleDeleteTask, overDue }) => {
  const { doneTask } = useContext(TodoList);
  let date = new Date(task.dueDate);
  let currentDate = new Date();

  const checkPriority = (priority) => {
    if (priority == "1") return "High";
    else if (priority == "2") return "Medium";
    if (priority == "3") return "Low";
  };

  return (
    <>
      {overDue ? (
        <>
          {date < currentDate ? (
            <div className="tasks">
              <strike>
                <p>{task.taskName}</p>
                <span>
                  {date.getFullYear() +
                    "-" +
                    date.getMonth() +
                    "-" +
                    date.getDate()}
                </span>
              </strike>
            </div>
          ) : (
            <div></div>
          )}
        </>
      ) : (
        <div className="tasks">
          {task.status == "done" ? (
            <>
              <Input
                className="form-check-input"
                type="checkbox"
                checked
                Onclick={(e) => {
                  e.preventDefault();
                  doneTask(task._id);
                }}
              ></Input>
              <strike>
                <p>{task.taskName}</p>
                <p>{checkPriority(task.priority)}</p>
                <p>
                  {" "}
                  {date.getFullYear() +
                    "-" +
                    date.getMonth() +
                    "-" +
                    date.getDate()}
                </p>
              </strike>
            </>
          ) : (
            <>
              <Input
                type="checkbox"
                class="form-check-input"
                Onclick={(e) => {
                  e.preventDefault();
                  doneTask(task._id);
                }}
              ></Input>
              <p>{task.taskName}</p>
              <p>{checkPriority(task.priority)}</p>
              <p>
                {date.getFullYear() +
                  "-" +
                  date.getMonth() +
                  "-" +
                  date.getDate()}
              </p>
            </>
          )}
          <div className="actions">
            <div className="edit">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleEditMode(e, task._id);
                }}
              >
                <FontAwesomeIcon icon={faPenToSquare} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleDeleteTask(task._id);
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RenderTask;
