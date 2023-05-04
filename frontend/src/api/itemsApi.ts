import config from '../config';
import { ItemData } from '../components/ItemList/ItemList';

const itemsUrl = `${config.apiUrl}/todoitems`;

export const fetchItemsByTaskListIdApi = async (taskListId: string): Promise<ItemData[]> => {
    const response = await fetch(`${itemsUrl}/${taskListId}`);
    return await response.json();
};

export const addItemApi = async (item: Omit<ItemData, 'id'>): Promise<ItemData> => {
    const newItem = {
        title: item.title,
        content: item.content,
        dueDate: item.dueDate,
        taskListId: item.taskListId
    }
    const response = await fetch(itemsUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
    });
    return await response.json();
};

export const updateItemApi = async (id: number, itemData: Omit<ItemData, 'id'>): Promise<ItemData> => {
    const response = await fetch(`${itemsUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
    });
    return await response.json();
};

export const deleteItemApi = async (id: number): Promise<void> => {
    await fetch(`${itemsUrl}/${id}`, { method: 'DELETE' });
};

export const searchItemsApi = async (searchQuery: string): Promise<ItemData[]> => {
    const response = await fetch(`${itemsUrl}/search?search=${searchQuery}`);
    return await response.json();
};

export const fetchTodayItemsApi = async (): Promise<ItemData[]> => {
    const response = await fetch(`${itemsUrl}/myday`);
    return await response.json();
};

export const fetchUncompletedItemsApi = async (): Promise<ItemData[]> => {
    const response = await fetch(`${itemsUrl}/todo`);
    return await response.json();
};
