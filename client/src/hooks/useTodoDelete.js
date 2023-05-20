import axios from "axios";
import { useContext } from "react";
import { TodoList } from "../contexts/TodoListContext";
export const useTodoDelete = () => {
  const { setTaskDelete } = useContext(TodoList);
  const handleDeleteTask = async (task_id) => {
    try {
      const { data } = await axios.delete(`/todo/deleteTask/${task_id}`);
      setTaskDelete(data);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
      } else console.log(err.message);
    }
  };
  return { handleDeleteTask };
};
