import React, { useContext, useState } from "react";
import { MDBInput, MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { Store } from "../reducer/Store";
import { AiOutlineNotification } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsBookmarks } from "react-icons/bs";
import Form from "react-bootstrap/Form";

const CreateNotice = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [notice, setNotice] = useState({
    date: "",
    noticeBody: "",
    noticeType:""
  });

  let name, value;

  const handleInputs = (e) => {
    //console.log(e);
    name = e.target.name;
    value = e.target.value;

    setNotice({ ...notice, [name]: value });

    // console.log(user);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { noticeType, date, noticeBody } = notice;
    try {
      const { data } = await axios.post("/notice/add", {
        noticeType,
        noticeBody,
        date,
      });
      console.log(data);
      window.alert("successfully post");
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      {" "}
      <section className="my-1">
        <div>
          <div className="notice-header d-flex">
            <BsBookmarks className="text-5xl mx-2  text-green-600" />
            <h3 className="text-blue-600 mt-2">Write Notice</h3>
          </div>
          <hr className="mt-0 mb-2" />
          <div className="row">
            <div className="mx-4 mb-5 sm:-mx-8 px-4 sm:px-5 overflow-x-auto">
              <div className="inline-block min-w-full shadow overflow-hidden">
                <div style={{ alignContent: "center" }}>
                  <div className="p-5" style={{ width: "50%" }}>
                    <div>
                      <div className="row">
                        <form>
                          <Form>
                            <Form.Label style={{ fontWeight: "bold" }}>
                              Notice type
                            </Form.Label>
                            <Form.Select
                              required
                              size="lg"
                              className="mb-3"
                              name="noticeType"
                              placeholder="notice Type"
                              onChange={(e) => {
                                handleInputs(e);
                              }}
                            >
                              <option value="notice" disabled selected>
                                Notice type
                              </option>
                              <option value="notice">Notice</option>
                              <option value="announcement">announcement</option>
                            </Form.Select>

                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label style={{ fontWeight: "bold" }}>
                                Date
                              </Form.Label>
                              <Form.Control type="date" />
                            </Form.Group>
                            <Form.Group
                              className="mb-3"
                              controlId="exampleForm.ControlTextarea1"
                            >
                              <Form.Label style={{ fontWeight: "bold" }}>
                                Wrte your notice
                              </Form.Label>
                              <Form.Control as="textarea" rows={3} name="noticeBody"  onChange={handleInputs}/>
                            </Form.Group>
                          </Form>

                          <MDBBtn
                            onClick={submitHandler}
                            type="submit"
                            className="mb-4"
                            block
                          >
                            Submit
                          </MDBBtn>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-0 mb-2" />
      </section>
      
    </>
  );
};

export default CreateNotice;
