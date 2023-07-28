import "./home.css";
import { useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({
  page,
  setPage,
  users,
  searchUser,
  click,
  handleGetData,
  setSearchUser,
}) => {
  const naviaget = useNavigate();
  const [availibility, setAvailibility] = useState("");
  const [domain, setDomain] = useState("");
  const [gender, setGender] = useState("");
  const [filter, setFilter] = useState(false);

  // console.log("filter", filter);

  const handlePrevNext = (pn, i) => {
    if (pn === "prev" && page === 1) return;
    if (pn === "next" && page === 50) return;
    setPage((prev) => prev + i);
  };

  const onSubmit = (id) => {
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to delete this ?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const res = await axios.delete(
                `http://localhost:5050/user/delete/${id}`
              );
              handleGetData();
              console.log(res);
            } catch (error) {
              console.error(error);
            }
          },
        },
        {
          label: "No",
          // onClick: () => alert("Click No")
        },
      ],
    });
  };

  const handleEdit = (id) => {
    naviaget(`/edit/${id}`);
  };
  const obj = {};
  const fetApi = async () => {
    const filterData = await axios.get(
      `http://localhost:5050/user/filter?page=${page}&size=20&domain=${domain}&gender=${gender}&available=${availibility}`
    );

    console.log(filterData);

    setSearchUser(filterData);
  };

  const handleFilter = () => {
    setFilter(true);
    fetApi();
  };

  useEffect(() => {
    handleFilter();
    setFilter(false);
  }, [page]);

  const handleFiltersReset = () => {
    setFilter(false);
  };

  return (
    <>
      <div className="filter">
        <select name="" id="" onChange={(e) => setAvailibility(e.target.value)}>
          <option>Select Availibility</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <select name="" id="" onChange={(e) => setDomain(e.target.value)}>
          <option>Select Domain</option>
          <option value="Sales">Sales</option>
          <option value="Management">Management</option>
          <option value="UI Designing">UI Designing</option>
          <option value="IT">IT</option>
        </select>

        <select name="" id="" onChange={(e) => setGender(e.target.value)}>
          <option>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <button onClick={handleFilter}>Filter</button>
      </div>
      {click || filter ? (
        <div className="Home">
          {searchUser.data?.map((user, id) => (
            <div className="user_div" key={user._id}>
              <div className="img">
                <img src={user.avatar} alt="" />
              </div>
              <div className="text">
                <h4>
                  Name : {user.first_name} {user.last_name}
                </h4>
                <h4>Email : {user.email}</h4>
                <h4>Gender : {user.gender}</h4>
                <h4>Domain : {user.domain}</h4>
                <h4>Available : {user.available === false ? "No" : "Yes"}</h4>
                <div className="btn_del_edit">
                  <button onClick={() => handleEdit(user._id)}>Edit</button>

                  <button onClick={() => onSubmit(user._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="Home">
          {users.payload?.map((user, id) => (
            <div className="user_div" key={user._id}>
              <div className="img">
                <img src={user.avatar} alt="" />
              </div>
              <div className="text">
                <h4>
                  Name : {user.first_name} {user.last_name}
                </h4>
                <h4>Email : {user.email}</h4>
                <h4>Gender : {user.gender}</h4>
                <h4>Domain : {user.domain}</h4>
                <h4>Available : {user.available === false ? "No" : "Yes"}</h4>
                <div className="btn_del_edit">
                  <button onClick={() => handleEdit(user._id)}>Edit</button>
                  <button onClick={() => onSubmit(user._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="btns">
        <button onClick={() => handlePrevNext("prev", -1)}>Prev</button>
        <button onClick={() => handlePrevNext("next", 1)}>Next</button>
      </div>
      ;
    </>
  );
};

export default Home;
