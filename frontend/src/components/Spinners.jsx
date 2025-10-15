// Spinner.jsx
import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap'; // ✅ Correct import

const Spinners = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100px' }}
    >
      <BootstrapSpinner
        animation="border"
        role="status"
        style={{
          width: '3rem',
          height: '3rem',
          margin: 'auto',
          display: 'block',
        }}
      >
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinners;
