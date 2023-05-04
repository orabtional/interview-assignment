import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import {todoItemService} from '../services/todoItem.service';
import { successResponse, errorResponse } from '../utils/response';

class TodoItemController {
    async createTodoItem(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, content, dueDate, taskListId } = req.body;
        const todoItem = await todoItemService.createTodoItem(title, content, dueDate, taskListId);
        res.status(201).json(successResponse(todoItem, 'Todo item created successfully'));
    }

    async getAllTodoItems(req: Request, res: Response) {
        const todoItems = await todoItemService.getAllTodoItems();
        res.json(successResponse(todoItems));
    }

    async getTodoItemById(req: Request, res: Response) {
        const { id } = req.params;
        const todoItem = await todoItemService.getTodoItemById(id);
        res.json(successResponse(todoItem));
    }

    async getTodoItemsByTaskListId(req: Request, res: Response) {
        const { taskListId } = req.params;
        const todoItem = await todoItemService.getTodoItemsByTaskListId(taskListId);
        res.json(successResponse(todoItem));
    }

    async updateTodoItem(req: Request, res: Response) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { id } = req.params;
        const { title, content, dueDate, isCompleted } = req.body;
        const todoItem = await todoItemService.updateTodoItem(id, title, content, dueDate, isCompleted);
        res.json(successResponse(todoItem, 'Todo item updated successfully'));
    }

    async searchTodoItems(req: Request, res: Response) {
        const { title } = req.query;

        if (!title) {
            return res.status(400).json({ message: 'Title query parameter is required' });
        }

        try {
            const results = await todoItemService.searchTodoItems(title as string);
            res.json(successResponse(results));
        } catch (error: unknown) {
            res.status(500).json(errorResponse('Error searching for todo items', 500));
        }
    }

    async searchMyDay(_: Request, res: Response) {
        try {
            const results = await todoItemService.searchMyDay();
            res.json(successResponse(results));
        } catch (error: unknown) {
            res.status(500).json(errorResponse('Error searching for MyDay todo items', 500));
        }
    }

    async searchToDo(_: Request, res: Response) {
        try {
            const results = await todoItemService.searchToDo();
            res.json(successResponse(results));
        } catch (error) {
            res.status(500).json(errorResponse('Error searching for ToDo items', 500));
        }
    }

    async deleteTodoItem(req: Request, res: Response) {
        const { id } = req.params;
        await todoItemService.deleteTodoItem(id);
        res.status(204).json(successResponse(null, 'Todo item deleted successfully'));
    }
}

export default new TodoItemController();