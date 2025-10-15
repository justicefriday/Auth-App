import React, { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Spinners from '../components/Spinners';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) navigate('/');
  }, [navigate, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="container-fluid bg-light d-flex align-items-center justify-content-center min-vh-100">
      <div
        className="card border-0 shadow-lg p-4 p-md-5 rounded-4"
        style={{ maxWidth: '420px', width: '100%' }}
      >
        <div className="text-center mb-4">
          <FaSignInAlt className="text-primary" style={{ fontSize: '3rem' }} />
          <h3 className="fw-bold text-dark mt-3">Welcome Back</h3>
          <p className="text-muted">Login to access your account</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="email"
              id="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating mb-4">
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          {isLoading && <Spinners />}

          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-pill"
          >
            Sign In
          </button>

          <div className="text-center mt-3">
            <small className="text-muted">
              Don’t have an account?{' '}
              <Link to="/register" className="text-primary text-decoration-none fw-semibold">
                Register
              </Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
