import request from 'supertest';
import app, { API_VERSION } from '../index';
import server from "../index";

const agent = request(app);

describe('User API', () => {
    let createdUserId: string;

    it('should create a new user', async () => {
        const response = await agent
            .post(`/api/${API_VERSION}/users`)
            .send({
                username: 'testuser',
                password: 'testpassword',
                firstName: 'first',
                lastName: 'last',
                email: 'johndoe@example.com',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty(['data', 'id']);
        expect(response.body.data.username).toEqual('testuser');
        expect(response.body.data.firstName).toEqual('first');
        expect(response.body.data.lastName).toEqual('last');
        expect(response.body.data.email).toEqual('johndoe@example.com');
        createdUserId = response.body.data.id;
    });

    it('should authenticate and log in the user', async () => {
        const response = await agent
            .post(`/api/${API_VERSION}/users/login`)
            .send({
                username: 'testuser',
                password: 'testpassword',
            });

        expect(response.status).toBe(200);
        expect(response.body.data).toHaveProperty('id');
        expect(response.body.data).toHaveProperty('username');
        expect(response.body.data).toHaveProperty('firstName');
        expect(response.body.data).toHaveProperty('lastName');
        expect(response.body.data).toHaveProperty('email');
        expect(response.body.data.username).toEqual('testuser');
        expect(response.body.data.firstName).toEqual('first');
        expect(response.body.data.lastName).toEqual('last');
        expect(response.body.data.email).toEqual('johndoe@example.com');
    });


    it('should retrieve a list of users', async () => {
        const response = await agent.get(`/api/${API_VERSION}/users`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should retrieve a user by ID', async () => {
        const response = await agent.get(`/api/${API_VERSION}/users/${createdUserId}`);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual(createdUserId);
        expect(response.body.data.username).toEqual('testuser');
        expect(response.body.data.firstName).toEqual('first');
        expect(response.body.data.lastName).toEqual('last');
        expect(response.body.data.email).toEqual('johndoe@example.com');
    });

    it('should update a user by ID', async () => {
        const response = await agent
            .put(`/api/${API_VERSION}/users/${createdUserId}`)
            .send({
                username: 'updateduser',
                firstName: 'updatedfirst',
                lastName: 'updatedlast',
                email: 'updatedjohndoe@example.com',
            });

        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual(createdUserId);
        expect(response.body.data.username).toEqual('updateduser');
        expect(response.body.data.firstName).toEqual('updatedfirst');
        expect(response.body.data.lastName).toEqual('updatedlast');
        expect(response.body.data.email).toEqual('updatedjohndoe@example.com');
    });

    it('should delete a user by ID', async () => {
        const response = await agent.delete(`/api/${API_VERSION}/users/${createdUserId}`);
        expect(response.status).toBe(204);
    });

    it('should return 404 for deleted user', async () => {
        await agent.delete(`/api/${API_VERSION}/users/${createdUserId}`);
        const response = await agent.get(`/api/${API_VERSION}/users/${createdUserId}`);
        expect(response.body.data).toBe(null);
    });

    afterAll(async () => {
        server.close();
    });

});
