🎓 Sistema de Gerenciamento de Salas
Bem-vindo ao Sistema de Gerenciamento de Salas! Este é um projeto que utiliza Node.js, Express e MongoDB para gerenciar laboratórios e salas de aula de maneira eficiente e segura. 🚀

📝 Funcionalidades
🔐 Autenticação JWT: Rota para login e geração de token para acesso às funcionalidades da API.
🏢 Cadastro de Laboratórios: Criação de novos laboratórios com informações detalhadas e upload de foto.
📆 Controle de Acesso: Restrição de uso da API apenas em dias úteis (segunda a sexta).
📄 Relatório em PDF: Geração de um relatório completo com a lista de laboratórios, incluindo fotos.
☁️ Hospedagem em Nuvem: API disponível externamente no Vercel.
✅ Testes Automatizados: Cobertura de testes utilizando Jest e Supertest.
🚀 Tecnologias Utilizadas
Node.js e Express para o backend.
MongoDB para banco de dados.
JSON Web Token (JWT) para autenticação.
Multer para upload de imagens.
PDFKit para geração de relatórios.
Jest e Supertest para testes automatizados.
🛠️ Instalação e Configuração
1️⃣ Clone o Repositório
git clone https://github.com/jhonatan-goncalves-pereira/api-gerenciamento-salas.git
cd gerenciamento-de-salas
2️⃣ Instale as Dependências
npm install
3️⃣ Configure o Ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis:

PORT=3000
MONGO_URI=sua_url_mongodb
JWT_SECRET=sua_chave_secreta
4️⃣ Inicie o Servidor
npm start
A API estará disponível em: http://localhost:3000 🌐

📚 Documentação da API
🔐 POST /logar
Autentica um usuário e retorna um token válido.

Exemplo de Request:

{
    "email": "usuario@exemplo.com",
    "senha": "senha123"
}
Exemplo de Response:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI..."
}
🏢 POST /laboratorio/novo
Cadastra um novo laboratório.

Request Body (form-data):

nome (string): Nome do laboratório.
descricao (string): Descrição do laboratório.
capacidade (number): Capacidade máxima.
foto (file): Upload da imagem do laboratório.
📄 GET /laboratorio/relatorio
Gera um arquivo PDF com a lista de todos os laboratórios.

Response: O arquivo PDF será baixado automaticamente.

🚧 Testes Automatizados
Para rodar os testes, use o comando:

npm test
Exemplo de teste de sucesso:

it('Deve retornar um token válido ao logar', async () => {
    const res = await request(app).post('/logar').send({
        email: 'usuario@exemplo.com',
        senha: 'senha123',
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
});
