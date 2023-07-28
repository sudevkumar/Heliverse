import { useEffect, useState } from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import {
  getAllUserRequest,
  getAllUserSuccess,
  getAllUserError,
} from "./Components/Redux/action";
import { useDispatch } from "react-redux";
import axios from "axios";
import EditPage from "./Components/Edit Page/EditPage";
import { Routes, Route } from "react-router-dom";

function App() {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [page, setPage] = useState(1);
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const [fetchDataAgain, setFetchDataAgain] = useState(false);

  const fetAllUser = () => {
    return axios.get(
      `https://encouraging-blue-sunglasses.cyclic.app//user/get-paginated?page=${page}&size=20`
    );
  };

  const handleGetData = () => {
    dispatch(getAllUserRequest());
    fetAllUser()
      .then((res) => {
        // dispatch(getAllUserSuccess(res.data));
        setUsers(dispatch(getAllUserSuccess(res.data)));
      })
      .catch((err) => dispatch(getAllUserError()));
  };

  useEffect(() => {
    handleGetData();
    // eslint-disable-next-line
  }, [page, fetchDataAgain]);

  return (
    <div className="App">
      <Navbar
        users={users}
        setUsers={setUsers}
        searchUser={searchUser}
        setSearchUser={setSearchUser}
        setClick={setClick}
        click={click}
        setFetchDataAgain={setFetchDataAgain}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              users={users}
              setUsers={setUsers}
              setPage={setPage}
              page={page}
              searchUser={searchUser}
              setSearchUser={setSearchUser}
              setClick={setClick}
              click={click}
              handleGetData={handleGetData}
            />
          }
        />
        <Route
          path="/edit/:id"
          element={<EditPage handleGetData={handleGetData} />}
        />
      </Routes>
    </div>
  );
}

export default App;
