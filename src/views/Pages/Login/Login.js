import React, { useContext, useState } from 'react';
import './Login.css';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../../../Components/Context/Appcontext';
import Axios from '../../../Axios/Axios';

const Login = () => {
  const { setUser, loginInfo } = useContext(AppContext);

  //Initial state
  const InitialState = {
    email: '',
    password: '',
  };

  const [login, setLogin] = useState(InitialState);

  //Onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };

  //Signup API
  const [error, setError] = useState({}); //Error handling
  const navigate = useNavigate(); //Route the location to another page

  const Login_user = (e) => {
    e.preventDefault();
    Axios({
      url: `/auth/login`,
      method: 'post',
      data: {
        email: login?.email,
        password: login?.password,
      },
    })
      .then((res) => {
        if (res?.status == 200) {
          setError({});
          alert('Login successfully!');
          setUser({ type: 'login', loginfo: res.data });
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('user_details', JSON.stringify(res.data));
          navigate('/book');
        } else {
        }
      })
      .catch((err) => {
        if (err?.response?.status == 422) {
          const err_details = err?.response?.data?.errors.reduce(
            (acc, error) => {
              return { ...acc, ...error };
            },
            {}
          );
          setError(err_details);
        }
      });
  };
  return (
    <div className='Login_panel'>
      <div class='container-fluid'>
        <div class='no-gutter'>
          <div class='row bg-light'>
            <div class='col-md-6 d-none d-md-flex bg-image'></div>
            <div class=' col-md-6 login d-flex align-items-center justify-content-center p-5'>
              <div class='container'>
                <div class='row'>
                  <div class='col-lg-10 col-xl-7 mx-auto'>
                    <h5 class='display-4 title mb-4'>Login</h5>

                    <p class='ms-2'>
                      Don't have an account ?
                      <NavLink
                        to={'/signup'}
                        style={{ textDecoration: 'none', color: 'black' }}
                      >
                        <span class='fw-bold signup ms-1'>Sign up</span>
                      </NavLink>
                    </p>

                    <form>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='email'
                          value={login?.email}
                          name='email'
                          onChange={(e) => handleChange(e)}
                          placeholder='Email address'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.email}</small>
                      </div>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='password'
                          value={login?.password}
                          name='password'
                          onChange={(e) => handleChange(e)}
                          placeholder='Password'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />

                        <small className='error_spot'>{error?.password}</small>
                      </div>

                      <p class='forgot_pass ms-3'>Forgot Password?</p>

                      <div class='d-flex align-items-center justify-content-end'>
                        <button
                          type='submit'
                          class='btn btn-primary btn-block mb-2 rounded-pill shadow-sm f-2'
                          onClick={(e) => Login_user(e)}
                        >
                          Login
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
