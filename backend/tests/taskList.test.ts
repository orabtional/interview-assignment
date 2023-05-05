import request from 'supertest';
import app, { API_VERSION } from "../index";
import server from '../index';

const agent = request(app);


describe('TaskList API', () => {
    let createdUsertId: string;
    let createdTaskListId: string;

    it('create a new user', async () => {
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
        createdUsertId = response.body.data.id;
    });

    it('should create a new task list', async () => {
        const response = await agent
            .post(`/api/${API_VERSION}/tasklists`)
            .send({
                name: 'Test Task List',
                userId: createdUsertId,
            });

        expect(response.status).toBe(201);
        expect(response.body.data.name).toEqual('Test Task List');
        expect(response.body.data.userId).toEqual(createdUsertId);

        createdTaskListId = response.body.data.id;
    });


    // Test for GET /tasklists
    it('should retrieve a list of task lists for a user', async () => {
        const response = await agent
            .get(`/api/${API_VERSION}/tasklists`)
            .query({ userId: '12345' });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    // Test for GET /tasklists/:id
    it('should retrieve a task list by ID', async () => {
        const response = await agent.get(`/api/${API_VERSION}/tasklists/${createdTaskListId}`);

        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual(createdTaskListId);
        expect(response.body.data.name).toEqual('Test Task List');
        expect(response.body.data.userId).toEqual(createdUsertId);
    });

    // Test for PUT /tasklists/:id
    it('should update a task list by ID', async () => {
        const response = await agent
            .put(`/api/${API_VERSION}/tasklists/${createdTaskListId}`)
            .send({
                name: 'Updated Task List',
            });

        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual(createdTaskListId);
        expect(response.body.data.name).toEqual('Updated Task List');
        expect(response.body.data.userId).toEqual(createdUsertId);
    });

    // Test for DELETE /tasklists/:id
    it('should delete a task list by ID', async () => {
        const response = await agent.delete(`/api/${API_VERSION}/tasklists/${createdTaskListId}`);
        expect(response.status).toBe(204);
    });

    // Test for GET /tasklists/:id after deletion
    it('should return 404 for deleted task list', async () => {
        await agent.delete(`/api/${API_VERSION}/tasklists/${createdTaskListId}`);
        const response = await agent.get(`/api/${API_VERSION}/tasklists/${createdTaskListId}`);
        expect(response.body.data).toBe(null);
    });

    afterAll(async () => {
        if (createdUsertId) {
            await agent.delete(`/api/${API_VERSION}/users/${createdUsertId}`);
        }
        server.close();
    });

});
