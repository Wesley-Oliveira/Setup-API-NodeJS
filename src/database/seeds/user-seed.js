module.exports = {
    up: (queryInterface, Sequelize) =>
        queryInterface.bulkInsert(
            'user',
            [
                {
                    name: 'Teste teste',
                    email: 'test@test.com',
                    password: 'senha',
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        ),

    down: (queryInterface) => queryInterface.bulkDelete('user', null, {}),
};
