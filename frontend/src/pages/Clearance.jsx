
import React, { useContext, useEffect, useState } from "react";
import { Store } from "../reducer/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Clearance = () => {

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate =useNavigate();

  let sessionc =
    userInfo.regNo.slice(0, 4) + "-" + (+userInfo.regNo.slice(0, 4) + 1);
  // console.log("sessionc :", sessionc)

  const [applicationType, setAppllicationType] = useState("clearance");
  const [bankImage, setbankImage] = useState(null);
  const [gradesheetImage, setgradesheetImage] = useState(null);
  const [certificateImage, setcertificateImage] = useState(null);
  const [previewbank, setPreviewbank] = useState(null);
  const [previewgradesheet, setPreviewgradesheet] = useState(null);
  const [previewcertificate, setpreviewcertificate] = useState(null);

  const addImage = (name, file) => {
    // if(name==="certificate")
    // {
    //   setcertificateImage(file);
    // window.URL.revokeObjectURL(previewcertificate);
    // setpreviewcertificate(window.URL.createObjectURL(file));
    // }
    // else if(name==="bank")
    // {
    //   setbankImage(file);
    // window.URL.revokeObjectURL(previewbank);
    // setPreviewbank(window.URL.createObjectURL(file));
    // }
    // else if(name==="gradesheet")
    // {
    //   setgradesheetImage(file);
    // window.URL.revokeObjectURL(previewgradesheet);
    // setPreviewgradesheet(window.URL.createObjectURL(file));
    // }
  };

  const [clearance, setclearance] = useState({
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

    setclearance({ ...clearance, [nm]: value });

    // console.log(user);
  };

  const dataApplication = new FormData();

  const fillData = () => {
    dataApplication.set("discipline", clearance.discipline);
    dataApplication.set("school", clearance.school);
    dataApplication.set("nameExam", clearance.nameExam);
    dataApplication.set("nameExamYear", clearance.nameExamYear);
    dataApplication.set("currentAddress", clearance.currentAddress);
    dataApplication.set("permanentAddress", clearance.permanentAddress);
    dataApplication.set("mobile", clearance.mobile);
    dataApplication.set("cgpa", clearance.cgpa);
    dataApplication.set("degree", clearance.degree);
    dataApplication.set("applicationType", applicationType);
    dataApplication.set("signatureImgeUrl", clearance.signatureImageUrl);
    dataApplication.set("bankRecipt", bankImage);
    dataApplication.set("gradesheet", gradesheetImage);
    dataApplication.set("certificate", certificateImage);
   
    
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
   
    if(userInfo){
      if(!userInfo.profile){
        window.alert("please update profile first")
        navigate('/dashboard/profile')
      }
    }
    else{
      window.alert("please log in first")
    }
  }, []);

  return (
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
                <h4 className="text-xxl font-bold text-green-600">Sylhet </h4>
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
                    onChange={handleInputs}
                    type="text"
                    className="border-btm"
                    name="name"
                    value={clearance.name}
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
                      onChange={handleInputs}
                      type="text"
                      className=" ml-2 border-btm"
                      name="regNo"
                      value={clearance.regNo}
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
                      value={clearance.dept}
                      onChange={handleInputs}
                      className=" ml-2 border-btm"
                    >
                      <option disabled selected>your Department</option>
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
                    name= "degree" 
                    onChange={handleInputs}
                    className=" ml-2 border-btm">
                      <option disabled selected>Which degree did you get?</option>
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
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
                <tr>
                  <td className="table-td-form">02</td>
                  <td className="table-td-form">Proctor</td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
                <tr>
                  <td className="table-td-form">03</td>
                  <td className="table-td-form">
                    Director of Student's advisor committee
                  </td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
                <tr>
                  <td className="table-td-form">04</td>
                  <td className="table-td-form">Register</td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
                <tr>
                  <td className="table-td-form">05</td>
                  <td className="table-td-form">Medical officer</td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
                <tr>
                  <td className="table-td-form">06</td>
                  <td className="table-td-form">
                    Provost (for residencial student)
                  </td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                  <td className="table-td-form"></td>
                </tr>
              </table>
            </div>
          </div>
          <div className="transcript-header-content">
            {/* <button
              type="button"
              onClick={submitHandler}
              className=" py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Request To All
            </button> */}
          </div>
          <div className="table-div ">
            <div className="">
              <table className="table-form">
                <tr>
                  <td
                    className="table-td-form"
                    style={{ width: "35%", borderBottom: "underline" }}
                  >
                    Department head
                  </td>
                  <td className="table-td-form" style={{ width: "15%" }}></td>
                  <td className="table-td-form" style={{ width: "30%" }}></td>
                  <td className="table-td-form" style={{ width: "20%" }}></td>
                </tr>
              </table>
            </div>
          </div>

          <div className="transcript-header-content">
            <button
              type="button"
              onClick={submitHandler}
              className="mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
              Submit
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Clearance;
