const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

function authMiddleware(req, res, next) {
  const token = req.header("Authorization")?.split(' ')[1];

  if(!token) 
        return res.status(401).json({ success: false, message: 'No Token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded.id) 
      return res.status(401).json({ success: false, message: 'Invalid token payload' });
    
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Invalid Token' });
  }
}

module.exports = authMiddleware;
