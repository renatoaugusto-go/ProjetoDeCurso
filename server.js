const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000; 

// Configuração do CORS para permitir o frontend específico
const corsOptions = {
    origin: 'https://renatoaugusto-go.github.io', // Permite requisições apenas deste site
    methods: 'GET,POST', // Métodos permitidos
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions)); // Middleware principal de CORS

// Permite requisições preflight (importante para o navegador validar permissões antes da requisição real)
app.options('*', cors(corsOptions));

// Middleware para aceitar JSON
app.use(express.json());

// Conectar ao MongoDB usando o link de conexão fornecido
const uri = 'mongodb+srv://renatosantos36:2t9s1qGOojyShgs7@projetocluster.i1z4e.mongodb.net/?retryWrites=true&w=majority&appName=ProjetoCluster';

let db;

// Conectar ao MongoDB
const client = MongoClient.connect(uri)
client.then((client) => {
    db = client.db('businesspro');  // Acessa o banco de dados padrão
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB:', error);
});

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, mundo! Conectado ao MongoDB!');
});

// Rota para adicionar um usuário
app.post('/add-user', async (req, res) => {
    const { nome, empresa, email, senha } = req.body;

    try {
        if (!nome || !empresa || !email || !senha) {
            return res.status(400).json({ message: 'Nome, empresa, email e senha são obrigatórios' });
        }

        const usersCollection = db.collection('usuarios');

        // Verifica se o e-mail já existe no banco de dados
        const existingUser = await usersCollection.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ message: 'E-mail já cadastrado' }); // Código 409 = Conflito
        }

        const newUser = { nome, empresa, email, senha };
        const result = await usersCollection.insertOne(newUser);

        console.log('Usuário inserido:', result);
        res.status(201).json(result);

    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).json({ message: 'Erro ao adicionar usuário', error: error.message });
    }
});

// Rota para login
app.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        if (!email || !senha) {
            return res.status(400).json({ message: 'Email e senha são obrigatórios' });
        }

        const usersCollection = db.collection('usuarios');
        const existingUser = await usersCollection.findOne({ email });

        if(existingUser) {

            if(existingUser.senha == senha) {
                console.log('Usuário logado:', email);
                return res.status(201).json(email);
            } else {
                return res.status(409).json({ message: 'Senha incorreta' });
            }

        } else {
            return res.status(404).json({ message: 'E-mail não cadastrado' });
        }
        
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
    }
});


// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
