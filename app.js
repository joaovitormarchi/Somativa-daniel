const express = require("express");
const mongoose = require("mongoose");
const Livro = require("./models/Livro");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/biblioteca";

app.use(express.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✓ MongoDB conectado"))
  .catch((err) => console.error("✗ Erro MongoDB:", err.message));

app.post("/livros", async (req, res) => {
  try {
    const livro = new Livro(req.body);
    await livro.save();
    res.status(201).json(livro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});

app.get("/livros", async (req, res) => {
  try {
    const livros = await Livro.find();
    res.json(livros);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/livros/busca/titulo", async (req, res) => {
  const { titulo } = req.query;
  if (!titulo) {
    return res.status(400).json({ erro: "Parâmetro 'titulo' é obrigatório" });
  }
  try {
    const livrosEncontrados = await Livro.find({
      titulo: { $regex: titulo, $options: "i" },
    });
    res.json(livrosEncontrados);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.get("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findById(req.params.id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(livro);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});
app.put("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json(livro);
  } catch (err) {
    res.status(400).json({ erro: err.message });
  }
});
app.delete("/livros/:id", async (req, res) => {
  try {
    const livro = await Livro.findByIdAndDelete(req.params.id);
    if (!livro) return res.status(404).json({ erro: "Livro não encontrado" });
    res.json({ mensagem: "Livro removido" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✓ Servidor rodando na porta ${PORT}`);
});
