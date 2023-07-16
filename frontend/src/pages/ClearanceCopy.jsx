import React, { useContext, useEffect, useState } from "react";
import { Store } from "../reducer/Store";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const ClearanceCopy = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate = useNavigate();

  const params = useParams();
  const { applicationID } = params;

  const [applicationData, setapplicationData] = useState(null);
  const [comment, setComment] = useState("");
  const [textComment, setTextComment] = useState("No comment");

  const [show, setShow] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const [checkedOption, setCheckedOption] = useState("");

  // const tableDataShow =( tablerowName, )=>{
  //     if(userInfo.role == tablerowName)
  //     {
  //       if(applicationData.approval.tablerowName.approval)

  //     }

  // }

  const openInNewTab = (url) => {
    //console.log(url)
    window.open(url, "_blank", "noreferrer");
  };
  const handleClose = () => {
    setShow(false);
    setCheckedOption("");
  };
  const handleShow = () => setShow(true);

  const handleCloseDetail = () => {
    setShowDetail(false);
    setTextComment("No comment");
  };
  const handleShowDetail = () => setShowDetail(true);

  const fetchApplicationData = async () => {
    const { data } = await axios.post(
      `/application/find/${applicationID}`,
      {
        role: userInfo ? userInfo.role : " ",
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log(data);
    setapplicationData(data);

    console.log(applicationData);
  };

  const approvedHandler = async () => {
    handleClose();
    const { data } = await axios.post(
      `/admin/approval/${applicationID}`,
      {
        role: userInfo ? userInfo.role : " ",
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    //console.log(data.approval.deparmentHead);

    handleClose();

    window.location.reload();
  };

  const rejectionSubmit = async () => {
    if (comment) {
      const { data } = await axios.post(
        `/admin/reject/${applicationID}`,
        {
          comment: comment,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(data);
      handleClose();

      window.location.reload();
    }
  };

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.profile) {
        window.alert("please update profile first");
        navigate("/dashboard/profile");
      } else {
        fetchApplicationData();
      }
    } else {
      window.alert("please log in first");
    }
  }, []);

  return (
    <>
      {applicationData && (
        <>
          <section className="my-3 ">
            <div>
              <div className="transcript-header">
                <div className="transcript-header-content">
                  <div className="logo"></div>
                  <div className="transcript-header-item ">
                    <h4 className="text-xxl font-bold text-green-600">
                      Shahjalal University of Science and Technolgy{" "}
                    </h4>
                  </div>
                  <div className="transcript-header-item ">
                    <h4 className="text-xxl font-bold text-green-600">
                      Sylhet{" "}
                    </h4>
                  </div>
                  <div className="transcript-header-item my-10">
                    <h6> Application For Clearance </h6>
                    <hr className="h-line" />
                  </div>
                </div>
              </div>
              <div>
                <div className="mt-10 mx-10">
                  <div className="form-group row">
                    <label
                      for="staticEmail"
                      className="pt-3 col-sm-2 col-form-label "
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      1. Name :
                    </label>
                    <div className="col-sm-9">
                      <input
                        readOnly
                        type="text"
                        className="border-btm"
                        name="name"
                        value={applicationData.name}
                        placeholder="student's name "
                      />
                    </div>
                  </div>

                  <div className="mt-2 row">
                    <div className=" col-6 form-group row">
                      <label
                        for="staticEmail"
                        className="pt-3 col-sm-4 col-form-label "
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        2. Registration :
                      </label>
                      <div className="col-sm-6">
                        <input
                          readOnly
                          type="text"
                          className=" ml-2 border-btm"
                          name="regNo"
                          value={applicationData.regNo}
                          placeholder="student's name "
                        />
                      </div>
                    </div>
                    <div className=" col-6 form-group row">
                      <label
                        for="staticEmail"
                        className="pt-3 col-sm-4 col-form-label "
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        3. Department :
                      </label>
                      <div className="col-sm-6">
                        <select
                          name="dept"
                          readOnly
                          value={applicationData.dept}
                          className=" ml-2 border-btm"
                        >
                          <option disabled selected>
                            your Department
                          </option>
                          <option value="cse">CSE</option>
                          <option value="eee">EEE</option>
                          <option value="swe">SWE</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 row">
                    <div className=" col-6 form-group row">
                      <label
                        for="staticEmail"
                        className="pt-3 col-sm-4 col-form-label "
                        style={{ fontWeight: "bold", color: "black" }}
                      >
                        4. Degree :
                      </label>
                      <div className="col-sm-8">
                        <select
                          name="degree"
                          disabled
                          value={applicationData.degree}
                          className=" ml-2 border-btm"
                        >
                          <option disabled selected>
                            Which degree did you get?
                          </option>
                          <option>BSc</option>
                          <option>MBBS</option>
                          <option>BA</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="table-div ">
                <div className="table-headline">
                  <>The details of the debt owed are given below :</>
                </div>
                <div className="">
                  <table className="table-form">
                    <tr>
                      <th className="table-th-form" style={{ width: "5%" }}>
                        #
                      </th>
                      <th className="table-th-form" style={{ width: "30%" }}>
                        Office
                      </th>
                      <th className="table-th-form" style={{ width: "15%" }}>
                        not owed
                      </th>
                      <th className="table-th-form" style={{ width: "30%" }}>
                        Details if owed
                      </th>
                      <th className="table-th-form" style={{ width: "20%" }}>
                        Signature
                      </th>
                    </tr>
                    <tr>
                      <td className="table-td-form">01</td>
                      <td className="table-td-form">Librarian</td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "librarian" ? (
                          applicationData.approval.librarian.approval ||
                          applicationData.approval.librarian.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.librarian.comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.librarian.signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.librarian.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.librarian.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.librarian.comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.librarian.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.librarian.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                            <img
                              src={applicationData.approval.librarian.signature}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-td-form">02</td>
                      <td className="table-td-form">Proctor</td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "proctor" ? (
                          applicationData.approval.proctor.approval ||
                          applicationData.approval.proctor.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.proctor.comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.proctor.signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.proctor.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.proctor.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.proctor.comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.proctor.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.proctor.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                            <img
                              src={applicationData.approval.proctor.signature}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-td-form">03</td>
                      <td className="table-td-form">
                        Director of Student's advisor committee
                      </td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "studentAdvisor" ? (
                          applicationData.approval.studentAdvisor.approval ||
                          applicationData.approval.studentAdvisor.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.studentAdvisor
                              .comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.studentAdvisor
                            .signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.studentAdvisor.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.studentAdvisor.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.studentAdvisor
                                    .comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.studentAdvisor.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.studentAdvisor.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                            <img
                              src={
                                applicationData.approval.studentAdvisor
                                  .signature
                              }
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-td-form">04</td>
                      <td className="table-td-form">Register</td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "register" ? (
                          applicationData.approval.register.approval ||
                          applicationData.approval.register.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.register.comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.register.signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.register.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.register.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.register.comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.register.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.register.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                            <img
                              src={applicationData.approval.register.signature}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-td-form">05</td>
                      <td className="table-td-form">Medical officer</td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "medicalOfficer" ? (
                          applicationData.approval.medicalOfficer.approval ||
                          applicationData.approval.medicalOfficer.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.medicalOfficer
                              .comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.medicalOfficer
                            .signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.medicalOfficer.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.medicalOfficer.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.medicalOfficer
                                    .comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.medicalOfficer.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.medicalOfficer.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                            <img
                              src={applicationData.approval.medicalOfficer.signature}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-td-form">06</td>
                      <td className="table-td-form">
                        Provost(for residencial student)
                      </td>
                      <td className="table-td-form m-auto ">
                        {userInfo.role == "provost" ? (
                          applicationData.approval.provost.approval ||
                          applicationData.approval.provost.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.provost.comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.provost.signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.provost.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.provost.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.provost.comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form">
                        {applicationData.approval.provost.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.provost.signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                                <img 
                             src={applicationData.approval.provost.signature}
                             
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <div className="table-div ">
                <div className="">
                  <table className="table-form">
                    <tr>
                      {/* <td
                        className="table-td-form"
                        style={{ width: "35%", borderBottom: "underline" }}
                      >
                        Department head
                      </td>
                      <td
                        className="table-td-form"
                        style={{ width: "15%" }}
                      ></td>
                      <td
                        className="table-td-form"
                        style={{ width: "30%" }}
                      ></td>
                      <td
                        className="table-td-form"
                        style={{ width: "20%" }}
                      ></td> */}
                      <td
                        className="table-td-form"
                        style={{ width: "35%", borderBottom: "underline" }}
                      >
                        Department head
                      </td>
                      <td
                        className="table-td-form m-auto "
                        style={{ width: "15%" }}
                      >
                        {userInfo.role == "departmentHead" ? (
                          applicationData.approval.departmentHead.approval ||
                          applicationData.approval.departmentHead.signature ? (
                            <>
                              <p
                                style={{
                                  color: "green",
                                  textDecoration: "underline",
                                }}
                              >
                                Yes
                              </p>
                            </>
                          ) : applicationData.approval.departmentHead
                              .comment ? (
                            <>
                              <p
                                style={{
                                  color: "red",
                                  textDecoration: "underline",
                                }}
                              >
                                No
                              </p>
                            </>
                          ) : (
                            <>
                              <p
                                onClick={handleShow}
                                style={{
                                  color: "blue",
                                  textDecoration: "underline",
                                }}
                              >
                                Edit{" "}
                              </p>
                            </>
                          )
                        ) : applicationData.approval.departmentHead
                            .signature ? (
                          <>
                            <p
                              style={{
                                color: "green",
                                textDecoration: "underline",
                              }}
                            >
                              Yes
                            </p>
                          </>
                        ) : applicationData.approval.departmentHead.comment ? (
                          <>
                            <p
                              style={{
                                color: "red",
                                textDecoration: "underline",
                              }}
                            >
                              No
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form" style={{ width: "30%" }}>
                        {applicationData.approval.departmentHead.comment ? (
                          <>
                            <p
                              onClick={(e) => {
                                setTextComment(
                                  applicationData.approval.departmentHead
                                    .comment
                                );
                                handleShowDetail();
                              }}
                              className="text-blue-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              view details
                            </p>
                          </>
                        ) : (
                          <></>
                        )}
                      </td>
                      <td className="table-td-form" style={{ width: "20%" }}>
                        {applicationData.approval.departmentHead.signature ? (
                          <>
                            {/* <p
                              onClick={() =>
                                openInNewTab(
                                  applicationData.approval.departmentHead
                                    .signature
                                )
                              }
                              className="text-green-600 hover:text-green-900"
                              style={{ textDecoration: "underline" }}
                            >
                              Signature Added
                            </p> */}
                                <img 
                             src={applicationData.approval.departmentHead.signature}
                             
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </section>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: "blue", fontWeight: "bold" }}>
                Owned description
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="ddd">
                  <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                    Any Owned
                  </Form.Label>
                  <Form.Check
                    type="checkbox"
                    name="yes"
                    label={"yes"}
                    value="yes"
                    checked={checkedOption == "yes"}
                    onClick={(e) => setCheckedOption(e.target.value)}
                  />
                  <Form.Check
                    type="checkbox"
                    name="no"
                    label={"no"}
                    value="no"
                    checked={checkedOption == "no"}
                    onClick={(e) => setCheckedOption(e.target.value)}
                  />
                </Form.Group>
                {checkedOption == "yes" && (
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label style={{ color: "black", fontWeight: "bold" }}>
                      Details
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </Form.Group>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{ color: "green" }}
              >
                Close
              </Button>
              {checkedOption == "yes" ? (
                <Button
                  onClick={rejectionSubmit}
                  variant="primary"
                  style={{
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={approvedHandler}
                  variant="primary"
                  style={{
                    background: "red",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  approved
                </Button>
              )}
            </Modal.Footer>
          </Modal>

          <Modal show={showDetail} onHide={handleCloseDetail}>
            <Modal.Header closeButton>
              <Modal.Title>Owned Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>{textComment}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseDetail}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}{" "}
    </>
  );
};

export default ClearanceCopy;
