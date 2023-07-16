import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminSideBar from "../components/AdminSideBar";
import Footer from "../components/Footer";

import HeaderAdmin from "../components/HeaderAdmin";
import AllApplicationtListAdmin from "./AllApplicationtListAdmin";
import CertificateCopy from "./CertificateCopy";
import ClearanceCopy from "./ClearanceCopy";
import CreateNotice from "./CreateNotice";
import GradesheetCopy from "./GradesheetCopy";
import ProfileAdmin from "./ProfileAdmin";
import TranscriptCopy from "./TranscriptCopy";

const DashboardAdmin = () => {
  return (
    <>
      <div className="main-content">
        <HeaderAdmin />
        <AdminSideBar />
        <main>
          <Routes>
            <Route path="/" element={<Navigate to="admin/application-list" />}/>
            <Route path="admin/application-list" element={<AllApplicationtListAdmin />}/>
            <Route path="admin/profile" element={<ProfileAdmin/>}/>
            <Route path="admin/create-notice" element={<CreateNotice/>}/>
            <Route
              path="view-equivalent-certificate/:applicationID"
              element={<TranscriptCopy />}
            />
            <Route
              path="view-gradesheet/:applicationID"
              element={<GradesheetCopy/>}
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

            <Route />
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardAdmin;
