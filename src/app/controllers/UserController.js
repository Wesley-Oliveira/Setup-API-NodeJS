const User = require('../models/User');

class UserController {
    async index(req, res) {
        const { page = 1 } = req.query;
        const users = await User.findAll({
            attributes: ['id', 'name', 'email'],
            limit: 20,
            offset: (page - 1) * 20,
        });

        return res.json(users);
    }

    async show(req, res) {
        const userId = req.headers.user_id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email'],
        });

        if (!user) {
            return res.status(404).json({ message: 'No existing users' });
        }

        return res.json(user);
    }

    async store(req, res) {
        const userExists = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists.' });
        }

        const { id, email, name } = await User.create(req.body);

        return res.json({
            id,
            email,
            name,
        });
    }

    // Atualização de usuário só pode ser feita por ele mesmo
    async update(req, res) {
        const { email, oldPassword } = req.body;
        const user = await User.findByPk(req.headers.user_id); // userId vem no payload req.userId, possibilidade de mudança

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (email !== user.email) {
            const userExists = await User.findOne({
                where: { email },
            });

            if (userExists) {
                return res.status(400).json({ error: 'User already exists.' });
            }
        }

        if (oldPassword && !(await user.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Wrong password.' });
        }

        const { id, name } = await user.update(req.body);

        return res.json({
            id,
            email,
            name,
        });
    }

    async delete(req, res) {
        const userId = req.headers.user_id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(400).json({ error: 'User does not exist.' });
        }

        await user.destroy();
        return res.status(204).send();
    }
}

module.exports = new UserController();
