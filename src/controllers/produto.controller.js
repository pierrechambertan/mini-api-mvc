/**
 * Controller de produtos – lógica de negócio.
 * Interage somente com o repository.
 */
const repo = require('../repositories/produto.repo');

/**
 * GET /produtos
 */
exports.listar = async (_req, res) => {
  const produtos = await repo.findAll();
  res.json(produtos);
};

/**
 * POST /produtos
 */
exports.criar = async (req, res) => {
  const novo = await repo.create(req.body);
  res.status(201).json(novo);
};

/**
 * PUT /produtos/:id
 */
exports.atualizar = async (req, res) => {
  const id = Number(req.params.id);
  const atualizado = await repo.update(id, req.body);

  if (!atualizado) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  res.json(atualizado);
};

/**
 * DELETE /produtos/:id
 */
exports.deletar = async (req, res) => {
  const id = Number(req.params.id);
  const ok = await repo.remove(id);

  if (!ok) {
    return res.status(404).json({ mensagem: 'Produto não encontrado' });
  }
  res.status(204).send();
};
