import React, {useState, useEffect, useCallback, useMemo} from 'react';
import { TaskListContainer } from './TaskList.styles';
import MyDayImg from '../../assets/images/myday.png';
import TodoImg from '../../assets/images/todo.png';
import TaskListImg from '../../assets/images/tasklist.png';
import NewTaskListImg from '../../assets/images/newtasklist.png';
import Task from '../Task/Task';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import {addTaskList, fetchTaskLists} from '../../store/slices/taskListsSlice';
import { v4 as uuidv4 } from 'uuid';

interface TaskListProps {
    setSelectedTaskList: (data: { id: string, name: string, predefined: boolean }) => void;
}

function TaskList({ setSelectedTaskList }: TaskListProps): JSX.Element {
    const predefinedTaskLists = useMemo(()=>[
        { id: "myday", name: 'My Day', icon: MyDayImg, itemsNumber: 3, predefined: true },
        { id: "todo", name: 'To do', icon: TodoImg, itemsNumber: 3, predefined: true },
    ], []);

    const taskLists = useSelector((state: RootState) => state.taskLists);
    const dispatch = useDispatch();

    const [selectedItem, setSelectedItem] = useState(uuidv4());

    const fetchTaskListsCallback = useCallback(() => {
        dispatch(fetchTaskLists());
    }, [dispatch]);

    useEffect(() => {
        fetchTaskListsCallback();
        setSelectedTaskList({
            id: predefinedTaskLists[1].id,
            name: predefinedTaskLists[1].name,
            predefined: predefinedTaskLists[1].predefined,
        });
    }, [predefinedTaskLists, fetchTaskListsCallback, setSelectedTaskList]);

    const addItem = useCallback(
        (name: string) => {
            const newItem = {
                id: taskLists.length + 2,
                name:name,
                icon: TaskListImg,
                itemsNumber: 0,
            };
            dispatch(addTaskList(newItem));
        },
        [dispatch, taskLists.length]
    );

    const handleTaskListSelect = useCallback(
        (id: string, title: string, predefined:boolean) => {
            setSelectedItem(id);
            setSelectedTaskList({ id, name: title, predefined: predefined });
        },
        [setSelectedTaskList]
    );

    return (
        <TaskListContainer>
            {predefinedTaskLists.map((item) => (
                <Task
                    id={item.id}
                    key={item.id}
                    icon={item.icon}
                    name={item.name}
                    itemsNumber={item.itemsNumber}
                    selected={selectedItem === item.id}
                    predefined={item.predefined}
                    onClick={() => {
                        handleTaskListSelect(item.id, item.name, true);
                    }}
                />
            ))}
            {
                taskLists.map((item) => (
                <Task
                    id={item.id}
                    key={item.id}
                    icon={NewTaskListImg}
                    name={item.name}
                    itemsNumber={item.itemsNumber}
                    selected={selectedItem === item.id}
                    onClick={() => {
                        handleTaskListSelect(item.id, item.name, false);
                    }}
                />
            ))}
            <Task
                id={uuidv4()}
                icon={NewTaskListImg}
                name="Add new task list"
                selected={false}
                addItem={addItem}
            />
        </TaskListContainer>
    );
}

export default TaskList;
