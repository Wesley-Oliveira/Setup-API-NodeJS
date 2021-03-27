const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authConfig = require('../../config/authConfig');

class UserSessionController {
    async store(req, res) {
        const { email, password } = req.body;

        // Verificando se existe
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ error: 'User not exists' });
        }

        // Verificar se a senha não bate
        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Incorrect Password' });
        }

        const { id } = user;
        return res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

module.exports = new UserSessionController();
