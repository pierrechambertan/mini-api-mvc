require('dotenv').config();
const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"
  if (!token) {
    return res.status(401).json({ mensagem: 'Token ausente' });
  }

  try {
    req.usuario = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ mensagem: 'Token inválido ou expirado' });
  }
};
