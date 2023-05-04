import app, {API_VERSION} from "../index";
import request from 'supertest';

describe('TaskList API', () => {
    let createdUsertId: string;
    let createdTaskListId: string;

    it('create a new user', async () => {
        const response = await request(app)
            .post(`api/${API_VERSION}/users`)
            .send({
                username: 'testuser',
                password: 'testpassword',
                firstName: 'first',
                lastName: 'last',
                email: 'johndoe@example.com',
            });

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toEqual('testuser');
        expect(response.body.firstName).toEqual('first');
        expect(response.body.lastName).toEqual('last');
        expect(response.body.email).toEqual('email@example.com');
        createdUsertId = response.body.id;
    });

    it('should create a new task list', async () => {
        const response = await request(app)
            .post(`api/${API_VERSION}/tasklists`)
            .send({
                name: 'Test Task List',
                userId: createdTaskListId,
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toEqual('Test Task List');
        expect(response.body.userId).toEqual('12345');

        createdTaskListId = response.body.id;
    });

    // Test for GET /tasklists
    it('should retrieve a list of task lists for a user', async () => {
        const response = await request(app)
            .get(`api/${API_VERSION}/tasklists`)
            .query({ userId: '12345' });

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    // Test for GET /tasklists/:id
    it('should retrieve a task list by ID', async () => {
        const response = await request(app).get(`api/${API_VERSION}/tasklists/${createdTaskListId}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(createdTaskListId);
        expect(response.body.name).toEqual('Test Task List');
        expect(response.body.userId).toEqual('12345');
    });

    // Test for PUT /tasklists/:id
    it('should update a task list by ID', async () => {
        const response = await request(app)
            .put(`api/${API_VERSION}/tasklists/${createdTaskListId}`)
            .send({
                name: 'Updated Task List',
            });

        expect(response.status).toBe(200);
        expect(response.body.id).toEqual(createdTaskListId);
        expect(response.body.name).toEqual('Updated Task List');
        expect(response.body.userId).toEqual('12345');
    });

    // Test for DELETE /tasklists/:id
    it('should delete a task list by ID', async () => {
        const response = await request(app).delete(`api/${API_VERSION}/tasklists/${createdTaskListId}`);

        expect(response.status).toBe(204);
    });

    // Test for GET /tasklists/:id after deletion
    it('should return 404 for deleted task list', async () => {
        const response = await request(app).get(`api/${API_VERSION}/tasklists/${createdTaskListId}`);

        expect(response.status).toBe(404);
    });
});
