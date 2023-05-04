import { PrismaClient, TaskList } from '@prisma/client';

const prisma = new PrismaClient();

export class TaskListRepository {
    async createTaskList(name: string, userId: string): Promise<TaskList> {
        return prisma.taskList.create({
            data: { name, userId },
        });
    }

    async getAllTaskLists(userId: string): Promise<TaskList[]> {
        const taskLists = await prisma.taskList.findMany({
            where: { userId },
            select: {
                id: true,
                name: true,
                userId: true,
                _count: {
                    select: {
                        todoItems: true,
                    },
                },
            },
        });
        return taskLists.map((taskList) => ({
            ...taskList,
            itemsNumber: taskList._count.todoItems,
        }));
    }

    async getTaskListById(id: string): Promise<TaskList | null> {
        return prisma.taskList.findUnique({
            where: { id },
        });
    }

    async updateTaskList(id: string, name: string): Promise<TaskList> {
        return prisma.taskList.update({
            where: { id },
            data: { name },
        });
    }

    async deleteTaskList(id: string): Promise<TaskList> {
        return prisma.taskList.delete({
            where: { id },
        });
    }
}

export const taskListRepository = new TaskListRepository();
