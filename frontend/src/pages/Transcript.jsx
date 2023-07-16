import React, { useContext, useEffect, useState } from "react";
import { Store } from "../reducer/Store";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

const Transcript = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  console.log(userInfo);
  const navigate = useNavigate();

  let sessionc =
    userInfo.regNo.slice(0, 4) + "-" + (+userInfo.regNo.slice(0, 4) + 1);
  // console.log("sessionc :", sessionc)

  const [applicationType, setAppllicationType] = useState("");
  const [bankImage, setbankImage] = useState(null);
  const [gradesheetImage, setgradesheetImage] = useState(null);
  const [certificateImage, setcertificateImage] = useState(null);
  const [previewbank, setPreviewbank] = useState(null);
  const [previewgradesheet, setPreviewgradesheet] = useState(null);
  const [previewcertificate, setpreviewcertificate] = useState(null);
  const [signatureImage, setsignatureImage] = useState(userInfo.signatureImage);
  const [previewsignatureImage, setpreviewsignatureImage] = useState(null);

  const addImage = (name, file) => {
    if (name === "certificate") {
      setcertificateImage(file);
      window.URL.revokeObjectURL(previewcertificate);
      setpreviewcertificate(window.URL.createObjectURL(file));
    } else if (name === "bank") {
      setbankImage(file);
      window.URL.revokeObjectURL(previewbank);
      setPreviewbank(window.URL.createObjectURL(file));
    } else if (name === "gradesheet") {
      setgradesheetImage(file);
      window.URL.revokeObjectURL(previewgradesheet);
      setPreviewgradesheet(window.URL.createObjectURL(file));
    } else if (name == "signatureImage") {
      window.URL.revokeObjectURL(previewsignatureImage);
      setpreviewsignatureImage(window.URL.createObjectURL(file));
    }
  };

  const [trscptData, setTrscptData] = useState({
    name: userInfo.name,
    regNo: userInfo.regNo,
    dept: userInfo.dept,
    session: userInfo.session,
    fatherName: userInfo.fatherName,
    discipline: "",
    nameExamYear: "",
    school: "",
    mobile: userInfo.mobile,
    applicationType: "",
    nameExam: "",
    degree: "",
    cgpa: "",
    recipientAddress: "",
    currentAddress: userInfo.currentAddress,
    permanentAddress: userInfo.permanentAddress,
    signatureImageUrl: userInfo.signatureImage?userInfo.signatureImage.url:"",
  });

  let nm, value;

  const handleInputs = (e) => {
    //console.log(e);
    nm = e.target.name;
    value = e.target.value;

    setTrscptData({ ...trscptData, [nm]: value });

    // console.log(user);
  };

  const dataApplication = new FormData();

  const fillData = () => {
    dataApplication.set("discipline", trscptData.discipline);
    dataApplication.set("school", trscptData.school);
    dataApplication.set("nameExam", trscptData.nameExam);
    dataApplication.set("nameExamYear", trscptData.nameExamYear);
    dataApplication.set("currentAddress", trscptData.currentAddress);
    dataApplication.set("permanentAddress", trscptData.permanentAddress);
    dataApplication.set("mobile", trscptData.mobile);
    dataApplication.set("cgpa", trscptData.cgpa);
    dataApplication.set("degree", trscptData.degree);
    dataApplication.set("applicationType", applicationType);
    dataApplication.set("signatureImageUrl", trscptData.signatureImageUrl);
    dataApplication.set("bankRecipt", bankImage);
    dataApplication.set("gradesheet", gradesheetImage);
    dataApplication.set("certificate", certificateImage);
    dataApplication.set("gradesheet", gradesheetImage);
   
  };

  const submitHandler = async () => {
    fillData();
    axios
      .post("/application/submit", dataApplication, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        console.log(data);

        window.alert("application submit successful");

        navigate('/dashboard/my-applications')
      })
      .catch((error) => {
        window.alert(" application submission not successful");
      });
  };

  useEffect(() => {
    if (userInfo) {
      if (!userInfo.profile) {
        window.alert("please update profile first");
        navigate("/dashboard/profile");
      }
    } else {
      window.alert("please log in first");
    }
  }, []);

  return (
    <>
      {userInfo.profile && (
        <section className="container mx-auto px-4 sm:px-8 max-w-100">
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
                <h6> Application for Transcript / equivalant Certificate </h6>
                <hr className="h-line" />
              </div>
            </div>
          </div>
          <div className="my-3">
            <div className="flex flex-wrap items-center justify-between">
              <div className="relative px-3 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Full Name :
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="name"
                  className="form-element"
                  value={trscptData.name}
                  placeholder="student's full name"
                />
              </div>

              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Registration No:
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="regNo"
                  value={trscptData.regNo}
                  className="form-element"
                  placeholder="student's registration No"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Session:
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="session"
                  value={trscptData.session}
                  className="form-element"
                  placeholder="student's session"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Dicipline:
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="discipline"
                  value={trscptData.discipline}
                  className="form-element"
                  placeholder="student's diciline"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  School
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="school"
                  className="form-element"
                  placeholder="student's school name"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Name of Exam:
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="nameExam"
                  className="form-element"
                  placeholder="Exam's name and year"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="nameExam"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Year :
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="nameExamYear"
                  className="form-element"
                  placeholder="which year the exam was took place?"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Recipient's address
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="recipientAddress"
                  className="form-element"
                  placeholder="Address to which the transcript will be sent"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Permanent Address
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="permanentAddress"
                  value={trscptData.permanentAddress}
                  className="form-element"
                  placeholder="Student's permanent Address"
                />
              </div>

              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Current Address
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="currentAddress"
                  className="form-element"
                  value={trscptData.currentAddress}
                  placeholder="Student's Currrent Address"
                />
              </div>

              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Mobile Number
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="mobile"
                  value={trscptData.mobile}
                  className="form-element"
                  placeholder="Student's mobile number"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Application For
                </label>
                <div className="form-element">
                  <input
                    onClick={(e) => setAppllicationType(e.target.value)}
                    className=""
                    value="equivalent-certificate"
                    checked={applicationType === "equivalent-certificate"}
                    type="checkbox"
                  />
                  <label className="mx-2"> equivalent-certificate</label>
                  <input
                    onClick={(e) => setAppllicationType(e.target.value)}
                    className="mx-1"
                    value="transcript"
                    checked={applicationType === "transcript"}
                    type="checkbox"
                  />
                  <label className="mx-2"> Transcript </label>
                </div>
              </div>
              <div className="relative px-2 w-1/2">
                {applicationType === "equivalent-certificate" ? (
                  <>
                    <label
                      for="name"
                      className="block text-md py-3 font-medium text-gray-700"
                    >
                      Certificate
                    </label>
                    <input
                      onChange={(e) =>
                        addImage("certificate", e.target.files[0])
                      }
                      type="file"
                      name="certificate"
                      className="form-element"
                      placeholder="Address to which the transcript will be sent"
                    />
                  </>
                ) : (
                  <>
                    <label
                      for="name"
                      className="block text-md py-3 font-medium text-gray-700"
                    >
                      Gradesheet/marksheet
                    </label>
                    <input
                      onChange={(e) =>
                        addImage("gradesheet", e.target.files[0])
                      }
                      type="file"
                      multiple
                      className="form-element"
                      placeholder="Address to which the transcript will be sent"
                    />
                  </>
                )}
              </div>

              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Bank payment receipt
                </label>
                <input
                  onChange={(e) => addImage("bank", e.target.files[0])}
                  type="file"
                  name="bank"
                  className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  placeholder="Address to which the transcript will be sent"
                />
              </div>
            </div>
            <div className="container mt-5">
              <div className="row">
                <div className="col-6">
                  <div
                    className="recommend"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    <div> Recommendation of department head</div>
                    <input
                      type="text"
                      readonly
                      className="border-btm"
                      style={{ textAlign: "center" }}
                      id="staticEmail"
                    />
                    <div style={{ color: "gray" }}> (signature)</div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    className="recommend"
                    style={{ fontWeight: "bold", color: "black" }}
                  >
                    <div> Your Signature</div>
                    <div className="mt-3">
                      <div className="d-flex justify-content-center">
                        <img
                          style={{ height: "70px", width: "250px" }}
                          src={signatureImage.url}
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

            <div className="transcript-header-content">
              <button
                onClick={submitHandler}
                type="button"
                className="my-20 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                Submit
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Transcript;
