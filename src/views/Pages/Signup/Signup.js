import React, { useContext, useState } from 'react';
import './Signup.css';
import Axios from '../../../Axios/Axios';
import { NavLink, useNavigate } from 'react-router-dom';
import AppContext from '../../../Components/Context/Appcontext';

const Signup = () => {
  const { setUser, loginInfo } = useContext(AppContext);

  //Initial state
  const InitialState = {
    name: '',
    email: '',
    mobile: '',
    new_password: '',
    confirm_password: '',
  };

  const [signup, setSignup] = useState(InitialState);

  //Onchange
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignup({ ...signup, [name]: value });
    if (name == 'mobile') {
      setSignup({ ...signup, [name]: value?.replace(/\D/g, '') });
    }
  };

  //Signup API
  const [error, setError] = useState({}); //Error handling
  const navigate = useNavigate(); //Route the location to another page

  const Signup_user = (e) => {
    e.preventDefault();
    Axios({
      url: `/crm/signup`,
      method: 'post',
      data: {
        name: signup?.name,
        email: signup?.email,
        mobile: signup?.mobile,
        password:
          signup?.new_password === signup?.confirm_password
            ? signup?.new_password
            : '',
      },
    })
      .then((res) => {
        if (res?.status == 200) {
          setError({});
          alert('Signup successfully  !');
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
    <div className='signup_panel'>
      <div class='container-fluid'>
        <div class='no-gutter'>
          <div class='row bg-light'>
            <div class='col-md-6 d-none d-md-flex bg-image'></div>
            <div class=' col-md-6 login d-flex align-items-center justify-content-center p-5'>
              <div class='container'>
                <div class='row'>
                  <div class='col-lg-10 col-xl-7 mx-auto'>
                    <h5 class='display-4 title mb-4'>Signup</h5>
                    <form>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='text'
                          value={signup?.name}
                          name='name'
                          onChange={(e) => handleChange(e)}
                          placeholder='Name'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.name}</small>
                      </div>

                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='email'
                          value={signup?.email}
                          name='email'
                          onChange={(e) => handleChange(e)}
                          placeholder='Email address'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.name}</small>
                      </div>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='text'
                          value={signup?.mobile}
                          name='mobile'
                          onChange={(e) => handleChange(e)}
                          maxLength={10}
                          placeholder='Mobile Number'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.mobile}</small>
                      </div>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='password'
                          value={signup?.new_password}
                          name='new_password'
                          onChange={(e) => handleChange(e)}
                          placeholder='New Password'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.password}</small>
                      </div>
                      <div class='form-group mb-4'>
                        <input
                          id='inputEmail'
                          type='email'
                          value={signup?.confirm_password}
                          name='confirm_password'
                          onChange={(e) => handleChange(e)}
                          placeholder='Confirm Password'
                          required=''
                          autofocus=''
                          class='form-control rounded-pill border-0 shadow-sm px-4'
                        />
                        <small className='error_spot'>{error?.password}</small>
                      </div>
                      <div class='d-flex align-items-center justify-content-center'>
                        <button
                          type='submit'
                          class='btn btn-primary btn-block mb-2 rounded-pill shadow-sm f-2'
                          onClick={(e) => Signup_user(e)}
                        >
                          Signup
                        </button>
                      </div>
                      <p class='mt-2 d-flex align-items-center justify-content-center signup_para'>
                        Have an account ?
                        <NavLink
                          to={'/login'}
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <span class='fw-bold signup ms-2'>Sign in</span>
                        </NavLink>
                      </p>
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

export default Signup;
