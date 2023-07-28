import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./editPage.css";

const EditPage = ({ handleGetData }) => {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [domain, setDomain] = useState("");
  const [available, setAvailable] = useState("");
  const [editUser, setEditUser] = useState([]);
  const location = useLocation();
  const params = location.pathname.split("/")[2];
  const navigate = useNavigate();

  const editUsers = async () => {
    const singleUser = await axios.get(
      `https://encouraging-blue-sunglasses.cyclic.app/user/get-single/${params}`
    );

    setEditUser(singleUser.data);
  };

  useEffect(() => {
    editUsers();
  }, []);

  const udpateUser = () => {
    const payload = {
      first_name: first_name || editUser?.first_name,
      last_name: last_name || editUser?.last_name,
      email: email || editUser?.email,
      gender: gender || editUser?.gender,
      domain: domain || editUser?.domain,
      available: available || editUser?.available,
    };

    axios.patch(
      `https://encouraging-blue-sunglasses.cyclic.app/user/update/${params}`,
      payload
    );

    navigate("/");
    alert("User updated");
    handleGetData();
  };

  return (
    <div className="EditPage">
      <h1>Edit Your Details</h1>
      <div className="input__fields">
        <input
          type="text"
          placeholder={`${editUser?.first_name}`}
          name=""
          id=""
          onChange={(e) => setFirstName(e.target.value)}
          value={first_name}
        />

        <input
          type="text"
          placeholder={`${editUser?.last_name}`}
          name=""
          id=""
          onChange={(e) => setLastName(e.target.value)}
          value={last_name}
        />

        <input
          type="text"
          placeholder={`${editUser?.email}`}
          name=""
          id=""
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

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

        <select name="" id="" onChange={(e) => setAvailable(e.target.value)}>
          <option>Select Availibility</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>

        <button onClick={udpateUser}>Update</button>
      </div>
    </div>
  );
};

export default EditPage;
