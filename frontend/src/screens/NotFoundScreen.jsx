import React from 'react'
import { Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';


const NotFoundScreen = () => {
  return (
   <div className="d-flex align-items-center justify-content-center vh-100 bg-light text-center">
      <div>
        {/* Icon */}
        <FaExclamationTriangle className="text-warning mb-4" style={{ fontSize: '6rem' }} />

        {/* Heading */}
        <h1 className="display-1 fw-bold text-danger mb-3">404</h1>

        {/* Subheading */}
        <p className="fs-4 text-secondary mb-3">
          Oops! The page you are looking for doesn’t exist.
        </p>

        {/* Description */}
        <p className="text-muted mb-4">
          It might have been removed, had its name changed, or is temporarily unavailable.
        </p>

        {/* Back Home Button */}
        <Link
          to="/"
          className="btn btn-primary btn-lg shadow"
        >
          <FaHome className="me-2" /> Go Back Home
        </Link>
      </div>
    </div>
  )
}

export default NotFoundScreen


