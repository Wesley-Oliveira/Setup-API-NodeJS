module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.sequelize
            .query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
            .then(() => {
                return queryInterface.createTable('user', {
                    id: {
                        allowNull: false,
                        primaryKey: true,
                        type: Sequelize.DataTypes.UUID,
                        defaultValue: Sequelize.literal('uuid_generate_v4()'),
                    },
                    email: {
                        type: Sequelize.STRING,
                        unique: true,
                        allowNull: false,
                    },
                    password: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    name: {
                        type: Sequelize.STRING,
                        allowNull: false,
                    },
                    created_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                    updated_at: {
                        type: Sequelize.DATE,
                        allowNull: false,
                    },
                });
            });
    },

    down: async (queryInterface) => {
        return queryInterface.dropTable('user');
    },
};
