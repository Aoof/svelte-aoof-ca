import jwt from 'jsonwebtoken';

export default function(req, res, next) {
    const token = req.header('x-auth-token');
  
    if (!token) {
      return res.status(401).json({ msg: 'No token, authorization denied' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);  
      req.user = decoded.user;

      let rajCondition = req.isRaj && ["admin", "teacher"].includes(req.user.role);
      let nonRajCondition = !req.isRaj && req.user.role && ["admin", "teacher"].includes(req.user.role);

      if (rajCondition || nonRajCondition) {
        return res.status(401).json({ msg: 'Not authorized' });
      }

      next();
    } catch (err) {
      res.status(401).json({ msg: 'Token is not valid' });
    }
  };
  