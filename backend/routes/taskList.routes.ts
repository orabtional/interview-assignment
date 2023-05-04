import { Router } from 'express';
import taskListController from '../controllers/taskList.controller';
import { check } from 'express-validator';
import { handleValidationErrors } from '../utils/validation';

const router = Router();

/**
 * @swagger
 * /tasklists:
 *   post:
 *     summary: Create a new task list for a user
 *     tags: [TaskLists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *             properties:
 *               name:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Task list created
 */
router.post(
    '/',
    [
        check('name').notEmpty().withMessage('Name is required'),
        check('userId').notEmpty().withMessage('User ID is required'),
        handleValidationErrors,
    ],
    taskListController.createTaskList
);

/**
 * @swagger
 * /tasklists:
 *   get:
 *     summary: Retrieve a list of task lists for a user
 *     tags: [TaskLists]
 *     parameters:
 *       - name: userId
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A list of task lists
 */
router.get('/', taskListController.getAllTaskLists);

/**
 * @swagger
 * /tasklists/{id}:
 *   get:
 *     summary: Retrieve a task list by ID
 *     tags: [TaskLists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: A task list
 */
router.get('/:id', taskListController.getTaskListById);

/**
 * @swagger
 * /tasklists/{id}:
 *   put:
 *     summary: Update a task list by ID
 *     tags: [TaskLists]
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
 *               name:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Task list updated
 */
router.put('/:id', taskListController.updateTaskList);

/**
 * @swagger
 * /tasklists/{id}:
 *   delete:
 *     summary: Delete a task list by ID
 *     tags: [TaskLists]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Task list deleted
 */
router.delete('/:id', taskListController.deleteTaskList);

export default router;