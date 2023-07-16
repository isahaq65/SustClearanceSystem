import React, { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Store } from "../reducer/Store";
import axios from "axios";

const ProfileAdmin = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo, userToken } = state;

  const navigate = useNavigate();

  const [edit, setEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [signatureImage, setsignatureImage] = useState(null);
  const [previewProfile, setPreviewProfile] = useState(null);
  const [previewSignature, setPreviewSignature] = useState(null);

  const [profileData, setprofileData] = useState({
    name: userInfo.name,
    regNo: userInfo.regNo,
    dept: userInfo.dept,
    email: userInfo.email,
    role: userInfo.role,
    nationality: userInfo.nationality,
    permanentAddress: userInfo.permanentAddress,
    currentAddress: userInfo.currentAddress,
    mobile: userInfo.mobile,
    currentPassword: "",
    newPassword: "",
    profileImgUrl: userInfo.profileImage
      ? userInfo.profileImage.url
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    signatureImgUrl: userInfo.signatureImage
      ? userInfo.signatureImage.url
      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
  });

  const addImage = (file) => {
    setProfileImage(file);
    window.URL.revokeObjectURL(previewProfile);
    setPreviewProfile(window.URL.createObjectURL(file));
  };

  const addSignatureImage = (file) => {
    setsignatureImage(file);
    window.URL.revokeObjectURL(previewSignature);
    setPreviewSignature(window.URL.createObjectURL(file));
  };

  let nm, value;

  const handleInputs = (e) => {
    nm = e.target.name;
    value = e.target.value;

    setprofileData({ ...profileData, [nm]: value });
  };

  const handleEdit = () => {
    if (!edit) setEdit(true);
    else {
      setEdit(false);
    }
  };

  const profile = () => {
    console.log(profileImage);
  };

  const data = new FormData();

  const fillData = () => {
    data.set("nationality", profileData.nationality);
    data.set("permanentAddress", profileData.permanentAddress);
    data.set("currentAddress", profileData.currentAddress);
    data.set("mobile", profileData.mobile);
    data.set("profile-image", profileImage);
    data.set("signature", signatureImage);
    console.log(profileImage);
  };

  const updateHandler = async () => {
    fillData();

    axios
      .post("/user/update-profile", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userToken}`,
        },
      })
      .then((response) => {
        console.log(response);
        const { data } = response;
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data));
        ctxDispatch({ type: "USER_SIGNIN", payload: data });

        window.alert("update successful");
        setEdit(false)

        navigate("/dashboard/admin/profile");
        
      })
      .catch((error) => {
        window.alert("not successful");
      });
  };

  return (
    <section className="my-2">
      <div className="container emp-profile">
        <form method="post">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <div className="d-flex justify-content-center">
                  {profileImage ? (
                    <img
                      style={{ height: "150px" }}
                      src={previewProfile}
                      alt=" "
                      //275 × 183
                    />
                  ) : profileData.profileImgUrl ? (
                    <img
                      src={profileData.profileImgUrl}
                      alt=" "
                      //275 × 183
                    />
                  ) : (
                    <img
                      style={{ height: "150px" }}
                      src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                      alt=" "
                      //275 × 183
                    />
                  )}
                </div>
                {edit && (
                  <div
                    className="file btn btn-lg btn-primary"
                    id="changePhotodiv"
                  >
                    Change Photo
                    <input
                      type="file"
                      name="profileImage"
                      onChange={(e) => addImage(e.target.files[0])}
                    />
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userInfo.name}</h5>
                <h6>{userInfo.role}</h6>
                {userInfo.role === "department head" && <p>{userInfo.dept}</p>}

                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-md-2" onClick={handleEdit}>
              <input
                className="profile-edit-btn"
                name="btnAddMore"
                type="button"
                value="Edit Profile"
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="account-tab"
                  data-toggle="pill"
                  role="tab"
                  aria-controls="account"
                  aria-selected="true"
                >
                  <i className="fa fa-home text-center mr-1"></i>
                  Account
                </a>

                <Link to="/dashboard/admin/application-list">
                  <a
                    className="nav-link"
                    id="application-tab"
                    data-toggle="pill"
                    role="tab"
                    aria-controls="application"
                    aria-selected="true"
                  >
                    <i className="fa fa-tv text-center mr-1"></i>
                    Your All Application
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-md-8">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div>
                    <div className="row ">
                      <div className="col-md-6 mt-3 ">
                        <label>Name :</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleInputs}
                              placeholder="student's name "
                            />
                          </>
                        ) : (
                          <>
                            <p className="mt-3"> {userInfo.name}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-3">
                        <label>Email:</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleInputs}
                              placeholder="email"
                            />
                          </>
                        ) : (
                          <>
                            <p className="mt-3"> {userInfo.email}</p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-3 ">
                        <label>Role:</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              id="role"
                              name="role"
                              value={profileData.role}
                              placeholder="Role"
                              disabled
                            />
                          </>
                        ) : (
                          <>
                            <p className="mt-3">{userInfo.role}</p>
                          </>
                        )}
                      </div>
                    </div>
                    {userInfo.role === "department head" ? (
                      <div className="row">
                        <div className="col-md-6 mt-3 ">
                          <label>Department:</label>
                        </div>
                        <div className="col-md-6">
                          {edit ? (
                            <>
                              <input
                                type="text"
                                className="border-btm"
                                id="dept"
                                name="dept"
                                value={profileData.dept}
                                onChange={handleInputs}
                                placeholder="department"
                              />
                            </>
                          ) : (
                            <>
                              <p className="mt-3"> {userInfo.dept}</p>
                            </>
                          )}
                        </div>
                      </div>
                    ) : null}
                    {/*                   
                    <div className="row">
                      <div className="col-md-6 mt-3 ">
                        <label>Mobile</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              id="mobile"
                              name="mobile"
                              value={profileData.mobile}
                              onChange={handleInputs}
                              placeholder="mobile number"
                            />
                          </>
                        ) : (
                          <>
                            <p className="mt-3">
                              {userInfo.mobile ? (
                                <div>{userInfo.mobile}</div>
                              ) : (
                                <span>N/A</span>
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-3 ">
                        <label>Nationality</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              name="nationality"
                              value={profileData.nationality}
                              onChange={handleInputs}
                              placeholder="Nationality"
                            />
                          </>
                        ) : (
                          <>
                            <p className="mt-3">
                              {" "}
                              {userInfo.nationality ? (
                                <div>{userInfo.nationality}</div>
                              ) : (
                                <span>N/A</span>
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-3 ">
                        <label>Permanent Address</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              name="permanentAddress"
                              value={profileData.permanentAddress}
                              onChange={handleInputs}
                              placeholder="Permanent address"
                            />{" "}
                          </>
                        ) : (
                          <>
                            <p className="mt-3">
                              {userInfo.permanentAddress ? (
                                <div>{userInfo.permanentAddress}</div>
                              ) : (
                                <span>N/A</span>
                              )}{" "}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mt-3 ">
                        <label>Current Address</label>
                      </div>
                      <div className="col-md-6">
                        {edit ? (
                          <>
                            <input
                              type="text"
                              className="border-btm"
                              id="currentAddress"
                              name="currentAddress"
                              value={profileData.currentAddress}
                              onChange={handleInputs}
                              placeholder="current address"
                            />{" "}
                          </>
                        ) : (
                          <>
                            <p className="mt-3">
                              {userInfo.currentAddress ? (
                                <div>{userInfo.currentAddress}</div>
                              ) : (
                                <span>N/A</span>
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    </div> */}
                    {edit && (
                      <>
                        <div className="row">
                          <div className="col-md-6 mt-3 ">
                            <label>current password</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="password"
                              className="border-btm"
                              id="currentPassword"
                              name="currentPassword"
                              onChange={handleInputs}
                              placeholder="current password"
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-6 mt-3 ">
                            <label>New Password</label>
                          </div>
                          <div className="col-md-6">
                            <input
                              type="password"
                              className="border-btm"
                              id="newPassword"
                              name="newPassword"
                              onChange={handleInputs}
                              placeholder="new password"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    <hr className="mt-5 mb-0" />

                    <div className="row">
                      <div
                        className="signature-img"
                        style={{ borderRadius: "0px" }}
                      >
                        <div className="mt-3">
                          <div className="d-flex justify-content-center">
                            {signatureImage ? (
                              <img
                                style={{ height: "70px", width: "250px" }}
                                src={previewSignature}
                                alt=""
                                //275 × 183
                              />
                            ) : (
                              <img
                                style={{ height: "70px", width: "250px" }}
                                src={profileData.signatureImgUrl}
                                alt=""
                                //275 × 183
                              />
                            )}
                          </div>
                          {edit && (
                            <div
                              className="file btn btn-lg btn-primary "
                              style={{ width: "max-content" }}
                              id="changePhotodiv"
                            >
                              Change Signature
                              <input
                                type="file"
                                name="signatureImage"
                                onChange={(e) =>
                                  addSignatureImage(e.target.files[0])
                                }
                              />
                            </div>
                          )}
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
                                color: "black",
                              }}
                            >
                              Signature
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {edit && (
                      <div className="transcript-header-content">
                        <button
                          type="button"
                          onClick={updateHandler}
                          className="mt-10 mx-2 py-2 px-4  bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
                        >
                          update
                        </button>
                      </div>
                    )}
                  </div>

                  <div></div>
                </div>
                {/* <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <label>Experience</label>
                      </div>
                      <div className="col-md-6">
                        <p >Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Hourly Rate</label>
                      </div>
                      <div className="col-md-6">
                        <p>10$/hr</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Total Projects</label>
                      </div>
                      <div className="col-md-6">
                        <p>230</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>English Level</label>
                      </div>
                      <div className="col-md-6">
                        <p>Expert</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Availability</label>
                      </div>
                      <div className="col-md-6">
                        <p>6 months</p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label>Your Bio</label>
                        <br />
                        <p>Your detail description</p>
                      </div>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ProfileAdmin;
