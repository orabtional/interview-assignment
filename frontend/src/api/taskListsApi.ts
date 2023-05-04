import config from '../config';
import {TaskListData} from "../store/slices/taskListsSlice";

const userId = '6452da825c50d261cea111b2';
const taskListsUrl = `${config.apiUrl}/tasklists`;

export const fetchTaskListsApi = async (): Promise<TaskListData[]> => {
    const response = await fetch(`${taskListsUrl}?userId=${userId}`);
    return await response.json();
};

// export const fetchTaskListsByUserIdApi = async (userId: string): Promise<TaskListData[]> => {
//     const response = await fetch(`${taskListsUrl}?userId=${userId}`);
//     return await response.json();
// };

export const addTaskListApi = async (taskList: Omit<TaskListData, 'id'>): Promise<TaskListData> => {
    const newTaskList = {name: taskList.name, userId: userId}
    const response = await fetch(taskListsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskList),
    });
    return await response.json();
};

export const updateTaskListApi = async (id: string, taskListData: Omit<TaskListData, 'id'>): Promise<TaskListData> => {
    const response = await fetch(`${taskListsUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskListData),
    });
    return await response.json();
};

export const deleteTaskListApi = async (id: string): Promise<void> => {
    await fetch(`${taskListsUrl}/${id}`, { method: 'DELETE' });
};
