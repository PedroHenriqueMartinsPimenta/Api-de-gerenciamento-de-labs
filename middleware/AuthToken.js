const jwt = require('jsonwebtoken');

const mid = (req, res, next) => {
    const token = req.body.token
    if (!token) {
        res.json({logado: false, mensagem: 'Token não foi enviado.'})
    }
    jwt.verify(token, process.env.TOKEN, (err, decoded) => {
        if (err) {
            res.json({locado: false, mensagem: 'Falha na autenticação'})
        }
    })
    next()
}

module.exports = mid;