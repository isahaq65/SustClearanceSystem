import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaWpforms, FaUsers } from "react-icons/fa";
import { MdFastfood } from "react-icons/md";
import { TiUserAdd } from "react-icons/ti";
import { CgLogOff } from "react-icons/cg";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiFoodChain } from "react-icons/gi";
import { Store } from "../reducer/Store";
import axios from "axios";

const AdminSideBar = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const token = localStorage.getItem("token");
  console.log(token);

  const navigate = useNavigate();

  const logout = async () => {
    try {
      const { data } = await axios.post("/user/signout", {
        token: "",
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("role");
      ctxDispatch({ type: "USER_SIGNOUT" });
    
      navigate("/signin");
    } catch (err) {
      window.location.reload();
      navigate("/signin");
    }
  };

  return (
    <>
      <aside className="bg-white dark:bg-gray-800">
        <Link
          to="/dashboard"
          className=" mt-4 flex items-center justify-center "
        >
          <AiOutlineDashboard className="text-xl mr-2 text-green-600" />
          <h4 className="text-center py-2 text-xl text-green-600 font-semibold">
            Dashboard
          </h4>
        </Link>
        <nav className="mt-1 px-6">
          <Link
            to="admin/application-list    "
            className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start"
          >
            <span className="text-left text-green-600">
              <MdFastfood />
            </span>
            <span className="mx-4 text-sm font-normal">
              All application List
            </span>
          </Link>
          <Link
            className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start"
            to="admin/create-notice"
          >
            <span className="text-left text-green-600">
              <GiFoodChain />
            </span>
            <span className="mx-4 text-sm font-normal">Create Post</span>
          </Link>
          {/* <Link
          className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start"
          to="certificate-form"
        >
          <span className="text-left text-green-600">
            <TiUserAdd />
          </span>
          <span className="mx-4 text-sm font-normal">
            Apply For Certificate
          </span>
        </Link>
        <Link
          className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start"
          to="clearance-form"
        >
          <span className="text-left text-green-600">
            <TiUserAdd />
          </span>
          <span className="mx-4 text-sm font-normal">Apply For Clearance</span>
        </Link> */}
          {/* <Link
          className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400 hover:bg-green-200 flex items-center p-2 my-4 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200 justify-start"
          to="studentlist"
        >
          <span className="text-left text-green-600">
            <FaUsers />
          </span>
          <span className="mx-4 text-sm font-normal">Student List</span>
        </Link> */}
        </nav>
        <button
          onClick={logout}
          className="hover:text-green-600 font-thin text-gray-500 dark:text-gray-400  flex items-center p-2 my-4 transition-colors dark:hover:text-white duration-200 justify-start  ml-6"
        >
          <span className="text-left text-green-600">
            <CgLogOff />
          </span>
          <span className="mx-4 text-sm font-normal">Log out</span>
        </button>
      </aside>
    </>
  );
};

export default AdminSideBar;
