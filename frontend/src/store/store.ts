import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import itemsReducer from './slices/itemsSlice';
import taskListsReducer from './slices/taskListsSlice';
import itemsSaga from './sagas/itemsSaga';
import taskListsSaga from './sagas/taskListsSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
    reducer: {
        items: itemsReducer,
        taskLists: taskListsReducer,
    },
    middleware: [sagaMiddleware],
});

function* rootSaga() {
    yield all([itemsSaga(), taskListsSaga()]);
}
// function* rootSaga() {
//     yield all([watchDeleteItem()]);
// }

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;