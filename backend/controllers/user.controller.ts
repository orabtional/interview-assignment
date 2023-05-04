import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { successResponse, errorResponse } from '../utils/response';

class UserController {
    async createUser(req: Request, res: Response) {
        try {
            const { username, password, email, firstName, lastName } = req.body;
            const user = await userService.createUser(username, password, email, firstName, lastName);
            res.status(201).json(successResponse(user, 'User created successfully'));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { username, password } = req.body;
            const user = await userService.login(username, password);

            if (user) {
                res.status(200).json(successResponse(user, 'User logged in successfully'));
            } else {
                res.status(401).json(errorResponse('Invalid credentials', 401));
            }
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await userService.getAllUsers();
            res.status(200).json(successResponse(users));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async getUserById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            res.status(200).json(successResponse(user));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { username, password, email, firstName, lastName } = req.body;
            const user = await userService.updateUser(id, username, password, email, firstName, lastName);
            res.status(200).json(successResponse(user, 'User updated successfully'));
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await userService.deleteUser(id);
            res.status(204).send();
        } catch (error: unknown) {
            res.status(500).json(errorResponse((error as Error).message, 500));
        }
    }
}

export default new UserController();