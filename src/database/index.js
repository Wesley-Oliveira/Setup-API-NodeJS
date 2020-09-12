const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

// Variável para receber todos os models
const models = [];

class Database {
    constructor() {
        this.init();
    }

    init() {
        // Conexão do banco com os models
        this.connection = new Sequelize(databaseConfig);

        // Remover comentário quando houver relacionamento entre entidades
        /* models
            .map((model) => model.init(this.connection))
            .map(
                (model) =>
                    model.associate && model.associate(this.connection.models)
            ); */
    }
}

module.exports = new Database();
