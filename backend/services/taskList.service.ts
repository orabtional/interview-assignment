import { TaskListRepository } from '../repositories/taskList.repository';

export class TaskListService {

    private taskListRepository: TaskListRepository;

    constructor() {
        this.taskListRepository = new TaskListRepository();
    }

    createTaskList(name: string, userId: string) {
        return this.taskListRepository.createTaskList(name, userId);
    }

    getAllTaskLists(userId: string) {
        return this.taskListRepository.getAllTaskLists(userId);
    }

    getTaskListById(id: string) {
        return this.taskListRepository.getTaskListById(id);
    }

    updateTaskList(id: string, name: string) {
        return this.taskListRepository.updateTaskList(id, name);
    }

    deleteTaskList(id: string) {
        return this.taskListRepository.deleteTaskList(id);
    }
}

export const taskListService = new TaskListService();

