import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

import User from '../modules/userModule.js';

// Middleware to protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      // Verify the token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to request
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed or expired');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token found');
  }
});

export { protect };
