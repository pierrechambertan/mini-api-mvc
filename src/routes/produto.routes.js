const express = require('express');
const { body } = require('express-validator');

const router   = express.Router();
const ctrl     = require('../controllers/produto.controller');
const validate = require('../middlewares/validate');
const authJwt  = require('../middlewares/authJwt');

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: API para gerenciamento de produtos
 */

/**
 * @swagger
 * /produtos:
 *   get:
 *     summary: Lista todos os produtos
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       200:
 *         description: Lista de produtos
 */
router.get('/', authJwt, ctrl.listar);

/**
 * @swagger
 * /produtos:
 *   post:
 *     summary: Cria um novo produto
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco]
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       201:
 *         description: Produto criado
 *       422:
 *         description: Dados inválidos
 */
router.post('/',
  authJwt,
  [ body('nome').notEmpty(), body('preco').isNumeric() ],
  validate,
  ctrl.criar
);

/**
 * @swagger
 * /produtos/{id}:
 *   put:
 *     summary: Atualiza um produto
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, preco]
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Produto atualizado
 *       404:
 *         description: Não encontrado
 */
router.put('/:id',
  authJwt,
  [ body('nome').notEmpty(), body('preco').isNumeric() ],
  validate,
  ctrl.atualizar
);

/**
 * @swagger
 * /produtos/{id}:
 *   delete:
 *     summary: Remove um produto
 *     tags: [Produtos]
 *     security: [{ bearerAuth: [] }]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Produto removido
 *       404:
 *         description: Não encontrado
 */
router.delete('/:id', authJwt, ctrl.deletar);

module.exports = router;
