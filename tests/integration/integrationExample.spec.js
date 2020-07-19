/* eslint-disable no-undef */
const request = require('supertest');
const app = require('../../src/app');

describe('Example', () => {
    it('Get route test', () => {
        const response = request(app).get('/');
        expect(response.ok);
    });
});
