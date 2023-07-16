import React, { useContext, useState } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../reducer/Store';

const Login = () => {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  let name, value;

    const handleInputs = (e) => {
      //console.log(e);
      name = e.target.name;
      value = e.target.value;

      setUser({ ...user, [name]: value });

      // console.log(user);
    };

  const submitHandler = async (e) => {
    e.preventDefault();

    const { name, email, department, registration, password, role } = user;
    try {
      const { data } = await axios.post('/user/signin', {
        email,
        password,
      });
      console.log(data);

      ctxDispatch({ type: 'USER_SIGNIN', payload: data.user });
      ctxDispatch({ type: 'USER_TOKEN', payload: data.token});
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('role', JSON.stringify(data.user.role))
      localStorage.setItem('userInfo', JSON.stringify(data.user));

      window.alert('login successfull');
      navigate('/');
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <MDBContainer>
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
              <MDBCard
                className="bg-white my-4 mx-auto"
                style={{ borderRadius: '1rem', maxWidth: '500px' }}
              >
                <MDBCardBody className="p-5  w-100 d-flex flex-column">
                  <div className="header-signup">
                    <div className="logo"></div>
                    <div className="">
                      <h2
                        className="fw-bold mb-2 text-center "
                        style={{ color: '#059669' }}
                      >
                        SUST Clearance System
                      </h2>
                    </div>
                  </div>
                  <h2 className="header-text">Sign in</h2>
                  <p className="text-white-50 mb-3"></p>

                  <MDBInput
                    wrapperClass="mb-4 w-100 mt-10"
                    label="Email address"
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleInputs}
                    size="lg"
                  />
                  <MDBInput
                    wrapperClass="mb-4 w-100"
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleInputs}
                    size="lg"
                  />

                  <MDBCheckbox
                    name="flexCheck"
                    id="flexCheckDefault"
                    className="mb-4"
                    label="Remember password"
                  />

                  <MDBBtn size="lg" onClick={submitHandler}>
                    Login
                  </MDBBtn>

                  <hr className="my-4" />
                  <div>
                    <p className="mb-0">
                      Don't have an account? <Link to="/signup">signup</Link>
                    </p>
                  </div>

                  {/* <MDBBtn
                  className="mb-2 w-100"
                  size="lg"
                  style={{ backgroundColor: '#dd4b39' }}
                >
                  <MDBIcon fab icon="google" className="mx-2" />
                  Sign in with google
                </MDBBtn>

                <MDBBtn
                  className="mb-4 w-100"
                  size="lg"
                  style={{ backgroundColor: '#3b5998' }}
                >
                  <MDBIcon fab icon="facebook-f" className="mx-2" />
                  Sign in with facebook
                </MDBBtn> */}
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
    </div>
  );
};

export default Login;
