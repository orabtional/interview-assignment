import { Request, Response } from 'express';
import { taskListService } from '../services/taskList.service';
import { successResponse, errorResponse } from '../utils/response';

class TaskListController {

    async createTaskList(req: Request, res: Response) {
        try {
            const { name, userId } = req.body;
            const taskList = await taskListService.createTaskList(name, userId);
            res.status(201).json(successResponse(taskList, 'Task list created successfully'));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }
    async getAllTaskLists(req: Request, res: Response) {
        try {
            const { userId } = req.query;
            if (!userId) {
                res.status(400).json(errorResponse('User ID is required', 400));
                return;
            }
            const taskLists = await taskListService.getAllTaskLists(userId as string);
            res.status(200).json(successResponse(taskLists));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async getTaskListById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const taskList = await taskListService.getTaskListById(id);
            res.status(200).json(successResponse(taskList));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async updateTaskList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const taskList = await taskListService.updateTaskList(id, name);
            res.status(200).json(successResponse(taskList, 'Task list updated successfully'));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async deleteTaskList(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await taskListService.deleteTaskList(id);
            res.status(204).send();
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }
}

export default new TaskListController();
