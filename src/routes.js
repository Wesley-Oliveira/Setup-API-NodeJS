const { Router } = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const routes = new Router();

routes.get('/', (req, res) => {
    res.json('Initial commit');
});

module.exports = routes;
