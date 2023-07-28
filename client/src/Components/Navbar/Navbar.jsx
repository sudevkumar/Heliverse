import axios from "axios";
import React, { useState } from "react";
import { BiArrowToRight, BiArrowToLeft } from "react-icons/bi";

import { useNavigate } from "react-router-dom";
import "./navbar.css";

function Navbar({
  setSearchUser,
  setClick,
  click,
  setFetchDataAgain,
  fetchDataAgain,
}) {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleOnchange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleGetDatas = async () => {
    setClick(true);
    const searchUsers = await axios.get(
      `https://encouraging-blue-sunglasses.cyclic.app/user/search?first_name=${searchValue}`
    );

    setSearchUser(searchUsers);
  };

  const fetctAgainData = () => {
    setClick(false);
    setSearchValue("");
    setFetchDataAgain(!fetchDataAgain);
  };

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="search">
        <input
          type="text"
          value={searchValue}
          onChange={handleOnchange}
          placeholder="Find User By It's First Name"
        />
        {click === false ? (
          <BiArrowToRight
            size={20}
            onClick={handleGetDatas}
            cursor={"pointer"}
            className="searchCross"
          />
        ) : (
          <BiArrowToLeft
            size={20}
            fontWeight={400}
            onClick={fetctAgainData}
            cursor={"pointer"}
          />
        )}
      </div>

      <div className="img" onClick={handleClick}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/TeamViewer_logo.svg/4507px-TeamViewer_logo.svg.png"
          alt=""
        />
      </div>
    </div>
  );
}

export default Navbar;
