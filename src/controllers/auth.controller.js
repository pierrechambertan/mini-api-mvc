require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Controller de autenticação.
 * Credenciais fixas: admin@admin.com / 123456
 */
exports.login = (req, res) => {
  const { email, senha } = req.body;

  if (email !== 'admin@admin.com' || senha !== '123456') {
    return res.status(401).json({ mensagem: 'Credenciais inválidas' });
  }

  // Gera token válido por 2 horas
  const token = jwt.sign({ id: 1, email }, process.env.JWT_SECRET, {
    expiresIn: '2h'
  });

  res.json({ token });
};
