import axios from "axios";
import { TodoList } from "../contexts/TodoListContext";
import { useContext } from "react";
export const useTodoEdit = () => {
  const { setTaskUpdated } = useContext(TodoList);
  const handleSaveChanges = async (
    e,
    task_id,
    newTaskName,
    priority,
    dueDate,
    setTaskId
  ) => {
    e.preventDefault();
    try {
      const { data } = await axios.patch(`/todo/updateTask/${task_id}`, {
        taskName: newTaskName,
        priority,
        dueDate,
      });
      console.log(data);
      setTaskId(null);
      setTaskUpdated(data.task);
    } catch (err) {
      if (err.response) {
        console.log(err.response);
        setError(err.response.data.msg);
      } else if (err.request) {
        console.log(err.request);
      } else console.log(err.message);
    }
  };
  return { handleSaveChanges };
};
