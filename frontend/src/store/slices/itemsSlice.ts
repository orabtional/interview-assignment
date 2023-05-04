import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ItemData} from '../../components/ItemList/ItemList';
import produce from 'immer';
import {RootState} from "../store";

const initialState: ItemData[] = [];

export const selectItemsByTaskListId = (state: RootState, taskListId: string): ItemData[] => {
    switch (taskListId){
        case "myday":
        case "todo":
            return [...state.items];
        default:
            return state.items.filter((item) => item.taskListId === taskListId);
    }
}

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {
        addItem: (state, _action: PayloadAction<Omit<ItemData, 'id'>>) => {
            return state;
        },
        addItemSuccess: (state, action: PayloadAction<Omit<ItemData, 'id'>>) => {
            const data = action.payload['data'];
            const newItem: ItemData = {
                itemType: 'editable',
                ...data,
            };
            state.push(newItem);
        },

        fetchItemsByTaskListId: (state, _action: PayloadAction<string>) => {
            return state;
        },
        fetchItemsByTaskListIdSuccess: (state, action: PayloadAction<string>) => {
            // return state.filter(item => item.taskListId === state.taskListId);
            return action.payload['data'];
        },

        updateItem: (state, _action: PayloadAction<{ id: number; itemData: Omit<ItemData, 'id'> }>) => {
            return state;
        },

        updateItemSuccess: (state, action: PayloadAction<{ id: number; itemData: Omit<ItemData, 'id'> }>) => {
            const { id, itemData } = action.payload;
            return produce(state, (draftState) => {
                const itemIndex = draftState.findIndex((item) => item.id === id);
                if (itemIndex !== -1) {
                    draftState[itemIndex] = { ...draftState[itemIndex], ...itemData };
                }
            });
        },

        deleteItem: (state, _action: PayloadAction<number>) => {
            return state;
        },

        deleteItemSuccess: (state, action: PayloadAction<number>) => {
            return produce(state, draftState => {
                const itemIndex = draftState.findIndex(item => item.id === action.payload);
                if (itemIndex !== -1) {
                    draftState.splice(itemIndex, 1);
                }
            });
        },
    },
});


export const { addItem, addItemSuccess, fetchItemsByTaskListId, fetchItemsByTaskListIdSuccess, updateItem, updateItemSuccess, deleteItem, deleteItemSuccess } = itemsSlice.actions;

// export function* addItemSaga(action: PayloadAction<Omit<ItemData, 'id'>>) {
//     try {
//         yield put(addItemSuccess(action.payload));
//         // yield put(incrementItemsNumber(action.payload.taskListId));
//     } catch (error) {
//         // handle error
//     }
// }
//
// export function* updateItemSaga(action: PayloadAction<{ id: number; itemData: Omit<ItemData, 'id'> }>) {
//     try {
//         yield put(updateItemSuccess(action.payload));
//     } catch (error) {
//         // handle error
//     }
// }
//
// export function* deleteItemSaga(action: PayloadAction<number>) {
//     try {
//         // const item = yield select((state: RootState) => state.items.find((i) => i.id === action.payload));
//         // if (item && !item.complete) {
//         //     yield put(decrementItemsNumber(item.taskListId));
//         // }
//         yield put(deleteItemSuccess(action.payload));
//     } catch (error) {
//         // handle error
//     }
//
// }

export default itemsSlice.reducer;
