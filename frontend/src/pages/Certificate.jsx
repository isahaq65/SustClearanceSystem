import React, { useContext, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import { Store } from "../reducer/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Certificate = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate = useNavigate();

  let sessionc =
    userInfo.regNo.slice(0, 4) + "-" + (+userInfo.regNo.slice(0, 4) + 1);
  // console.log("sessionc :", sessionc)

  const [applicationType, setAppllicationType] = useState("certificate");
  const [bankImage, setbankImage] = useState(null);
  const [gradesheetImage, setgradesheetImage] = useState(null);
  const [certificateImage, setcertificateImage] = useState(null);
  const [previewbank, setPreviewbank] = useState(null);
  const [previewgradesheet, setPreviewgradesheet] = useState(null);
  const [previewcertificate, setpreviewcertificate] = useState(null);
  const [signatureImage, setsignatureImage] = useState(userInfo.signatureImage);
  const [previewsignatureImage, setpreviewsignatureImage] = useState(null);

  const addImage = (name, file) => {
    if (name === "bank") {
      setbankImage(file);
      window.URL.revokeObjectURL(previewbank);
      setPreviewbank(window.URL.createObjectURL(file));
    }
  };

  const [certificateData, setcertificateData] = useState({
    name: userInfo.name,
    regNo: userInfo.regNo,
    dept: userInfo.dept,
    fatherName: userInfo.fatherName,
    session: userInfo.session,
    discipline: "",
    nameExamYear: "",
    school: "",
    mobile: userInfo.mobile,
    nationality: userInfo.nationality,
    applicationType: applicationType,
    nameExam: "",
    degree: "",
    cgpa: "",
    semester: "",
    currentAddress: userInfo.currentAddress,
    permanentAddress: userInfo.permanentAddress,
    signatureImageUrl: userInfo.signatureImage? userInfo.signatureImage.url:"",
  });

  let nm, value;

  const handleInputs = (e) => {
    //console.log(e);
    nm = e.target.name;
    value = e.target.value;

    setcertificateData({ ...certificateData, [nm]: value });

    // console.log(user);
  };

  const dataApplication = new FormData();

  const fillData = () => {
    dataApplication.set("discipline", certificateData.discipline);
    dataApplication.set("school", certificateData.school);
    dataApplication.set("nameExam", certificateData.nameExam);
    dataApplication.set("nameExamYear", certificateData.nameExamYear);
    dataApplication.set("currentAddress", certificateData.currentAddress);
    dataApplication.set("permanentAddress", certificateData.permanentAddress);
    dataApplication.set("mobile", certificateData.mobile);
    dataApplication.set("cgpa", certificateData.cgpa);
    dataApplication.set("degree", certificateData.degree);
    dataApplication.set("applicationType", applicationType);
    dataApplication.set("signatureImageUrl", certificateData.signatureImageUrl);
    dataApplication.set("bankRecipt", bankImage);
   
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
      navigate("/signin");
    }
  }, [userInfo]);

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
                <h6> Application for orginal/temporary certificate </h6>
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
                  value={certificateData.name}
                  className="form-element"
                  placeholder="student's full name"
                />
              </div>

              <div className="relative px-3 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Father's Name:
                </label>
                <input
                  onChange={handleInputs}
                  name="fatherName"
                  value={certificateData.fatherName}
                  type="text"
                  className="form-element"
                  placeholder="Father's full name in english"
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
                  value={certificateData.regNo}
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
                  value={certificateData.session}
                  className="form-element"
                  placeholder="student's session"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Discipline
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="discipline"
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
                  name="school"
                  type="text"
                  className="form-element"
                  placeholder="student's school name"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Name of Exam :
                </label>
                <input
                  onChange={handleInputs}
                  name="nameExam"
                  type="text"
                  className="form-element"
                  placeholder="Exam's name and year"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Exam Year:
                </label>
                <input
                  onChange={handleInputs}
                  name="nameExamYear"
                  type="text"
                  className="form-element"
                  placeholder="Exam's name and year"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  CGPA
                </label>
                <input
                  onChange={handleInputs}
                  name="cgpa"
                  type="text"
                  className="form-element"
                  placeholder="Which semeste's certificate do you want?"
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
                  value={certificateData.permanentAddress}
                  className="form-element"
                  placeholder="Student's permanddent Address"
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
                  value={certificateData.currentAddress}
                  className="form-element"
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
                  value={certificateData.mobile}
                  className="form-element"
                  placeholder="Student's mobile number"
                />
              </div>
              <div className="relative px-2 w-1/2">
                <label
                  for="name"
                  className="block text-md py-3 font-medium text-gray-700"
                >
                  Nationality
                </label>
                <input
                  onChange={handleInputs}
                  type="text"
                  name="nationality"
                  value={certificateData.nationality}
                  className="form-element"
                  placeholder="Student's nationality"
                />
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

export default Certificate;
