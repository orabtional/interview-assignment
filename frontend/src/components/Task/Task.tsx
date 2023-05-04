import React, { useState, useCallback  } from 'react';
import { useDispatch } from 'react-redux';
import {
    TaskContainer,
    MinWidth,
    TaskText,
    TaskTitle,
    TasksNumber,
    TaskIcon,
    TaskWrapper,
    IconContainer,
    DeleteButton,
} from './Task.styles';
import AddNewTask from './AddNewTask';
import {Input} from "@mui/material";
import {deleteTaskList, updateTaskList} from "../../store/slices/taskListsSlice";
import DeleteIcon from "@mui/icons-material/Delete";


interface ListItemProps {
    id,
    icon: string;
    name: string;
    itemsNumber?: number;
    selected?: boolean;
    predefined?: boolean;
    onClick?: () => void;
    addItem?: (title: string) => void;
}

const Task: React.FC<ListItemProps> = ({
                                           id,
                                           icon,
                                           name,
                                           itemsNumber,
                                           selected = false,
                                           predefined = false,
                                           onClick,
                                           addItem,
                                       }) => {
    const taskIcon = icon;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(name);

    const dispatch = useDispatch();

    const updateTitle = useCallback(
        (id: string, name: string) => {
            dispatch(updateTaskList({ id, name }));
        },
        [dispatch]
    );


    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            // Save the changes
            setIsEditing(false);
            if (id) {
                updateTitle(id, editTitle);
            }
        } else if (e.key === 'Escape') {
            // Cancel editing and restore the original title
            setIsEditing(false);
            setEditTitle(name);
        }
    };

    const handleBlur = () => {
        // Save the changes when the input loses focus
        setIsEditing(false);
        if (id) {
            updateTitle(id, editTitle);
        }
    };

    const handleDelete = useCallback(() => {
        dispatch(deleteTaskList(id));
    }, [id, dispatch]);

    return (
        <TaskWrapper selected={selected} onClick={onClick}>
            <TaskContainer>
                <IconContainer>
                    <MinWidth>
                        <TaskIcon src={taskIcon} loading="lazy" alt={' '} />
                    </MinWidth>
                </IconContainer>
                {addItem ? (
                    <AddNewTask addItem={addItem} />
                ) : (
                    <>
                        {isEditing ? (
                            <Input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onBlur={handleBlur}
                                disableUnderline
                                inputProps={{ style: { outline: 'none', border: 'none', background: 'none' } }}
                            />
                        ) : (
                            <TaskText onDoubleClick={() => setIsEditing(true)}>
                                <TaskTitle>{name}</TaskTitle>
                            </TaskText>
                        )}
                        {typeof itemsNumber === 'number' && itemsNumber > 0 && (
                            <TasksNumber>{itemsNumber}</TasksNumber>
                        )}
                    </>
                )}

                {!addItem && !predefined && (
                    <DeleteButton
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        style={{ width: '10px' }}
                    >
                        <DeleteIcon fontSize="small"/>
                    </DeleteButton>
                )}
            </TaskContainer>
        </TaskWrapper>
    );
};

export default Task;