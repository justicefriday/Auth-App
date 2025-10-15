import jwt from 'jsonwebtoken';

const generateToken = (res, id) => {
  // Generate the JWT
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Attach the token as a secure HttpOnly cookie
  res.cookie('jwt', token, {
    httpOnly: true, // prevent JS access (protects against XSS)
    secure: process.env.NODE_ENV === 'production', // use HTTPS in production
    sameSite: 'strict', // prevent CSRF
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token; 
};

export default generateToken;