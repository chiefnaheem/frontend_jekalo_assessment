
// import "../axios";
import axios from 'axios'
import React, { useContext, useReducer } from "react";
import {
  SET_LOADING,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
  DELETE_USER_ERROR,
} from "./actions";
import reducer from "./reducer";

const initialState = {
  isLoading: false,
  users: [],
  showAlert: false,
};
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setLoading = () => {
    dispatch({ type: SET_LOADING });
  };

  //fetch all users
  const fetchUsers = async () => {
    setLoading();
    try {
      const { data } = await axios.get(`https://jekalo-task.herokuapp.com/api/users`);
    
      dispatch({ type: FETCH_USERS_SUCCESS, payload: data.data.data });
      
    } catch (error) {
      dispatch({ type: FETCH_USERS_ERROR });
    }
  };

  // create new user
  const createUser = async (userInput) => {
    setLoading();
    try {
      // const user = await fetch(`https://jekalo-task.herokuapp.com/api/user`, {
      //   method: 'POST',
      //   headers: 
      //   body: JSON.stringify(userInput)
      // })
      // console.log(user)
      console.log("userInput" , userInput)
      const { data } = await axios.post(`https://jekalo-task.herokuapp.com/api/user`, {...userInput});
      console.log("data:", data)
      dispatch({ type: CREATE_USER_SUCCESS, payload: data.data.data });
    } catch (error) {
      dispatch({ type: CREATE_USER_ERROR });
    }
  };
  const deleteUser = async (username) => {
    setLoading();
    try {
      await axios.delete(`https://jekalo-task.herokuapp.com/api/${username}`);

      fetchUsers();
    } catch (error) {
      dispatch({ type: DELETE_USER_ERROR });
    }
  };

  
//   useEffect(() => {
//     const user = localStorage.getItem("user");
//     if (user) {
//       const newUser = JSON.parse(user);
//       dispatch({ type: SET_USER, payload: newUser.name });
//     }
//   }, []);
  return (
    <AppContext.Provider
      value={{
        ...state,
        setLoading,
        fetchUsers,
        createUser,
        deleteUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
