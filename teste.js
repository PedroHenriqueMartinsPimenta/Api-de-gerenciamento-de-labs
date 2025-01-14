const request = require('supertest');
const app = require('./app'); 

describe('Testando rotas do aplicativo', () => {
  
  describe('POST /logar', () => {
    it('Deve retornar status 200 e um token válido ao logar com sucesso', async () => {
      const response = await request(app)
        .post('/logar')
        .send({ email: 'teste@teste.com', senha: '123456' });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('Deve retornar status 401 ao falhar no login', async () => {
      const response = await request(app)
        .post('/logar')
        .send({ email: 'usuario', senha: 'senha_errada' });

      expect(response.status).toBe(401);
      expect(response.body).toHaveProperty('message', 'Credenciais inválidas');
    });
  });

  describe('POST /laboratorio/novo', () => {
    it('Deve retornar status 201 e os dados do novo laboratório ao criar com sucesso', async () => {
      const laboratorioData = {
        nome: 'Laboratório A',
        desc: 'Rua Exemplo, 123',
        capacidade: 21,
        foto: 'img',
      };

      const response = await request(app)
        .post('/laboratorio/novo')
        .send(laboratorioData);

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.nome).toBe(laboratorioData.nome);
      expect(response.body.endereco).toBe(laboratorioData.endereco);
    });

    it('Deve retornar status 400 ao faltar dados obrigatórios', async () => {
      const response = await request(app)
        .post('/laboratorio/novo')
        .send({ nome: 'Laboratório Incompleto' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('message', 'Dados obrigatórios ausentes');
    });
  });

  describe('GET /laboratorio/relatorio', () => {
    it('Deve retornar status 200 e um relatório de laboratórios', async () => {
      const response = await request(app).get('/laboratorio/relatorio');

      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
      expect(response.body.length).toBeGreaterThan(0);
    });

    it('Deve retornar status 404 se não houver dados no relatório', async () => {
      const response = await request(app).get('/laboratorio/relatorio');

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('message', 'Nenhum dado encontrado');
    });
  });

});
