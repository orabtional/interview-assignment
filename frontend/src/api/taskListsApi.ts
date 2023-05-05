import { useState } from 'react';
import config from '../config';
import {TaskListData} from "../store/slices/taskListsSlice";

const taskListsUrl = `${config.apiUrl}/tasklists`;

let loggedInUserId: string | null = null;

export const useUserId = () => {
    const [userId, setUserId] = useState<string | null>(loggedInUserId);

    const updateUserId = (newUserId: string | null) => {
        loggedInUserId = newUserId;
        setUserId(newUserId);
    };

    return { userId, updateUserId };
};

export const fetchTaskListsApi = async (): Promise<TaskListData[]> => {
    const response = await fetch(`${taskListsUrl}?userId=${loggedInUserId}`);
    return await response.json();
};

// export const fetchTaskListsByUserIdApi = async (userId: string): Promise<TaskListData[]> => {
//     const response = await fetch(`${taskListsUrl}?userId=${userId}`);
//     return await response.json();
// };

export const addTaskListApi = async (taskList: Omit<TaskListData, 'id'>): Promise<TaskListData> => {
    const newTaskList = {name: taskList.name, userId: loggedInUserId}
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
