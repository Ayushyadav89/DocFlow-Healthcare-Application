import jwt from 'jsonwebtoken'

// user authentication middleware
const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Not Authorized. Please login again.' });
  }

  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

   console.log('req:', req);
    req.user = { id: decoded.id };
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log('JWT verification error:', error.message);
    res.status(401).json({ success: false, message: error.message });
  }
};

export default authUser;
