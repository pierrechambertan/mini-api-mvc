const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const erros = validationResult(req);
  if (!erros.isEmpty()) {
    return res.status(422).json({ erros: erros.array() });
  }
  next();
};
