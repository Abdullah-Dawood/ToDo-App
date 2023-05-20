import React, { useContext, useState } from "react";
import Form from "./Form";

import Input from "./Form Components/Input";
import Select from "./Form Components/Select";
import Option from "./Form Components/Option";
import Label from "./Form Components/Label";
import axios, { Axios } from "axios";
import { UserAuth } from "../contexts/AuthContext";
import Button from "./Form Components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../css/AddTaskForm.css";
import { TodoList } from "../contexts/TodoListContext";
import "react-toastify/dist/ReactToastify.css";

const NewTodoForm = () => {
  const { id } = useContext(UserAuth);
  const { setfilterSearch, setToDoList } = useContext(TodoList);

  const [taskName, setTaskName] = useState("");
  const [priority, setPriority] = useState(3);
  const [date, setDate] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handlePriorityChange = (e) => {
    e.preventDefault();
    if (e.target.value == "Low") {
      setPriority(3);
    } else if (e.target.value == "Medium") {
      setPriority(2);
    } else {
      setPriority(1);
    }
  };

  const handleFormSubmit = async () => {
    try {
      const { data } = await axios.post("/todo/addTask", {
        userId: id,
        taskName,
        priority,
        dueDate: date,
      });
      setToDoList((list) => [...list, data.task]);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
      } else console.log(err.message);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 colsm-12 col-md-12 col-lg-12 colxl-12 colxxl-12">
          <div className="form-addTask">
            {/* <!-- Button trigger modal --> */}
            <div className="search-add">
              <Input
                type="text"
                placeholder="Search..."
                onChange={(e) => {
                  e.preventDefault();
                  setfilterSearch(e.target.value);
                  saveSearchInLocalStorage();
                }}
              ></Input>
              <button
                type="button"
                class="add-task-btn"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Task
              </button>
            </div>

            {/* <!-- Modal --> */}
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                  <div class="modal-header close-button">
                    <h5 class="modal-title">Create Task</h5>
                    <button
                      type="button"
                      class=""
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                  <Form handleSubmit={handleFormSubmit}>
                    <div class="modal-body">
                      <div className="enter-task-name">
                        <Label>Task Name</Label>
                        <Input
                          type="text"
                          placeholder="Enter name..."
                          onChange={(e) => {
                            e.preventDefault;
                            setTaskName(e.target.value);
                          }}
                        />
                      </div>
                      <div className="enter-priority">
                        <Label>Priority Level</Label>
                        <Select
                          id="priority"
                          defaultValue="Low"
                          onChange={handlePriorityChange}
                        >
                          <Option value="Low">Low</Option>
                          <Option value="Medium">Medium</Option>
                          <Option value="High">High</Option>
                        </Select>
                      </div>
                      <div className="enter-date">
                        <Label>Due Date:</Label>
                        <Input
                          type="date"
                          onChange={(e) => {
                            e.preventDefault;
                            setDate(e.target.value);
                          }}
                        ></Input>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <Button type="submit">Add</Button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTodoForm;
