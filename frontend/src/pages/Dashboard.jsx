import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddStudent from "./AddStudent";
import DistributionForm from "./DistributionForm";
import StudentList from "./StudentList";
import DashboardHome from "./DashboardHome";
import AccountInfo from "./AccountInfo";
import Transcript from "./Transcript";
import Gradesheet from "./Gradesheet";
import Certificate from "./Certificate";
import TranscriptCopy from "./TranscriptCopy";
import Clearance from "./Clearance";
import Profile from "./Profile";
import EditProfileForm from "./EditProfileForm";
import AllApplication from "./AllApplication";
import { Store } from "../reducer/Store";
import GradesheetCopy from "./GradesheetCopy";
import CertificateCopy from "./CertificateCopy";
import ClearanceCopy from "./ClearanceCopy";
import Notice from "./Notice";

const Dashboard = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;
  const profile = userInfo ? userInfo.profile : false;

  return (
    <>
      <div className="main-content">
        <Header />
        <SideBar />
        <main>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="transcript-form" element={<Transcript />} />
            <Route path="transcript-copy" element={<TranscriptCopy />} />
            <Route path="certificate-form" element={<Certificate />} />
            <Route path="clearance-form" element={<Clearance />} />
            <Route path="addstudent" element={<AddStudent />} />
            <Route path="gradesheet-form" element={<Gradesheet />} />
            <Route path="studentlist" element={<StudentList />} />
            <Route path="my-applications" element={<AllApplication />} />
            <Route path="accountinformation" element={<AccountInfo />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="notice"
              element={<Notice/>}
            />
            <Route
              path="view-equivalent-certificate/:applicationID"
              element={<TranscriptCopy />}
            />
            <Route
              path="view-gradesheet/:applicationID"
              element={<GradesheetCopy />}
            />
            <Route
              path="view-certificate/:applicationID"
              element={<CertificateCopy />}
            />
            <Route
              path="view-clearance/:applicationID"
              element={<ClearanceCopy />}
            />
            <Route
              path="view-transcript/:applicationID"
              element={<TranscriptCopy />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
