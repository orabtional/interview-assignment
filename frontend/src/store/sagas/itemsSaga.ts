import { takeEvery, put, call } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';
import {
    addItem,
    addItemSuccess,
    deleteItem,
    deleteItemSuccess, fetchItemsByTaskListId, fetchItemsByTaskListIdSuccess,
    updateItem,
    updateItemSuccess
} from '../slices/itemsSlice';
import { addItemApi, updateItemApi, deleteItemApi, fetchItemsByTaskListIdApi } from '../../api/itemsApi';
import { ItemData } from '../../components/ItemList/ItemList';

function* handleAddItem(action: PayloadAction<ItemData>) {
    try {
        const newItem = yield call(addItemApi, action.payload);
        yield put(addItemSuccess(newItem));
    } catch (error) {
    }
}

function* handleUpdateItem(action: PayloadAction<{ id: number; itemData: Omit<ItemData, 'id'> }>) {
    try {
        const updatedItem = yield call(updateItemApi, action.payload.id, action.payload.itemData);
        yield put(updateItemSuccess(updatedItem));
    } catch (error) {
    }
}

function* handleFetchItemsByTaskListId(action: PayloadAction<string>) {
    try {
        const items = yield call(fetchItemsByTaskListIdApi, action.payload);
        yield put(fetchItemsByTaskListIdSuccess(items));
    } catch (error) {
    }
}
function* handleDeleteItem(action: PayloadAction<number>) {
    try {
        yield call(deleteItemApi, action.payload);
        yield put(deleteItemSuccess(action.payload));
    } catch (error) {
    }
}
export default function* itemsSaga() {
    yield takeEvery(addItem.type, handleAddItem);
    yield takeEvery(updateItem.type, handleUpdateItem);
    yield takeEvery(fetchItemsByTaskListId.type, handleFetchItemsByTaskListId);
    yield takeEvery(deleteItem.type, handleDeleteItem);
}
