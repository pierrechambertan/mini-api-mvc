const fs   = require('fs').promises;
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'db.json');

// Helpers
const readDB  = async () => JSON.parse(await fs.readFile(dbPath, 'utf8'));
const writeDB = async (db) => fs.writeFile(dbPath, JSON.stringify(db, null, 2));

// CRUD
exports.findAll = async () => (await readDB()).produtos;

exports.findById = async (id) => {
  const { produtos } = await readDB();
  return produtos.find(p => p.id === id);
};

exports.create = async (produto) => {
  const db = await readDB();
  const nextId = db.produtos.length ? Math.max(...db.produtos.map(p => p.id)) + 1 : 1;
  const novo = { id: nextId, ...produto };
  db.produtos.push(novo);
  await writeDB(db);
  return novo;
};

exports.update = async (id, dados) => {
  const db = await readDB();
  const idx = db.produtos.findIndex(p => p.id === id);
  if (idx === -1) return null;
  db.produtos[idx] = { id, ...dados };
  await writeDB(db);
  return db.produtos[idx];
};

exports.remove = async (id) => {
  const db = await readDB();
  const idx = db.produtos.findIndex(p => p.id === id);
  if (idx === -1) return false;
  db.produtos.splice(idx, 1);
  await writeDB(db);
  return true;
};
