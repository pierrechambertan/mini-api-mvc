require('dotenv').config();           // carrega .env

const express   = require('express');
const morgan    = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swagger   = require('./src/docs/swagger'); // vamos criar mais tarde

const app = express();

// Middlewares globais
app.use(express.json());  // parse JSON
app.use(morgan('dev'));   // logs coloridos

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagger));

// Rotas (iremos criar depois)
app.use('/produtos', require('./src/routes/produto.routes'));
app.use('/',          require('./src/routes/auth.routes'));

// Porta via .env ou 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀  Servidor rodando em http://localhost:${PORT}`);
});
