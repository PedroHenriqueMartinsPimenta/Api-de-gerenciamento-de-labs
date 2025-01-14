const routes = require('express').Router();
const PDFDocument = require('pdfkit');
const laboratorio = require('../models/laboratorio');
const auth = require('../middleware/AuthToken');
const mongoose = require('mongoose');

routes.post("/logar", function(req, res){
    let email = req.body.email;
    let senha = req.body.senha;
    try{
        if(email === process.env.EMAIL && senha === process.env.SENHA){
            let novoToken = jwt.sign({email}, process.env.TOKEN, {expiresIn: 9000})
            res.json({logado: true, token: novoToken})
        }else{
            res.json({logado: false, mensagem: "Dados incorretos"})
        }
    }catch(err){
        res.json({logado: false, mensagem:err})
    }

})

routes.post('/laboratorio/novo', auth, async function(req, res){
    try{
        let nome = req.body.nome;
        let desc = req.body.desc;
        let capacidade = req.body.capacidade;
        let foto = req.body.foto;

        await mongoose.connect(process.env.DB_LINK);
        await laboratorio.create({nome:nome, desc: desc, capacidade: capacidade, foto: foto});
        res.json({mensagem:"Lab cadastrado com sucesso"});

    }catch(err){
        res.json({err: err});
    }
});

routes.get("/laboratorio/relatorio", auth, async function(req, res){
    try {
        const labs = await laboratorio.find();
        const doc = new PDFDocument();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="relatorio.pdf"');

        labs.forEach(lab => {
            doc.text(`Nome: ${lab.nome}`);
            doc.text(`Descrição: ${lab.desc}`);
            doc.text(`Capacidade: ${lab.capacidade}`);
            if (lab.foto) doc.image(lab.foto, { width: 150 });
            doc.text("\n");
        });

        doc.pipe(res);
        doc.end();
    } catch (error) {
        res.status(500).send("Erro ao gerar relatório.");
    }
});

module.exports = routes;