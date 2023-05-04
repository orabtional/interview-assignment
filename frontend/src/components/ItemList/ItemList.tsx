import React, {useCallback, useEffect} from 'react';
import {
    List,
} from './ItemList.styles';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {addItem, deleteItem, fetchItemsByTaskListId, selectItemsByTaskListId} from '../../store/slices/itemsSlice';
import Item from '../Item/Item';
import AddNewItem from '../Item/AddNewItem';

export interface ItemData {
    id: number;
    taskListId: string;
    title: string;
    dueDate?: string;
    content?: string;
    isCompleted?: boolean;
    itemType: 'editable' | 'empty';
}

interface ItemListProps {
    taskListId: string;
    predefined: boolean;
}

function ItemList({ taskListId, predefined }: ItemListProps): JSX.Element {
    const items = useSelector((state: RootState) => selectItemsByTaskListId(state, taskListId));

    const dispatch = useDispatch();

    const handleAddNewItem = useCallback((title: string, dueDate: string, content: string) => {
        dispatch(addItem(
            { taskListId: taskListId, title: title, dueDate: dueDate, content: content, itemType: 'editable' }
        ));
    }, [dispatch, taskListId]);

    const handleDeleteItem = useCallback((itemId: number) => {
        dispatch(deleteItem(itemId));
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchItemsByTaskListId(taskListId));
    }, [dispatch, taskListId]);

    return (
        <List>
            {items.map((item) => {
                return <Item
                    key={item.id}
                    id={item.id}
                    taskListId={item.taskListId}
                    itemType={'editable'}
                    titleText={item.title}
                    dueDate={item.dueDate}
                    contentText={item.content}
                    onDeleteEvent={() => handleDeleteItem(item.id)}
                />
            })}
            {!predefined && <AddNewItem onAddNewItem={handleAddNewItem} />}
        </List>
    );
}

export default ItemList;
