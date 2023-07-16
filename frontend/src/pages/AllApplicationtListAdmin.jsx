import React, { useContext, useEffect } from "react";
import { MdArrowRight } from "react-icons/md";
import { MdArrowLeft } from "react-icons/md";
import { MdError } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../reducer/Store";
import axios from "axios";
import { useState } from "react";
import Certificate from "./Certificate";

const AllApplicationtListAdmin = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const navigate = useNavigate();

  const [applicationData, setapplicationData] = useState(null);
  const [applicationDataTemp, setapplicationDataTemp] = useState([]);
  const [applicationDataChunk, setapplicationDataChunk] = useState(null);

  const viewApplicationLink = (application) => {
    console.log();
    if (application.applicationType == "gradesheet") {
      return `view-gradesheet/${application.applicationID}`;
    } else if (application.applicationType == "certificate") {
      return `view-certificate/${application.applicationID}`;
    } else if (
      application.applicationType == "equivalent-certificate" ||
      application.applicationType == "transcript"
    ) {
      return `view-transcript-equi-certificate/${application.applicationID}`;
    } else {
      return `view-clearance/${application.applicationID}`;
    }
  };

  const statusChecked = (application) => {
    if (application.applicationType === "clearance") {
      if (application.approval.departmentHead.approval) {
        return <span style={{ color: "green" }}>All Approved</span>;
      } else if (
        application.approval.librarian.approval ||
        application.approval.proctor.approval ||
        application.approval.studentAdvisor.approval ||
        application.approval.provost.approval ||
        application.approval.medicalOfficer.approval ||
        application.approval.register.approval
      ) {
        return <span style={{ color: "green" }}>Partial Approved</span>;
      } else {
        return <span style={{ color: "red" }}>NOT Yet Approved</span>;
      }
    } else {
      if (!application.rejectionStatus) {
        //console.log("ddd")
        if (application.approval.controller.approval) {
          return <span style={{ color: "green" }}>All Approved</span>;
        } else if (application.approval.departmentHead.approval) {
          return <span style={{ color: "blue" }}>dept. Approved</span>;
        } else {
          return <span style={{ color: "red" }}>No Yet Approved</span>;
        }
      } else {
        return <span style={{ color: "red" }}>Rejected</span>;
      }
    }
  };

  const allDataCombine = (data) => {
    if (data.certificates.length) {
      console.log("ddd");
      if (applicationDataTemp.length) {
        console.log("ddd0");
        setapplicationDataTemp([...applicationDataTemp, ...data.certificates]);
      } else {
        console.log("ff");
        setapplicationDataTemp([...data.certificates]);
      }
    }

    if (data.transcript.length) {
      console.log("ddd1");
      if (applicationDataTemp.length) {
        console.log("ddd2");
        setapplicationDataTemp([...applicationDataTemp, ...data.transcript]);
      } else {
        setapplicationDataTemp([...data.transcript]);
      }
    }

    if (data.clearance.length) {
      if (applicationDataTemp.length) {
        setapplicationDataTemp([...applicationDataTemp, ...data.clearance]);
      } else {
        setapplicationDataTemp([...data.clearance]);
      }
    }

    if (data.equivalentCertificate.length) {
      if (applicationDataTemp.length) {
        setapplicationDataTemp([
          ...applicationDataTemp,
          ...data.equivalentCertificate,
        ]);
      } else {
        setapplicationDataTemp([...data.equivalentCertificate]);
      }
    }
    if (data.gradesheets.length) {
      if (applicationDataTemp.length) {
        setapplicationDataTemp([...applicationDataTemp, ...data.gradesheets]);
      } else {
        setapplicationDataTemp([...data.gradesheets]);
      }
    }

    console.log(applicationDataTemp);

    setapplicationData([...applicationDataTemp]);
  };

  const fetchApplicationData = async () => {
    const { data } = await axios.post(
      "/admin/pending-approval",
      {
        role: userInfo ? userInfo.role : " ",
      },
      {
        headers: { Authorization: `Bearer ${userToken}` },
      }
    );

    console.log(data);
    //allDataCombine(data);

    setapplicationData([
      ...data.transcript,
      ...data.equivalentCertificate,
      ...data.gradesheets,
      ...data.certificates,
      ...data.clearance,
    ]);

    console.log("apllicationdata:", applicationData);
  };

  useEffect(() => {
    if (userInfo.profile) {
      fetchApplicationData();
    } else {
      navigate("/dashboard/admin/profile");
    }
  }, []);

  return (
    <>
      {applicationData && (
        <div className="container mx-auto px-4 sm:px-8 max-w-100">
          <div className="py-8">
            <div className="flex flex-row mb-1 sm:mb-0 justify-between w-full">
              <div className="notice-header d-flex">
                <FaWpforms className="text-5xl mx-2  text-green-600" />
                <h3 className="text-blue-600 mt-2"> Application list</h3>
              </div>
              {/* <div className="text-end">
                <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
                  <div className=" relative ">
                    <input
                      type="text"
                      className=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      placeholder="filter"
                    />
                  </div>
                  <button
                    className="flex-shrink-0 px-4 py-2 text-base font-semibold text-white bg-green-600 shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-200"
                    type="submit"
                  >
                    Filter
                  </button>
                </form>
              </div> */}
            </div>
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        style={{ fontWeight: "bold" }}
                        className="px-5 py-3 bg-white   border-b border-gray-200 text-black-800 text-left text-sm uppercase font-normal"
                      >
                        Application Type
                      </th>
                      <th
                        scope="col"
                        style={{ fontWeight: "bold" }}
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        style={{ fontWeight: "bold" }}
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Applicant Registration
                      </th>
                      <th
                        scope="col"
                        style={{ fontWeight: "bold" }}
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        submit date
                      </th>
                      <th
                        scope="col"
                        style={{ fontWeight: "bold" }}
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  {applicationData.length? (
                    <tbody>
                      {applicationData.map((application) => {
                        return (
                          <tr>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <div className="flex items-center">
                                <p className="text-gray-900 whitespace-no-wrap">
                                  {application.applicationType}
                                </p>
                              </div>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {application.name}
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {application.regNo}
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {application.date}
                              </p>
                            </td>
                            <td className="px-5 py-4 border-b border-gray-200 bg-white text-sm">
                              <p className="text-green-600 hover:text-green-900">
                                <Link
                                  to={`/dashboard/view-${application.applicationType}/${application.applicationID}`}
                                >
                                  view details
                                </Link>
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  ) : (
                    <>
                      <div className="notice-header d-flex">
                        <MdError className="text-5xl mx-2  text-green-600" />
                        <h3 className="text-red-600 mt-2">
                          {" "}
                          No Applications Yet
                        </h3>
                      </div>
                    </>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllApplicationtListAdmin;
