import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    addTaskList,
    addTaskListSuccess, deleteTaskList,
    deleteTaskListSuccess, fetchTaskLists, fetchTaskListsSuccess,
    updateTaskList,
    updateTaskListSuccess
} from '../slices/taskListsSlice';
import { TaskListData } from '../slices/taskListsSlice';
import {
    addTaskListApi,
    updateTaskListApi,
    deleteTaskListApi,
    fetchTaskListsApi
} from '../../api/taskListsApi';


function* handleFetchTaskLists() {
    try {
        const taskLists = yield call(fetchTaskListsApi);
        yield put(fetchTaskListsSuccess(taskLists.data));
    } catch (error) {
    }
}
function* handleAddTaskList(action: PayloadAction<Omit<TaskListData, 'id'>>) {
    try {
        const newTaskList = yield call(addTaskListApi, action.payload);
        yield put(addTaskListSuccess(newTaskList));
    } catch (error) {
    }
}

function* handleUpdateTaskList(action: PayloadAction<{ id: string; taskListData: Omit<TaskListData, 'id'> }>) {
    try {
        action.payload.taskListData = { name: action.payload['name']};
        const updatedTaskList = yield call(updateTaskListApi, action.payload.id, action.payload.taskListData);
        yield put(updateTaskListSuccess(updatedTaskList));
    } catch (error) {
    }
}


function* handleDeleteTaskList(action: PayloadAction<string>) {
    try {
        yield call(deleteTaskListApi, action.payload);
        yield put(deleteTaskListSuccess(action.payload));
    } catch (error) {
    }
}
export default function* taskListsSaga() {

    yield takeEvery(fetchTaskLists.type, handleFetchTaskLists);
    yield takeEvery(addTaskList.type, handleAddTaskList);
    yield takeEvery(updateTaskList.type, handleUpdateTaskList);
    yield takeEvery(deleteTaskList.type, handleDeleteTaskList);
}
