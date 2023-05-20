import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

export const UserAuth = createContext();

export const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { id: null, username: "" });
  useEffect(() => {
    const abortCont = new AbortController();
    const checkProfile = async () => {
      const { data } = await axios.get("/user/profile", {
        signal: abortCont.signal,
      });

      dispatch({
        type: "LOGIN",
        id: data.userID.id,
        username: data.userID.username,
      });
    };
    checkProfile();
    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <UserAuth.Provider value={{ ...state, dispatch }}>
      {children}
    </UserAuth.Provider>
  );
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, id: action.id, username: action.username };
    case "LOGOUT":
      return { ...state, id: null };
    default:
      return state;
  }
};
