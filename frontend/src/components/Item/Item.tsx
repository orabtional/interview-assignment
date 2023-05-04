import React, {useCallback, useEffect, useState} from 'react';
import {
    ItemDetails,
    CompleteWrapper,
    MinWidth,
    ItemText,
    CompleteToggle,
    CalendarImage,
    DetailsText,
    DividerHorizontal,
    ItemContainer,
    ItemContents,
    ItemTitle,
    CalendarText,
    DueDateText,
} from './Item.styles';
import incompleteImg from "../../assets/images/incomplete.png";
import completeImg from "../../assets/images/complete.png";
import calendarImg from "../../assets/images/calendar.png";


import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { format, isSameDay, isTomorrow } from 'date-fns';

import {DatePicker} from "@mui/x-date-pickers";
import {Grid, Input, TextField} from '@mui/material';
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { useDispatch } from 'react-redux';
import { updateItem } from '../../store/slices/itemsSlice';

export type ItemType = 'editable' | 'empty';

export interface ItemProps {
    id: number;
    taskListId: string;
    titleText: string;
    itemType: ItemType;
    dueDate?: string;
    contentText?: string;
    isSelected?: boolean;
    completed?: boolean;
    onToggleComplete?: () => void;
    onDeleteEvent?: () => void;
}

function Item({
                  id,
                  taskListId,
                  titleText,
                  itemType,
                  dueDate,
                  contentText,
                  completed,
                  isSelected,
                  onToggleComplete,
                  onDeleteEvent,
              }: ItemProps): JSX.Element {

    const dispatch = useDispatch();


    const [isCompleted, setIsCompleted] = useState(completed);
    const [open, setOpen] = useState(false);

    const [previousTitle, setPreviousTitle] = useState(titleText);
    const [previousContent, setPreviousContent] = useState(contentText);
    const [isEditingTitle, setIsEditingTitle] = useState(false);

    const [isEditingContent, setIsEditingContent] = useState(false);
    const [editableTitle, setEditableTitle] = useState(titleText);
    const [editableContent, setEditableContent] = useState(contentText);
    const [editableDueDate, setEditableDueDate] = useState<Date | null>(
        dueDate ? new Date(dueDate) : null
    );

    const [hovering, setHovering] = useState(false);

    const handleUpdateItem = useCallback(() => {
        dispatch(
            updateItem({
                id,
                itemData: {
                    itemType: 'editable',
                    taskListId: taskListId,
                    title: editableTitle,
                    dueDate: editableDueDate ? editableDueDate.toISOString() : undefined,
                    isCompleted: isCompleted,
                    content: editableContent,
                },
            })
        );
        setPreviousTitle(editableTitle);
        setPreviousContent(editableContent);
    }, [taskListId, dispatch, id, editableTitle, editableDueDate, editableContent, isCompleted]);


    useEffect(() => {
        if (isCompleted !== completed) {
            handleUpdateItem();
        }
    }, [isCompleted, completed, handleUpdateItem]);

    useEffect(() => {
        if (dueDate && editableDueDate && dueDate !== editableDueDate.toISOString()) {
            handleUpdateItem();
        }
    }, [dueDate, editableDueDate, handleUpdateItem]);

    const handleDatePickerClick = () => {
        setOpen(true);
    };
    const formatDate = (date: Date | null): string => {
        if (!date) return '';
        if (isSameDay(date, new Date())) {
            return 'Today';
        } else if (isTomorrow(date)) {
            return 'Tomorrow';
        } else {
            return format(date, 'dd MMM yyyy');
        }
    };

    const handleTitleClick = () => {
        setIsEditingTitle(true);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableTitle(e.target.value);
    };

    const handleTitleBlur = () => {
        if (isEditingTitle) {
            setIsEditingTitle(false);
            setEditableTitle(previousTitle);
        }
    };

    const handleContentBlur = () => {
        if (isEditingContent) {
            setIsEditingContent(false);
            setEditableContent(previousContent);
        }
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditingTitle(false);
            setPreviousTitle(editableTitle);
            handleUpdateItem();
        } else if (e.key === 'Escape') {
            handleTitleBlur();
        }
    };

    const handleContentKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            setIsEditingContent(false);
            setPreviousContent(editableContent);
            handleUpdateItem();
        } else if (e.key === 'Escape') {
            handleContentBlur();
        }
    };

    const handleContentClick = () => {
        setIsEditingContent(true);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditableContent(e.target.value);
    };

    const handleMouseEnter = () => {
        setHovering(true);
    };

    const handleMouseLeave = () => {
        setHovering(false);
    };

    const handleToggleComplete = () => {
        setIsCompleted(!isCompleted);
        if (onToggleComplete) {
            onToggleComplete();
        }
    };

    return (
        <>
            {itemType !== 'empty' && (
                <ItemDetails>
                    <ItemText>
                        {itemType === 'editable' ? (
                            <ItemContainer
                                isSelected={isSelected}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}
                            >
                                <ItemDetails>
                                    <CompleteWrapper>
                                        <CompleteToggle
                                            src={isCompleted ? completeImg : incompleteImg}
                                            loading="lazy"
                                            alt={'Vector'}
                                            onClick={handleToggleComplete}
                                        />
                                        <MinWidth />
                                    </CompleteWrapper>
                                    <ItemContents>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>

                                        {isEditingTitle ? (
                                            <Input
                                                value={editableTitle}
                                                onChange={handleTitleChange}
                                                onKeyDown={handleTitleKeyDown}
                                                onBlur={handleTitleBlur}
                                                autoFocus
                                                sx={{
                                                    '&:before': { display: 'none' },
                                                    '&:after': { display: 'none' },
                                                }}
                                            />
                                        ) : (
                                            <ItemTitle
                                                isCompleted={isCompleted}
                                                onClick={handleTitleClick}
                                            >
                                                {editableTitle}
                                            </ItemTitle>
                                        )}
                                            </Grid>
                                            <Grid item xs={4}>
                                        <CalendarText>
                                            <CalendarImage
                                                src={calendarImg}
                                                loading="lazy"
                                                alt={'Vector'}
                                                tabIndex={-1}
                                                onClick={handleDatePickerClick}
                                            />

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                                <DatePicker
                                                    open={open}
                                                    onOpen={() => setOpen(true)}
                                                    onClose={() => setOpen(false)}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            onClick={(e) => setOpen(true)}
                                                            sx={{
                                                                position: 'absolute',
                                                                opacity: 0,
                                                                pointerEvents: 'none',
                                                            }}
                                                        />
                                                    )}
                                                    onChange={(newValue) => {
                                                        setEditableDueDate(newValue);
                                                    }}
                                                    value={editableDueDate}
                                                />
                                            </LocalizationProvider>

                                        </CalendarText>
                                        <DueDateText onClick={handleDatePickerClick}>{formatDate(editableDueDate)}</DueDateText>
                                            </Grid>
                                            <Grid item xs={7}>

                                        {isEditingContent ? (
                                            <DetailsText>
                                            <Input
                                                value={editableContent}
                                                onChange={handleContentChange}
                                                onKeyDown={handleContentKeyDown}
                                                onBlur={handleContentBlur}
                                                autoFocus
                                                sx={{
                                                    '&:before': { display: 'none' },
                                                    '&:after': { display: 'none' },
                                                }}
                                            />
                                            </DetailsText>
                                        ) : (
                                            <DetailsText onClick={handleContentClick}>
                                                {editableContent}
                                            </DetailsText>
                                        )}
                                            </Grid>
                                            <Grid item xs={1}>
                                                {hovering && onDeleteEvent && (
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={onDeleteEvent}
                                                        sx={{
                                                            position: 'absolute',
                                                            top: '8px',
                                                            right: '8px',
                                                            backgroundColor: 'rgba(0,0,0,0.1)',
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(0,0,0,0.2)',
                                                            },
                                                        }}
                                                    >
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                )}
                                            </Grid>
                                        </Grid>
                                    </ItemContents>
                                </ItemDetails>
                                <DividerHorizontal orientation="horizontal" />
                            </ItemContainer>
                        ) : (
                            <ItemTitle>{titleText}</ItemTitle>
                        )}
                    </ItemText>
                </ItemDetails>
            )}
        </>
    );
}

export default Item;
