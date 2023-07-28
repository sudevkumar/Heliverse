import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import "./navbar.css";

function Navbar({
  setSearchUser,
  setClick,
  click,
  setFetchDataAgain,
  fetchDataAgain,
}) {
  const [searchValue, setSearchValue] = useState("");

  const handleOnchange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleGetDatas = async () => {
    setClick(true);
    const searchUsers = await axios.get(
      `http://localhost:5050/user/search?first_name=${searchValue}`
    );

    setSearchUser(searchUsers);
  };

  const fetctAgainData = () => {
    setClick(false);
    setSearchValue("");
    setFetchDataAgain(!fetchDataAgain);
  };

  return (
    <div className="Navbar">
      <div className="img">
        <img
          src="https://media.licdn.com/dms/image/C560BAQGuaOKqrv080A/company-logo_200_200/0/1668497687688?e=2147483647&v=beta&t=EdBkr2SYrhi2V9UOztBXJ6ihnIvYjey00Goh1oCe0oU"
          alt=""
        />
      </div>

      <div className="search">
        <input
          type="text"
          value={searchValue}
          onChange={handleOnchange}
          placeholder="Find User By It's First Name"
        />
        {click === false ? (
          <FiSearch
            size={20}
            onClick={handleGetDatas}
            cursor={"pointer"}
            className="searchCross"
          />
        ) : (
          <ImCross
            size={20}
            fontWeight={400}
            onClick={fetctAgainData}
            cursor={"pointer"}
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
