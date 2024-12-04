const express = require("express");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 3000;

// Configurar o Body Parser para aceitar JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servindo arquivos estáticos
app.use(express.static("public")); // Para arquivos como CSS e JS
app.use(express.static("pages"));  // Para arquivos HTML

// Chave secreta para JWT
const JWT_SECRET = "secreta_chave_jwt";

// Banco de dados SQLite
const db = new sqlite3.Database("./database/database.db", (err) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err.message);
  } else {
    console.log("Conexão com o banco de dados SQLite estabelecida.");
  }
});

// Criar tabela de usuários
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
  )`);
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS reclamacoes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data_ocorrencia DATE NOT NULL,
    hora_ocorrencia TIME NOT NULL
  )`);
});

// Rota para salvar nova reclamação
app.post("/nova-reclamacao", (req, res) => {
  const { titulo, descricao, data, hora } = req.body;

  if (!titulo || !descricao || !data || !hora) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  const query = `
    INSERT INTO reclamacoes (titulo, descricao, data_ocorrencia, hora_ocorrencia)
    VALUES (?, ?, ?, ?)
  `;
  const params = [titulo, descricao, data, hora];

  db.run(query, params, function (err) {
    if (err) {
      console.error("Erro ao inserir reclamação:", err.message);
      return res.status(500).json({ success: false, message: "Erro ao salvar a reclamação." });
    }
    res.json({ success: true, message: "Reclamação salva com sucesso!", id: this.lastID });
  });
});

// Rota para o cadastro de usuário
app.post("/cadastro", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  // Criptografar a senha
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao criptografar a senha." });
    }

    // Inserir no banco de dados
    const stmt = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    stmt.run(name, email, hashedPassword, function (err) {
      if (err) {
        if (err.message.includes("UNIQUE constraint failed")) {
          return res.status(400).json({ success: false, message: "Email já cadastrado." });
        }
        return res.status(500).json({ success: false, message: "Erro ao salvar usuário." });
      }

      res.status(200).json({ success: true, message: "Usuário cadastrado com sucesso!" });
    });
    stmt.finalize();
  });
});

// Rota para login de usuário
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Todos os campos são obrigatórios." });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao acessar o banco de dados." });
    }

    if (!row) {
      return res.status(400).json({ success: false, message: "Usuário não encontrado." });
    }

    bcrypt.compare(password, row.password, (err, result) => {
      if (err || !result) {
        return res.status(400).json({ success: false, message: "Senha incorreta." });
      }

      const token = jwt.sign({ id: row.id, email: row.email }, JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({
        success: true,
        message: "Login bem-sucedido!",
        token,
        userName: row.name, // Adiciona o nome do usuário na resposta
      });
    });
  });
});




// Rota para verificar credenciais sem o uso de JWT
app.post("/verificar-login", (req, res) => {
  const { email, senha } = req.body;

  // Verificação no banco de dados
  db.get("SELECT * FROM users WHERE email = ? AND password = ?", [email, senha], (err, row) => {
    if (err) {
      console.error("Erro ao verificar credenciais:", err);
      return res.status(500).json({ message: "Erro interno no servidor." });
    }

    if (row) {
      res.status(200).json({ message: "Login bem-sucedido!" });
    } else {
      res.status(401).json({ message: "E-mail ou senha incorretos." });
    }
  });
});

// Rota para salvar categoria no banco de dados
app.post("/salvar-categoria", (req, res) => {
  const { categoria } = req.body;

  if (!categoria) {
    return res.status(400).json({ success: false, message: "Categoria não fornecida." });
  }

  // Inserir a categoria no banco de dados
  const stmt = db.prepare("INSERT INTO Reclamacoes (categoria) VALUES (?)");
  stmt.run(categoria, function (err) {
    if (err) {
      return res.status(500).json({ success: false, message: "Erro ao salvar categoria." });
    }

    res.status(200).json({ success: true, message: "Categoria salva com sucesso!", id: this.lastID });
  });
  stmt.finalize();
});


// Rota protegida (exemplo)
app.get("/dashboard", (req, res) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ success: false, message: "Acesso negado. Nenhum token fornecido." });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).json({ success: false, message: "Falha na autenticação do token." });
    }

    res.status(200).json({ success: true, message: `Bem-vindo ao dashboard, ${decoded.email}!` });
  });
});

// Inicialize o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
