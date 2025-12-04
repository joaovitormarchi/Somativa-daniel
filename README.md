Projeto de backend que implementa uma API para gerenciar livros de uma biblioteca. Inclui autenticação JWT, operações CRUD básicas e documentação mínima para testes com Insomnia.

**Principais funcionalidades**

- Adicionar livro (protegido)
- Remover livro por ISBN (protegido)
- Listar livros
- Buscar livro por título (busca parcial)
- Registro e login de usuários (JWT)

**Pré-requisitos**

- Node.js 16+
- MongoDB em execução local ou remoto

Instalação

```powershell
cd "t:/joao marchi/Somativa-daniel-pt2"
npm install
cp .env.example .env
npm run dev
```

Rotas principais

- `POST /api/auth/register` — registra um usuário
- `POST /api/auth/login` — obtém token JWT
- `GET /api/livros` — lista todos os livros
- `GET /api/livros/buscar?titulo=` — busca parcial por título
- `POST /api/livros` — adiciona livro (precisa header `Authorization: Bearer <token>`)
- `DELETE /api/livros/:isbn` — remove livro por ISBN (precisa token)

Testes manuais

Use a coleção `insomnia_collection.json` fornecida ou configure requisições no Insomnia/Postman. Primeiro registre um usuário, faça login para obter o token e insira o header `Authorization` nas rotas protegidas.

Documentação adicional em `docs/api.md`.
