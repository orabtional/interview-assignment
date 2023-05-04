import { Router } from 'express';
import todoItemController from '../controllers/todoItem.controller';
import { check } from 'express-validator';
import { handleValidationErrors } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * /todoitems:
 *   post:
 *     summary: Create a new todo item
 *     tags: [TodoItems]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - dueDate
 *               - taskListId
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               taskListId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Todo item created
 */
router.post(
    '/',
    [
            check('title').notEmpty().withMessage('Title is required'),
            check('content').notEmpty().withMessage('Content is required'),
            check('dueDate').isISO8601().withMessage('Due date must be a valid ISO 8601 date'),
            check('taskListId').isString().withMessage('Task list ID must be a string'),
            handleValidationErrors,
    ],
    todoItemController.createTodoItem
);

/**
 * @swagger
 * /todoitems:
 *   get:
 *     summary: Retrieve a list of todo items
 *     tags: [TodoItems]
 *     responses:
 *       '200':
 *         description: A list of todo items
 */

router.get('/', todoItemController.getAllTodoItems);

/**
 * @
 * @swagger
 * /todoitems/search:
 *   get:
 *     summary: Search for todo items
 *     tags: [TodoItems]
 *     responses:
 *       '200':
 *         description: A list of todo items
 */
router.get('/search', todoItemController.searchTodoItems);

/**
 * @swagger
 * /todoitems/myday:
 *   get:
 *     summary: Retrieve today's todo items
 *     tags: [TodoItems]
 *     responses:
 *       '200':
 *         description: A list of today's todo items
 */
router.get('/myday', todoItemController.searchMyDay);

/**
 * @swagger
 * /todoitems/todo:
 *   get:
 *     summary: Retrieve uncompleted todo items
 *     tags: [TodoItems]
 *     responses:
 *       '200':
 *         description: A list of uncompleted todo items
 */
router.get('/todo', todoItemController.searchToDo);

/**
 * @swagger
 * /todoItems/{taskListId}:
 *   get:
 *     summary: Get all TodoItems by TaskList ID
 *     tags: [TodoItems]
 *     parameters:
 *       - in: path
 *         name: taskListId
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the TaskList to filter TodoItems by
 *     responses:
 *       200:
 *         description: A list of TodoItem objects that belong to the specified TaskList
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TodoItem'
 *       404:
 *         description: The specified TaskList ID was not found
 *       500:
 *         description: Internal server error
 */
router.get('/:taskListId', todoItemController.getTodoItemsByTaskListId);

/**
 * @swagger
 * /todoitems/{id}:
 *   get:
 *     summary: Retrieve a todo item by ID
 *     tags: [TodoItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A todo item
 */
router.get('/:id', todoItemController.getTodoItemById);

/**
 * @swagger
 * /todoitems/{id}:
 *   put:
 *     summary: Update a todo item by ID
 *     tags: [TodoItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *               taskListId:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Todo item updated
 */
router.put('/:id', todoItemController.updateTodoItem);

/**
 * @swagger
 * /todoitems/{id}:
 *   delete:
 *     summary: Delete a todo item by ID
 *     tags: [TodoItems]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Todo item deleted
 */
router.delete('/:id', todoItemController.deleteTodoItem);

export default router;
