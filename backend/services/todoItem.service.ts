import { TodoItemRepository } from '../repositories/todoItem.repository';

export class TodoItemService {
    private todoItemRepository: TodoItemRepository;

    constructor() {
        this.todoItemRepository = new TodoItemRepository();
    }

    createTodoItem(title: string, content: string, dueDate: Date, taskListId: string) {
        return this.todoItemRepository.createTodoItem(title, content, dueDate, taskListId);
    }

    getAllTodoItems() {
        return this.todoItemRepository.getAllTodoItems();
    }

    getTodoItemById(id: string) {
        return this.todoItemRepository.getTodoItemById(id);
    }

    getTodoItemsByTaskListId(taskListId: string) {
        return this.todoItemRepository.getTodoItemsByTaskListId(taskListId);
    }

    updateTodoItem(id: string, title: string, content: string, dueDate: Date, isCompleted: boolean) {
        return this.todoItemRepository.updateTodoItem(id, title, content, dueDate, isCompleted);
    }

    deleteTodoItem(id: string) {
        return this.todoItemRepository.deleteTodoItem(id);
    }

    searchToDo() {
        return this.todoItemRepository.searchToDo();
    }

    searchTodoItems(title: string) {
        return this.todoItemRepository.searchTodoItems(title);
    }

    searchMyDay() {
        return this.todoItemRepository.searchMyDay();
    }
}

export const todoItemService = new TodoItemService();