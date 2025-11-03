const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 80;

// Configurar EJS como view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar body-parser para processar formulários
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Array para armazenar usuários (simulação de banco de dados)
var usuarios = [];

// Rota padrão '/' direciona para projects.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Rota GET /cadastra - serve a página de cadastro
app.get('/cadastra', (req, res) => {
    res.sendFile(path.join(__dirname, 'Cadastro.html'));
});

// Rota POST /cadastra - processa o cadastro
app.post('/cadastra', (req, res) => {
    const { nome, email, senha } = req.body;
    
    // Verificar se o email já existe
    const usuarioExistente = usuarios.find(u => u.email === email);
    
    if (usuarioExistente) {
        return res.render('resposta', {
            status: 'erro',
            mensagem: 'Email já cadastrado!',
            nome: nome,
            email: email
        });
    }
    
    // Criar novo usuário
    const novoUsuario = {
        nome: nome,
        email: email,
        senha: senha
    };
    
    usuarios.push(novoUsuario);
    
    // Redirecionar para login após cadastro
    res.redirect('/login');
});

// Rota GET /login - serve a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'Login.html'));
});

// Rota POST /login - processa o login
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
    
    // Buscar usuário no array
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    
    if (usuario) {
        // Login bem-sucedido
        res.render('resposta', {
            status: 'sucesso',
            nome: usuario.nome,
            email: usuario.email,
            mensagem: 'Login realizado com sucesso!'
        });
    } else {
        // Login falhou
        res.render('resposta', {
            status: 'erro',
            mensagem: 'Email ou senha incorretos!',
            email: email
        });
    }
});

// Rota para Home.html (redireciona para index.html)
app.get('/Home.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para Project.html (redireciona para projects.html)
app.get('/Project.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Rota para Projects.html
app.get('/Projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Rota para projects.html
app.get('/projects.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'projects.html'));
});

// Rota para guess.html
app.get('/guess.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'guess.html'));
});

// Rota para canvas.html
app.get('/canvas.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'canvas.html'));
});

// Rota para animation.html
app.get('/animation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'animation.html'));
});

// Rota para index.html
app.get('/index.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Servir arquivos estáticos (HTML, CSS, imagens, etc.) - DEPOIS das rotas específicas
app.use(express.static(__dirname));

// Iniciar o servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log(`Acesse: http://localhost:${PORT}`);
    console.log(`Para acessar de outros computadores na rede, use o IP desta máquina`);
    console.log(`Exemplo: http://<IP>:${PORT}/Home.html`);
    console.log(`Use o comando 'ipconfig' no Windows para descobrir o IP`);
}).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Erro: Porta ${PORT} já está em uso!`);
        console.error('Tente encerrar o processo que está usando a porta ou use outra porta.');
    } else {
        console.error('Erro ao iniciar o servidor:', err);
    }
    process.exit(1);
});
