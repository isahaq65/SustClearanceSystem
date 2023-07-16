import axios from "axios";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Store } from "../reducer/Store";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const TranscriptCopy = () => {


  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;

  const params = useParams();
  const { applicationID } = params;

  const [applicationData, setapplicationData] = useState(null);
  const [show, setShow] = useState(false);
  const [comment, setComment] = useState("");
  const [approvedshow, setapprovedShow] = useState(false);
  const [issueDate, setIssueDate] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const approvedhandleClose = () => setapprovedShow(false);
  const approvedhandleShow = () => setapprovedShow(true);

  
  const openInNewTab = (images, name) => {
    for (const imageArray of images) {
      console.log(imageArray.image);
      if (imageArray.image.imageDefinition == name) {
        const url = imageArray.image.url;
        console.log(url);
        window.open(url, "_blank", "noreferrer");
      }
    }
  };

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
    const { data } = await axios.post(
      `/admin/approval/${applicationID}`,
      {
        role: userInfo ? userInfo.role : " ",
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );
    console.log(data.approval.deparmentHead);

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

  const issueDateSubmit = async()=>{
    if (issueDate) {

      const { data } = await axios.post(
        `/admin/approval/${applicationID}`,
        {
          issueDate: issueDate,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );
      console.log(data);
      approvedhandleClose();
      

      window.location.reload();
    } 
    



  }

  

  useEffect(() => {
    if(userInfo)
    fetchApplicationData();
    else{
      window.alert("dddd")
    }
  }, []);

  return (
    <>
      {applicationData && (
        <section className="my-3 container">
          <div className="transcript-header">
            <div className="transcript-header-content">
              <div className="logo"></div>
              <div className="transcript-header-item ">
                <h4 className="text-xxl font-bold text-green-600">
                  Shahjalal University of Science and Technolgy{" "}
                </h4>
              </div>
              <div className="transcript-header-item ">
                <h4 className="text-xxl font-bold text-green-600">Sylhet </h4>
              </div>
              <div className="transcript-header-item my-10">
                <h6>Application for {applicationData.applicationType}</h6>
                <hr className="h-line" />
              </div>
            </div>
          </div>
          <div>
            <div className="form-group row">
              <label
                for="staticEmail"
                className="pt-3 col-sm-3 col-form-label "
                style={{ fontWeight: "bold", color: "black" }}
              >
                1. Name :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readonly
                  className="border-btm"
                  id="staticEmail"
                  value={applicationData.name}
                />
              </div>
            </div>

            {/* <div className=" form-group row">
              <div className="col-6">
                <div className="form-group row">
                  <label
                    for="staticEmail"
                    style={{ fontWeight: "bold", color: "black" }}
                    className="pt-3 col-sm-3 col-form-label pt-2"
                  >
                    5. Registration :
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      readonly
                      className="border-btm"
                      id="staticEmail"
                      value={applicationData.regNo}
                    />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="form-group row">
                  <label
                    for="staticEmail"
                    style={{ fontWeight: "bold", color: "black" }}
                    className="pt-3 col-sm-3 col-form-label pt-2"
                  >
                    5. Registration :
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      readonly
                      className="border-btm"
                      id="staticEmail"
                      value={applicationData.regNo}
                    />
                  </div>
                </div>
              </div>
            </div> */}

            <div className="form-group row">
              <label
                for="staticEmail"
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label pt-2"
              >
                3. Registration :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readonly
                  className="border-btm"
                  id="staticEmail"
                  value={applicationData.regNo}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="staticEmail"
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label pt-2"
              >
                4. session :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readonly
                  className="border-btm"
                  id="staticEmail"
                  value={applicationData.session}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                6. Discipline :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.discipline}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="staticEmail"
                className="pt-3 col-sm-3 col-form-label pt-2"
                style={{ fontWeight: "bold", color: "black" }}
              >
                7. School :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readonly
                  className="border-btm"
                  id="staticEmail"
                  value={applicationData.school}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="inputPassword"
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                8. Exam name:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.nameExam}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                for="inputPassword"
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                9. Exam Year:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.nameExamYear}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                readOnly
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                11. Recipient Address :
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.recipientAddress}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                readOnly
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                12. permanentAddress:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.permanentAddress}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                readOnly
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                13. Current Address:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.currentAddress}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                readOnly
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                15. Mobile:
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  readOnly
                  className="border-btm"
                  id="inputPassword"
                  value={applicationData.mobile}
                />
              </div>
            </div>

            <div className="form-group row">
              <label
                for="inputPassword"
                readOnly
                style={{ fontWeight: "bold", color: "black" }}
                className="pt-3 col-sm-3 col-form-label"
              >
                16. Bank recipt:
              </label>
              <div className="col-sm-9">
                <div className="row">
                  <div className="col-6">
                    <input
                      type="text"
                      readOnly
                      className="border-btm"
                      id="inputPassword"
                      value={applicationData.mobile}
                    />
                  </div>
                  <div className="col-6">
                    <button
                      type="button"
                      role="link"
                      onClick={() => openInNewTab(applicationData.images, "bankRecipt")}
                      className="my-2 mx-2 py-2 px-4 text-green-600 border-green hover:bg-gray-100 focus:ring-green-500 focus:ring-offset-green-200  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                    >
                      view
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {applicationData.applicationType == "equivalent-certificate" ? (
              <div className="form-group row">
                <label
                  for="inputPassword"
                  readOnly
                  style={{ fontWeight: "bold", color: "black" }}
                  className="pt-3 col-sm-3 col-form-label"
                >
                  17. Certificate:
                </label>
                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly
                        className="border-btm"
                        id="inputPassword"
                        value={applicationData.mobile}
                      />
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        role="link"
                        onClick={() => openInNewTab(applicationData.images, "certificate")}
                        className="my-2 mx-2 py-2 px-4 text-green-600 border-green hover:bg-gray-100 focus:ring-green-500 focus:ring-offset-green-200  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="form-group row">
                <label
                  for="inputPassword"
                  readOnly
                  style={{ fontWeight: "bold", color: "black" }}
                  className="pt-3 col-sm-3 col-form-label"
                >
                  17. Gradesheet/certificate:
                </label>
                <div className="col-sm-9">
                  <div className="row">
                    <div className="col-6">
                      <input
                        type="text"
                        readOnly
                        className="border-btm"
                        id="inputPassword"
                        value={applicationData.mobile}
                      />
                    </div>
                    <div className="col-6">
                      <button
                        type="button"
                        role="link"
                        onClick={() => openInNewTab(applicationData.images)}
                        className="my-2 mx-2 py-2 px-4 text-green-600 border-green hover:bg-gray-100 focus:ring-green-500 focus:ring-offset-green-200  transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                      >
                        view
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="container mt-5">
            <div className="row">
              <div className="col-6">
                {userInfo.role === "department head" && (
                  <>
                    <div
                      className="recommend"
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      <div> Recommendation of department head</div>
                      <div className="mt-3">
                        <div className="d-flex justify-content-center">
                          {applicationData.approval.departmentHead.approval ? (
                            <img
                              style={{ height: "70px", width: "250px" }}
                              src={
                                applicationData.approval.departmentHead.signature
                                  ? applicationData.approval.departmentHead
                                      .signature
                                  : "Not yet"
                              }
                              alt=""
                              //275 × 183
                            />
                          ) : (
                            "Not yet"
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            height: "max-content",
                            textAlign: "center",
                            borderBottom: "3px dotted #059669",
                            margin: "auto",
                          }}
                        >
                          <p
                            style={{
                              margin: "auto",
                              color: "gray",
                            }}
                          >
                            Signature
                          </p>
                        </div>
                      </div>
                      <div>
                        {applicationData.approval.departmentHead.approval && (
                          <p
                            style={{
                              margin: "auto",
                              color: "green",
                            }}
                          >
                            Approved from dept. head
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {userInfo.role != "department head" && (
                  <>
                    <div
                      className="recommend"
                      style={{ fontWeight: "bold", color: "black" }}
                    >
                      <div> Recommendation of department head</div>
                      <div className="mt-3">
                        <div className="d-flex justify-content-center">
                          {applicationData.approval.departmentHead.approval ? (
                            <img
                              style={{ height: "70px", width: "250px" }}
                              src={
                                applicationData.approval.departmentHead
                                  .signature
                                  ? applicationData.approval.departmentHead
                                      .signature
                                  : "Not yet"
                              }
                              alt=""
                              //275 × 183
                            />
                          ) : (
                            "Not yet"
                          )}
                        </div>
                      </div>
                      <div
                        style={{
                          textAlign: "center",
                          display: "flex",
                          marginTop: "5px",
                        }}
                      >
                        <div
                          style={{
                            width: "50%",
                            height: "max-content",
                            textAlign: "center",
                            borderBottom: "3px dotted #059669",
                            margin: "auto",
                          }}
                        >
                          <p
                            style={{
                              margin: "auto",
                              color: "gray",
                            }}
                          >
                            Signature
                          </p>
                        </div>
                      </div>
                      <div>
                        {applicationData.approval.departmentHead.approval && (
                          <p
                            style={{
                              margin: "auto",
                              color: "green",
                            }}
                          >
                            Approved from dept. head
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="col-6">
                <div
                  className="recommend"
                  style={{ fontWeight: "bold", color: "black" }}
                >
                  <div> Applicant Signature</div>
                  <div className="mt-3">
                    <div className="d-flex justify-content-center">
                      <img
                        style={{ height: "70px", width: "250px" }}
                        src={
                          applicationData.signatureImageUrl
                            ? applicationData.signatureImageUrl
                            : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Signature_of_Ann_Miller.svg/2560px-Signature_of_Ann_Miller.svg.png"
                        }
                        alt=""
                        //275 × 183
                      />
                    </div>
                  </div>
                  <div
                    style={{
                      textAlign: "center",
                      display: "flex",
                      marginTop: "5px",
                    }}
                  >
                    <div
                      style={{
                        width: "50%",
                        height: "max-content",
                        textAlign: "center",
                        borderBottom: "3px dotted #059669",
                        margin: "auto",
                      }}
                    >
                      <p
                        style={{
                          margin: "auto",
                          color: "gray",
                        }}
                      >
                        Signature
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {userInfo.role === "department head" && (
            <>
              {applicationData.rejectionStatus ? (
                <div style={{ marginTop: "50px", border: "1px solid black" }}>
                  <div
                    className="row"
                    style={{ margin: "auto", width: "100%" }}
                  >
                    <div className="transcript-header-content">
                      <div className="row ">
                        <div className="col m-auto">
                          <p
                            className=""
                            style={{
                              margin: "auto",
                              textAlign: "center",
                              color: "red",
                              fontWeight: "bold",
                            }}
                          >
                            Your Application is Rejected
                          </p>
                        </div>
                        <div className="col">
                          <p
                            className=""
                            style={{
                              margin: "auto",
                            }}
                          >
                            {applicationData.approval.departmentHead
                              .comment && (
                              <>
                                <p
                                  className=""
                                  style={{
                                    margin: "auto",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  commment From Head:
                                </p>
                                {
                                  applicationData.approval.departmentHead
                                    .comment
                                }
                                <br />
                              </>
                            )}
                            {applicationData.approval.controller.comment && (
                              <>
                                <p
                                  className="text-3xl"
                                  style={{
                                    margin: "auto",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  commment From controller:
                                </p>
                                <br />
                                <p style={{ color: "black" }}>
                                  {applicationData.approval.controller.comment}
                                </p>
                                <br />
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : applicationData.approval.departmentHead.approval ? (
                <div className="mt-10">
                  <div
                    className="row "
                    style={{ margin: "auto", width: "100%" }}
                  >
                    <div className="transcript-header-content">
                      <div className="row ">
                        <p
                          className="text-2xl"
                          style={{
                            margin: "auto",
                            color: "Green",

                            padding: "10px",
                          }}
                        >
                          Approved by Head
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row " style={{ margin: "auto", width: "100%" }}>
                  <div className="transcript-header-content">
                    <div className="row ">
                      <div className="col">
                        <button
                          onClick={approvedHandler}
                          type="button"
                          className="my-20 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                          Approved
                        </button>
                      </div>
                      <div className="col">
                        <button
                          onClick={handleShow}
                          type="button"
                          className="my-20 mx-2 py-2 px-4  bg-red-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
          {userInfo.role === "student" && (
            <>
              {applicationData.completeStatus ? (
                <>
                  <div style={{ marginTop: "50px", border: "1px solid black" }}>
                    <div
                      className="row"
                      style={{ margin: "auto", width: "100%" }}
                    >
                      <div className="transcript-header-content">
                        <div className="row ">
                          <div className="col m-auto">
                            <p
                              className=""
                              style={{
                                margin: "auto",
                                textAlign: "center",
                                color: "blue",
                                fontWeight: "bold",
                              }}
                            >
                              Your Application is approved by controller
                            </p>
                          </div>
                          <div className="col">
                            <p
                              className=""
                              style={{
                                margin: "auto",
                              }}
                            >
                              {applicationData.issueDate && (
                                <>
                                  <p
                                    className=""
                                    style={{
                                      margin: "auto",
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Issue Date:
                                  </p>
                                  {applicationData.issueDate}
                                  <br />
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {applicationData.rejectionStatus ? (
                    <div
                      style={{ marginTop: "50px", border: "1px solid black" }}
                    >
                      <div
                        className="row"
                        style={{ margin: "auto", width: "100%" }}
                      >
                        <div className="transcript-header-content">
                          <div className="row ">
                            <div className="col m-auto">
                              <p
                                className=""
                                style={{
                                  margin: "auto",
                                  textAlign: "center",
                                  color: "red",
                                  fontWeight: "bold",
                                }}
                              >
                                Your Application is Rejected
                              </p>
                            </div>
                            <div className="col">
                              <p
                                className=""
                                style={{
                                  margin: "auto",
                                }}
                              >
                                {applicationData.approval.departmentHead
                                  .comment && (
                                  <>
                                    <p
                                      className=""
                                      style={{
                                        margin: "auto",
                                        color: "black",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      commment From Head:
                                    </p>
                                    {
                                      applicationData.approval.departmentHead
                                        .comment
                                    }
                                    <br />
                                  </>
                                )}
                                {applicationData.approval.controller
                                  .comment && (
                                  <>
                                    <p
                                      className="text-3xl"
                                      style={{
                                        margin: "auto",
                                        color: "black",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      commment From controller:
                                    </p>
                                    <br />
                                    <p style={{ color: "black" }}>
                                      {
                                        applicationData.approval.controller
                                          .comment
                                      }
                                    </p>
                                    <br />
                                  </>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : applicationData.approval.departmentHead.approval ? (
                    <div className="mt-10">
                      <div
                        className="row "
                        style={{ margin: "auto", width: "100%" }}
                      >
                        <div className="transcript-header-content">
                          <div className="row ">
                            <p
                              className="text-2xl"
                              style={{
                                margin: "auto",
                                color: "Green",

                                padding: "10px",
                              }}
                            >
                              Approved by Head
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </>
              )}
            </>
          )}
          {userInfo.role === "controller" && (
            <>
              {applicationData.rejectionStatus ? (
                <div style={{ marginTop: "50px", border: "1px solid black" }}>
                  <div
                    className="row"
                    style={{ margin: "auto", width: "100%" }}
                  >
                    <div className="transcript-header-content">
                      <div className="row ">
                        <div className="col m-auto">
                          <p
                            className=""
                            style={{
                              margin: "auto",
                              textAlign: "center",
                              color: "red",
                              fontWeight: "bold",
                            }}
                          >
                            Application is Rejected
                          </p>
                        </div>
                        <div className="col">
                          <p
                            className=""
                            style={{
                              margin: "auto",
                            }}
                          >
                            {applicationData.approval.departmentHead
                              .comment && (
                              <>
                                <p
                                  className=""
                                  style={{
                                    margin: "auto",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  commment From Head:
                                </p>
                                {
                                  applicationData.approval.departmentHead
                                    .comment
                                }
                                <br />
                              </>
                            )}
                            {applicationData.approval.controller.comment && (
                              <>
                                <p
                                  className="text-3xl"
                                  style={{
                                    margin: "auto",
                                    color: "black",
                                    fontWeight: "bold",
                                  }}
                                >
                                  commment From controller:
                                </p>
                                <br />
                                <p style={{ color: "black" }}>
                                  {applicationData.approval.controller.comment}
                                </p>
                                <br />
                              </>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : applicationData.completeStatus ? (
                <>
                  <div style={{ marginTop: "50px", border: "1px solid black" }}>
                    <div
                      className="row"
                      style={{ margin: "auto", width: "100%" }}
                    >
                      <div className="transcript-header-content">
                        <div className="row ">
                          <div className="col m-auto">
                            <p
                              className=""
                              style={{
                                margin: "auto",
                                textAlign: "center",
                                color: "blue",
                                fontWeight: "bold",
                              }}
                            >
                              Application is approved
                            </p>
                          </div>
                          <div className="col">
                            <p
                              className=""
                              style={{
                                margin: "auto",
                              }}
                            >
                              {applicationData.issueDate && (
                                <>
                                  <p
                                    className=""
                                    style={{
                                      margin: "auto",
                                      color: "black",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    Issue Date:
                                  </p>
                                  {applicationData.issueDate}
                                  <br />
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="row "
                    style={{ margin: "auto", width: "100%" }}
                  >
                    <div className="transcript-header-content">
                      <div className="row ">
                        <div className="col">
                          <button
                            onClick={approvedhandleShow}
                            type="button"
                            className="my-20 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          >
                            Accepted
                          </button>
                        </div>
                        <div className="col">
                          <button
                            onClick={handleShow}
                            type="button"
                            className="my-20 mx-2 py-2 px-4  bg-red-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Add Your Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Your Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
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
              <Button
                variant="primary"
                onClick={rejectionSubmit}
                style={{
                  background: "red",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Submit Rejection
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal show={approvedshow} onHide={approvedhandleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Issue date</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Issue Date</Form.Label>
                  <Form.Control
                    type="date"
                   
                    onChange={(e) => setIssueDate(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={approvedhandleClose}
                style={{ color: "green" }}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={issueDateSubmit}
                style={{
                  background: "green",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                 Submit
              </Button>
            </Modal.Footer>
          </Modal>
        </section>
      )}
    </>
  );
};

export default TranscriptCopy;
