import request from 'supertest';
import app, { API_VERSION } from "../index";
import server from "../index";

const agent = request(app);

describe('TodoItems API', () => {
    let createdUserId: string;
    let createdTaskListId: string;
    let createdTodoItemId: string;

    beforeAll(async () => {
        const userResponse = await agent
            .post(`/api/${API_VERSION}/users`)
            .send({
                username: 'testuser',
                password: 'testpassword',
                firstName: 'first',
                lastName: 'last',
                email: 'johndoe@example.com',
            });
        createdUserId = userResponse.body.data.id;

        const taskListResponse = await agent
            .post(`/api/${API_VERSION}/tasklists`)
            .send({
                name: 'Test Task List',
                userId: createdUserId,
            });
        createdTaskListId = taskListResponse.body.data.id;
    });

    afterAll(async () => {
        if (createdTaskListId) {
            await agent.delete(`/api/${API_VERSION}/tasklists/${createdTaskListId}`);
        }
        if (createdUserId) {
            await agent.delete(`/api/${API_VERSION}/users/${createdUserId}`);
        }
    });

    it('should create a new todo item', async () => {
        const response = await agent
            .post(`/api/${API_VERSION}/todoitems`)
            .send({
                title: 'Test Todo Item',
                content: 'This is a test todo item',
                dueDate: '2023-06-01T00:00:00.000Z',
                taskListId: createdTaskListId,
            });

        expect(response.status).toBe(201);
        expect(response.body.data.title).toEqual('Test Todo Item');
        expect(response.body.data.content).toEqual('This is a test todo item');
        expect(response.body.data.dueDate).toEqual('2023-06-01T00:00:00.000Z');
        expect(response.body.data.taskListId).toEqual(createdTaskListId);

        createdTodoItemId = response.body.data.id;
    });

    it('should retrieve a list of todo items', async () => {
        const response = await agent.get(`/api/${API_VERSION}/todoitems`);

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it('should update a todo item by ID', async () => {
        const response = await agent
            .put(`/api/${API_VERSION}/todoitems/${createdTodoItemId}`)
            .send({
                title: 'Updated Todo Item',
                content: 'This is an updated test todo item',
                dueDate: '2023-06-02T00:00:00.000Z',
    });

        expect(response.status).toBe(200);
        expect(response.body.data.id).toEqual(createdTodoItemId);
        expect(response.body.data.title).toEqual('Updated Todo Item');
        expect(response.body.data.content).toEqual('This is an updated test todo item');
        expect(response.body.data.dueDate).toEqual('2023-06-02T00:00:00.000Z');
        expect(response.body.data.taskListId).toEqual(createdTaskListId);
    });

    it('should delete a todo item by ID', async () => {
        const response = await agent.delete(`/api/${API_VERSION}/todoitems/${createdTodoItemId}`);
        expect(response.status).toBe(204);
    });

    afterAll(async () => {
        server.close();
    });

});