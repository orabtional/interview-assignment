import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import {put} from "redux-saga/effects";
import produce from 'immer';

export interface TaskListData {
    id: string;
    name: string;
    itemsNumber?: number;
}

const initialState: TaskListData[] = [
    // { id: uuidv4(), name: 'Task List 1', itemsNumber: 0 },
    // { id: uuidv4(), name: 'Task List 2', itemsNumber: 0 },
];


const taskListsSlice = createSlice({
    name: 'taskLists',
    initialState,
    reducers: {
        addTaskList: (state, action: PayloadAction<Omit<TaskListData, 'id'>>) => {
            return state;
        },
        addTaskListSuccess: (state, action: PayloadAction<Omit<TaskListData, 'id'>>) => {
            const data = action.payload['data'];
            const newTaskList: TaskListData = {
                id: uuidv4(),
                name:data.name
            };
            state.push(newTaskList);
        },

        updateTaskList: (state, action: PayloadAction<{ id: string; name: string }>) => {
            return state;
        },
        updateTaskListSuccess: (state, action: PayloadAction<{ id: string; name: string }>) => {
            const data = action.payload['data'];
            const taskList = state.find((taskList) => taskList.id === data.id);
            if (taskList) {
                taskList.name = data.name;
            }
        },

        fetchTaskLists: (state) => {
            return state;
        },

        fetchTaskListsSuccess: (state, action: PayloadAction<TaskListData[]>) => {
            return action.payload;
        },

        deleteTaskList: (state, action: PayloadAction<string>) => {
            return state;
        },
        deleteTaskListSuccess: (state, action: PayloadAction<string>) => {
            return produce(state, (draftState) => {
                const index = draftState.findIndex((taskList) => taskList.id === action.payload);
                if (index !== -1) {
                    draftState.splice(index, 1);
                }
            });
        },

        // incrementItemsNumber: (state, action: PayloadAction<string>) => {
        //     const taskList = state.find((taskList) => taskList.id === action.payload);
        //     if (taskList) {
        //         taskList.itemsNumber += 1;
        //     }
        // },
        // decrementItemsNumber: (state, action: PayloadAction<string>) => {
        //     const taskList = state.find((taskList) => taskList.id === action.payload);
        //     if (taskList && taskList.itemsNumber > 0) {
        //         taskList.itemsNumber -= 1;
        //     }
        // },
    },
});

export function* addTaskListSaga(action: PayloadAction<Omit<TaskListData, 'id'>>) {
    try {
        yield put(addTaskListSuccess(action.payload));
    } catch (error) {
    }
}

export function* updateTaskListSaga(action: PayloadAction<{ id: string; name: string }>) {
    try {
        yield put(updateTaskListSuccess(action.payload));
    } catch (error) {
    }
}

export function* deleteTaskListSaga(action: PayloadAction<string>) {
    try {
        yield put(deleteTaskListSuccess(action.payload));
    } catch (error) {
    }
}

export const { fetchTaskLists, fetchTaskListsSuccess, addTaskList, addTaskListSuccess, updateTaskList, updateTaskListSuccess, deleteTaskList, deleteTaskListSuccess } = taskListsSlice.actions;
export default taskListsSlice.reducer;
