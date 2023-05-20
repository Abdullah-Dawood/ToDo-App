import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "./Form Components/Input";
import "../css/Home.css";

const InlineEditTask = ({
  task,
  handleEditMode,
  handleSaveChanges,
  setTaskId,
}) => {
  const [newTaskName, setNewTaskName] = useState("");

  return (
    <div className="singleTask" key={task._id}>
      <div className="tasks">
        <Input type="checkbox"></Input>
        <Input
          type="text"
          placeholder="Enter Task Name"
          defaultValue={task.taskName}
          onChange={(e) => {
            e.preventDefault();
            setNewTaskName(e.target.value);
          }}
        />
        <div className="actions">
          <div className="edit">
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSaveChanges(
                  e,
                  task._id,
                  newTaskName,
                  task.priority,
                  task.dueDate,
                  setTaskId
                );
              }}
            >
              <FontAwesomeIcon icon={faFloppyDisk} />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSaveChanges();
                handleEditMode(e, null);
              }}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InlineEditTask;
