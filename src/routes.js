const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./app/controllers/UserController');
const UserSessionController = require('./app/controllers/UserSessionController');
const authMiddleware = require('./app/middlewares/auth');

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('Server On');
});

// #region Sessions and create users, don't use auth
routes.post(
    '/session',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        }),
    }),
    UserSessionController.store
);

routes.post(
    '/users',
    celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            cellphone: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            password_hash: Joi.string().required(),
        }),
    }),
    UserController.store
);

routes.use(authMiddleware);

// endpoints with auth
// #region Users
routes.get('/users', UserController.index);

routes.get(
    '/users/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            user_id: Joi.string().uuid().required(),
        }).unknown(),
    }),
    UserController.show
);

routes.put(
    '/users/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            user_id: Joi.string().uuid().required(),
        }).unknown(),
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            cellphone: Joi.string().required(),
            city: Joi.string().required(),
            oldPassword: Joi.string().required(),
            password_hash: Joi.string().required(),
        }),
    }),
    UserController.update
);

routes.delete(
    '/users/id',
    celebrate({
        [Segments.HEADERS]: Joi.object({
            user_id: Joi.string().uuid().required(),
        }).unknown(),
    }),
    UserController.delete
);
// #endregion

module.exports = routes;
