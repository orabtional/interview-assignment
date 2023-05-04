import { PrismaClient, TodoItem } from '@prisma/client';

const prisma = new PrismaClient();

export class TodoItemRepository {
    async createTodoItem(title: string, content: string, dueDate: Date, taskListId: string): Promise<TodoItem> {
        return prisma.todoItem.create({
            data: {
                title,
                content,
                dueDate,
                taskListId,
            },
        });
    }

    async getAllTodoItems(): Promise<TodoItem[]> {
        return prisma.todoItem.findMany();
    }

    async getTodoItemsByTaskListId(taskListId: string): Promise<TodoItem[]> {
        return prisma.todoItem.findMany({
            where: { taskListId },
        });
    }

    async getTodoItemById(id: string): Promise<TodoItem | null> {
        return prisma.todoItem.findUnique({
            where: { id },
        });
    }

    async updateTodoItem(id: string, title: string, content: string, dueDate: Date, isCompleted: boolean): Promise<TodoItem> {
        return prisma.todoItem.update({
            where: { id },
            data: {
                title,
                content,
                dueDate,
                isCompleted,
            },
        });
    }

    async deleteTodoItem(id: string): Promise<TodoItem> {
        return prisma.todoItem.delete({
            where: { id },
        });
    }

    async searchToDo(): Promise<TodoItem[]> {
        return prisma.todoItem.findMany({
            where: {
                isCompleted: false,
            },
        });
    }

    async searchTodoItems(title: string): Promise<TodoItem[]> {
        return prisma.todoItem.findMany({
            where: {
                title: {
                    contains: title.toLowerCase(),
                },
            },
        });
    }

    async searchMyDay(): Promise<TodoItem[]> {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        return prisma.todoItem.findMany({
            where: {
                dueDate: {
                    gte: today,
                    lt: tomorrow,
                },
                isCompleted: false,
            },
        });
    }
}

export const todoItemRepository = new TodoItemRepository();
