import express from 'express';
import asyncHandler from 'express-async-handler';
import User from '../modules/userModule.js';
import bcrypt from 'bcryptjs';
import generateToken from '../utils/generateToken.js';
// @desc Register a new user
// @route POST /api/users
// @access Public
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Please fill all the fields');
  }

  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(res, user._id); // Attach cookie
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// @desc Authenticate user / Set token
// @route POST /api/users/auth
// @access Public
export const authUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }); // Fixed "user" → "User"
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(res, user._id); // Attach cookie
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid credentials');
  }
});

// @desc Logout user
// @route POST /api/users/logout
// @access Public
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0), // Expire immediately
  });
  res.status(200).json({ message: 'User logged out successfully' });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
export const getUserProfile = asyncHandler(async (req, res, next) => {
    const user = {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    }
    res.status(200).json(user)
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id); // assuming auth middleware sets req.user
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    const token = generateToken(res, updatedUser._id); // Refresh cookie
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});
