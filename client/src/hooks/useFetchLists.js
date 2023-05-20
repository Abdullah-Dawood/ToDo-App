import { useContext, useEffect } from "react";
import { TodoList } from "../contexts/TodoListContext";

export const useFetchList = (filterType) => {
  const {
    filterByUpdatedDate,
    filterByCreatedDate,
    filterByDueDate,
    filterByPriority,
  } = useContext(TodoList);
  useEffect(() => {
    if (filterType == "Due Date") {
      filterByDueDate();
    }
    if (filterType == "Priority") {
      filterByPriority();
    }
    if (filterType == "Created At") {
      filterByCreatedDate();
    }
    if (filterType == "Updated At") {
      filterByUpdatedDate();
    }
  }, [filterType]);
};
