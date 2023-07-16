import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineNotification } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { Store } from '../reducer/Store';

const Notice = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);
 

  const fetchNotice = async () => {
    const { data } = await axios.get(
      "/notice/view",

      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log(data);
    setNotices(data)

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
          <h3 className="text-blue-600 mt-2">All Notice</h3>
        </div>
        <hr className="mt-0 mb-2" />
         {notices.length ? 
        <>
        {
          notices.map((notice) =>{
           return <>
            <div className="-mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
            <div className="inline-block min-w-full shadow overflow-hidden">
              <div className="pl-5 pt-4">
                <div className="row ">
                  <div className="col-3">
                    <div className="date-month ">
                      <div className="date">
                        <p>{notice.issueDate}</p>
                      </div>
                      <div className="month">
                        <p> Date</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-9">
                    <div>
                      <div className="">
                        <h4>{notice.issuedBy}</h4>
                      </div>
                      <div className="">
                        <p>{notice.issuerRole}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-3"></div>
                  <div className="col-9">
                    <p className="notice-text">
                     {notice.noticeBody}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </>
          })
        }
        </>
         
      : (
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

        <hr className="mt-3 mb-2" />

        </section>
    
    </>
  )
}

export default Notice