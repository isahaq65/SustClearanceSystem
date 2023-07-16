import axios from "axios";

import React, { cloneElement, useContext, useEffect } from "react";
import { useState } from "react";
import { AiOutlineNotification } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Store } from "../reducer/Store";

const DashboardHome = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
  const [announcement, setannouncement] = useState([]);

  const fetchNotice = async () => {
    const { data } = await axios.get(
      "/notice/view/annoucement",

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log(data);

    
    // setannouncement([data[0]]);
    setannouncement(data)
  };

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.profile) {
        window.alert("please update profile first");
        navigate("/dashboard/profile");
      } else {
        fetchNotice();
      }
    } else {
      window.alert("please log in first");
    }
  }, [userInfo]);

  return (
    <>
      <section className="mt-2">
        <div className="notice-header d-flex">
          <AiOutlineNotification className="text-5xl mx-2  text-green-600" />
          <h3 className="text-blue-600 mt-2"> General Announcement</h3>
        </div>
        <hr className="mt-0 mb-2" />

        {announcement.length ? (
          <>
            {announcement.map((amnt) => (
              <>
                <div className="-mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
                  <div className="inline-block min-w-full shadow overflow-hidden">
                    <div className="pl-5 pt-4">
                      <div className="row ">
                        <div className="col-3">
                          <div className="date-month ">
                            <div className="date">
                              <p>{amnt.issueDate}</p>
                            </div>
                            <div className="month">
                              <p>23</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-9">
                          <div>
                            <div className="">
                              <h4>{amnt.issueBy}</h4>
                            </div>
                            <div className="">
                              <p>{amnt.issuerRole}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-3"></div>
                        <div className="col-9">
                          <p className="notice-text">{amnt.noticeBody}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </>
        ) : (
          <div className="-mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
            <div className="inline-block min-w-full shadow overflow-hidden">
              <div className="pl-5 pt-4">
                <div className="row ">
                  <div className="col-3">
                    <div className="date-month ">
                      <div className="date">
                        <p>23</p>
                      </div>
                      <div className="month">
                        <p>January 23</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    <div>
                      <div className="">
                        <h4>Name</h4>
                      </div>
                      <div className="">
                        <p>head of computer science and engineering</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-9">
                    <p className="notice-text">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      non, voluptates ullam deleniti a esse facilis iusto eos
                      consequatur alias quasi ex harum. Dolor sint veritatis
                      velit quidem rem ex suscipit accusantium delectus eius
                      quas, culpa deleniti assumenda, unde labore optio
                      explicabo dolorem eaque earum sit praesentium. Natus
                      fugiat quis omnis! Eius
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <hr className="mt-0 mb-2" />
      </section>
      <section className="my-1">
        <div>
          <div className="notice-header d-flex">
            <BsBookmarks className="text-5xl mx-2  text-green-600" />
            <h3 className="text-blue-600 mt-2">
              Procedures to get Transcript/Equivalent Certificate
            </h3>
          </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
            <div className="mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <div className="pt-2 px-4">
                  <p className="procedure-header">
                    There are several steps as follows :
                  </p>
                </div>
                <div className="px-5">
                  <ol type="i">
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Alias non rem, nesciunt aspernatur ullam et mollitia
                      nulla! Accusantium, hic dolorem.
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-0 mb-2" />
        <div>
          <div className="notice-header d-flex">
            <BsBookmarks className="text-5xl mx-2  text-green-600" />
            <h3 className="text-blue-600 mt-2">
              Procedures to get Gradesheet{" "}
            </h3>
          </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
            <div className="mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <div className="pt-2 px-4">
                  <p className="procedure-header">
                    There are several steps as follows :
                  </p>
                </div>
                <div className="px-5">
                  <ol>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Alias non rem, nesciunt aspernatur ullam et mollitia
                      nulla! Accusantium, hic dolorem.
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-0 mb-2" />
        <div>
          <div className="notice-header d-flex">
            <BsBookmarks className="text-5xl mx-2  text-green-600" />
            <h3 className="text-blue-600 mt-2">
              Procedures to get Original/Temporary Certificate
            </h3>
          </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
            <div className="mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <div className="pt-2 px-4">
                  <p className="procedure-header">
                    There are several steps as follows :
                  </p>
                </div>
                <div className="px-5">
                  <ol type="i">
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Alias non rem, nesciunt aspernatur ullam et mollitia
                      nulla! Accusantium, hic dolorem.
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-0 mb-2" />
        <div>
          <div className="notice-header d-flex">
            <BsBookmarks className="text-5xl mx-2  text-green-600" />
            <h3 className="text-blue-600 mt-2">Procedures to get Clearance </h3>
          </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
            <div className="mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <div className="pt-2 px-4">
                  <p className="procedure-header">
                    There are several steps as follows :
                  </p>
                </div>
                <div className="px-5">
                  <ol type="i">
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Alias non rem, nesciunt aspernatur ullam et mollitia
                      nulla! Accusantium, hic dolorem.
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                    <li className="procedure-text">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Ex, esse?
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DashboardHome;
