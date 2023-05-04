import React, { useState } from 'react';
import { AddNewTaskInput } from './Task.styles';

interface AddNewItemProps {
    addItem: (title: string) => void;
}

const AddNewTask: React.FC<AddNewItemProps> = ({ addItem }) => {
    const [newItemTitle, setNewItemTitle] = useState('');

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter'
            && newItemTitle.trim() !== '') {
            addItem(newItemTitle);
            setNewItemTitle('');
        }
    };

    return (
        <AddNewTaskInput
            type="text"
            placeholder="Add new task list"
            value={newItemTitle}
            onChange={(e) => setNewItemTitle(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    );
};

export default AddNewTask;