import React, {useState} from 'react';
import {
    Button,
    Grid,
    TextField,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { format, isSameDay, isTomorrow } from 'date-fns';

import {
    AddNewItemTitleInput,
    AddNewItemContentInput,
    CalendarImage,
    CalendarText,
    CompleteWrapper,
    DetailsText,
    DueDateText,
    ItemContainer,
    ItemContents,
    ItemDetails,
    ItemText,
    ItemTitle,
    MinWidth,
} from "./Item.styles";

import calendarImg from "../../assets/images/calendar.png";
import {DatePicker} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";

interface AddNewItemProps {
    onAddNewItem: (title: string, dueDate: string, content: string) => void;
}

function AddNewItem({ onAddNewItem }: AddNewItemProps) {
    const [title, setTitle] = useState('');
    const [dueDate, setDueDate] = useState<Date | null>(new Date()); // Set initial value to current date
    const [content, setContent] = useState('');

    const handleDatePickerClick = () => {
        setOpen(true);
    };

    const handleSubmit = () => {
        if (title && dueDate && content) {
            onAddNewItem(title, dueDate.toISOString(), content);
            setTitle('');
            setDueDate(new Date());
            setContent('');
        }
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

    const [open, setOpen] = useState(false);

    return (
        <ItemDetails>
            <ItemText>
                <ItemContainer>
                    <ItemDetails>
                        <CompleteWrapper>
                            <AddIcon />
                            <MinWidth />
                        </CompleteWrapper>
                        <ItemContents>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <ItemTitle>
                                        <AddNewItemTitleInput
                                            placeholder="Title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </ItemTitle>
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
                                                    setDueDate(newValue);
                                                }}
                                                value={dueDate}
                                            />
                                        </LocalizationProvider>

                                    </CalendarText>

                                    <DueDateText onClick={handleDatePickerClick}>
                                        {formatDate(dueDate)}
                                    </DueDateText>
                                </Grid>
                                <Grid item xs={7}>
                                    <DetailsText>
                                        <AddNewItemContentInput
                                            placeholder="Content"
                                            value={content}
                                            onChange={(e) => setContent(e.target.value)}
                                            fullWidth
                                            multiline
                                            rows={1}
                                        />
                                    </DetailsText>
                                </Grid>
                                <Grid item xs={1}>
                                    <Button onClick={handleSubmit}>Add</Button>
                                </Grid>
                            </Grid>
                        </ItemContents>
                    </ItemDetails>
                </ItemContainer>
            </ItemText>
        </ItemDetails>
    );
}
export default AddNewItem;