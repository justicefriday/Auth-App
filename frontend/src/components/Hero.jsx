import React from 'react';
import { Link } from 'react-router-dom';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Hero = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <section
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        height: '100vh',
        background: 'linear-gradient(135deg, #2563eb, #1e3a8a)',
        color: 'white',
        padding: '0 20px',
        marginTop: '30px', // Prevent overlap with fixed navbar
      }}
    >
      {userInfo ? (
        <div className="container">
          <h1 className="display-5 fw-bold mb-3 animate__animated animate__fadeInDown">
            Welcome, {userInfo.name}! 👋
          </h1>
          <p className="lead mb-5">
            Manage your account securely and access all your personalized features.
          </p>
          <Link
            to="/profile"
            className="btn btn-light btn-lg px-4 py-2 fw-semibold rounded-pill"
          >
            Go to Profile
          </Link>
        </div>
      ) : (
        <div className="container">
          <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
            Welcome to AuthApp
          </h1>
          <p className="lead mb-5">
            A modern authentication system — simple, fast, and secure.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link
              to="/login"
              className="btn btn-light btn-lg d-flex align-items-center rounded-pill px-4 py-2 fw-semibold"
            >
              <FaSignInAlt className="me-2" /> Login
            </Link>
            <Link
              to="/register"
              className="btn btn-outline-light btn-lg d-flex align-items-center rounded-pill px-4 py-2 fw-semibold"
            >
              <FaUserPlus className="me-2" /> Register
            </Link>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
