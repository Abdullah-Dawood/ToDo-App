import { createContext, useContext, useEffect, useState } from "react";
import { UserAuth } from "./AuthContext";
import axios from "axios";

export const TodoList = createContext();

export const TodoListContext = ({ children }) => {
  const { id } = useContext(UserAuth);
  const [toDoList, setToDoList] = useState([]);
  const [taskUpdate, setTaskUpdated] = useState();
  const [taskDelete, setTaskDelete] = useState();
  const [filterSearch, setfilterSearch] = useState();

  useEffect(() => {
    const getTodoList = async () => {
      try {
        const { data } = await axios.get(`/todo/getTasks/${id}`);
        setToDoList(data.task);
      } catch (err) {
        if (err.response) {
          console.log(err.response);
          setError(err.response.data.msg);
        } else if (err.request) {
          console.log(err.request);
        } else console.log(err.message);
      }
    };
    getTodoList();
  }, [id, taskUpdate, taskDelete]);

  const filterByDueDate = () => {
    const newFilterResult = Array.from(toDoList).sort((a, b) => {
      const prevDate = new Date(a.dueDate);
      const nextDate = new Date(b.dueDate);
      if (prevDate > nextDate) return 1;
      else if (prevDate < nextDate) return -1;
      return 0;
    });

    setToDoList(newFilterResult);
  };

  const filterByCreatedDate = () => {
    const newFilterResult = Array.from(toDoList).sort((a, b) => {
      const prevDate = new Date(a.createdAt);
      const nextDate = new Date(b.createdAt);
      if (prevDate > nextDate) return 1;
      else if (prevDate < nextDate) return -1;
      return 0;
    });

    setToDoList(newFilterResult);
  };

  const filterByUpdatedDate = () => {
    const newFilterResult = Array.from(toDoList).sort((a, b) => {
      const prevDate = new Date(a.updatedAt);
      const nextDate = new Date(b.updatedAt);
      if (prevDate > nextDate) return -1;
      else if (prevDate < nextDate) return 1;
      return 0;
    });

    setToDoList(newFilterResult);
  };

  const filterByPriority = () => {
    const newFilterResult = Array.from(toDoList).sort((a, b) => {
      let prevNo = a.priority;
      let newNo = b.priority;
      return prevNo - newNo;
    });

    setToDoList(newFilterResult);
  };

  const doneTask = async (_id) => {
    try {
      const { data } = await axios.patch(`/todo/updateTaskStatus/${_id}`, {
        userId: id,
      });
      setToDoList(data.task);
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
    <TodoList.Provider
      value={{
        toDoList,
        setToDoList,
        filterByUpdatedDate,
        filterByCreatedDate,
        filterByDueDate,
        filterByPriority,
        taskUpdate,
        setTaskUpdated,
        taskDelete,
        setTaskDelete,
        setfilterSearch,
        filterSearch,
        doneTask,
      }}
    >
      {children}
    </TodoList.Provider>
  );
};
