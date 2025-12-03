const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

let livros = [];
let idCounter = 1;

app.post("/livros", (req, res) => {
  try {
    const { titulo, autor, anoPublicacao, isbn } = req.body;
    if (!titulo || !autor || !anoPublicacao || !isbn) {
      return res.status(400).json({ erro: "Todos os campos são obrigatórios" });
    }
    const novoLivro = { id: idCounter++, titulo, autor, anoPublicacao, isbn };
    livros.push(novoLivro);
    res.status(201).json(novoLivro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.get("/livros", (req, res) => {
  res.json(livros);
});

app.get("/livros/busca/titulo", (req, res) => {
  const { titulo } = req.query;
  if (!titulo) {
    return res.status(400).json({ erro: "Parâmetro 'titulo' é obrigatório" });
  }
  const livrosEncontrados = livros.filter((l) =>
    l.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
  res.json(livrosEncontrados);
});

app.get("/livros/:id", (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id);
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  res.json(livro);
});

app.put("/livros/:id", (req, res) => {
  const livro = livros.find((l) => l.id == req.params.id);
  if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
  Object.assign(livro, req.body);
  res.json(livro);
});

app.delete("/livros/:id", (req, res) => {
  const index = livros.findIndex((l) => l.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ erro: "Livro não encontrado" });
  const removido = livros.splice(index, 1);
  res.json({ mensagem: "Livro removido", livro: removido[0] });
});

app.listen(PORT, () => {
  console.log(`✓ Servidor de TESTE rodando na porta ${PORT}`);
});
