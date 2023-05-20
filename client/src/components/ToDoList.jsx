import React, { useContext, useState } from "react";

import Select from "./Form Components/Select";
import Option from "./Form Components/Option";
import InlineEditTask from "./InlineEditTask";
import RenderTask from "./RenderTask";
import { useTodoEdit } from "../hooks/useTodoEdit";
import { useTodoDelete } from "../hooks/useTodoDelete";
import { TodoList } from "../contexts/TodoListContext";
import { useFetchList } from "../hooks/useFetchLists";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";

const ToDoList = () => {
  const { toDoList, filterSearch } = useContext(TodoList);
  const [taskId, setTaskId] = useState("");
  const [overDue, setOverDue] = useState(false);

  const value = toDoList.filter((record) =>
    record.taskName.toLowerCase().includes(filterSearch)
  );

  const { handleSaveChanges } = useTodoEdit();
  const { handleDeleteTask } = useTodoDelete();

  const [filterType, setFilterType] = useState("Priority");

  const handleEditMode = (e, task_id) => {
    e.preventDefault();
    setTaskId(task_id);
  };

  useFetchList(filterType);

  return (
    <DragDropContext
      onDragEnd={(params) => {
        let src = params.source.index;
        let des = params.destination.index;
        const element = toDoList.splice(src, 1)[0];
        toDoList.splice(des, 0, element);
      }}
    >
      <div className="todoLists-box">
        <div className="filter">
          <div className="tasks-view">
            <button
              onClick={(e) => {
                e.preventDefault;
                setOverDue(false);
              }}
            >
              AllTasks
            </button>
            <button
              onClick={(e) => {
                e.preventDefault;
                setOverDue(true);
              }}
            >
              Overdue Tasks
            </button>
          </div>

          <Select
            id="filter"
            value={filterType}
            onChange={(e) => {
              e.preventDefault();
              setFilterType(e.target.value);
            }}
          >
            <Option value="Due Date">Due Date</Option>
            <Option value="Priority">Priority</Option>
            <Option value="Created At">Created at</Option>
            <Option value="Updated At">Updated at</Option>
          </Select>
        </div>

        <div className="todoList-panel">
          <Droppable droppableId="TodoList">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {filterSearch ? (
                  <>
                    {toDoList &&
                      toDoList
                        .filter((record) =>
                          record.taskName.toLowerCase().includes(filterSearch)
                        )
                        .map((task, index) => (
                          <div key={task._id}>
                            {taskId == task._id ? (
                              <InlineEditTask
                                task={task}
                                handleEditMode={handleEditMode}
                                handleSaveChanges={handleSaveChanges}
                                setTaskId={setTaskId}
                              />
                            ) : (
                              <Draggable
                                draggableId={"draggable-" + task._id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    className="singleTask"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    <RenderTask
                                      task={task}
                                      handleEditMode={handleEditMode}
                                      handleDeleteTask={handleDeleteTask}
                                      index={index}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            )}
                          </div>
                        ))}
                  </>
                ) : (
                  <>
                    {toDoList &&
                      toDoList.map((task, index) => (
                        <div key={task._id}>
                          {taskId == task._id ? (
                            <InlineEditTask
                              task={task}
                              handleEditMode={handleEditMode}
                              handleSaveChanges={handleSaveChanges}
                              setTaskId={setTaskId}
                            />
                          ) : (
                            <Draggable
                              draggableId={"draggable-" + task._id}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="singleTask"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <RenderTask
                                    task={task}
                                    overDue={overDue}
                                    handleEditMode={handleEditMode}
                                    handleDeleteTask={handleDeleteTask}
                                    index={index}
                                  />
                                </div>
                              )}
                            </Draggable>
                          )}
                        </div>
                      ))}
                  </>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ToDoList;
