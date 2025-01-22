import React, { useState } from 'react';

import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface TaskItemProps {
    task: any;
    listId: string;
    refetch: () => void
}

const TaskItem: React.FC<TaskItemProps> = ({ task, listId, refetch }) => {
    const [isComplete, setIsComplete] = useState(task.isComplete || false);

    const handleToggleComplete = async () => {
        const listRef = doc(db, 'taskLists', listId);

        const listSnapshot = await getDoc(listRef);
        const currentTasks = listSnapshot.data()?.tasks || [];

        const updatedTask = { ...task, isComplete: !isComplete };

        await updateDoc(listRef, {
            tasks: [...currentTasks.filter((t: any) => t.name !== task.name), updatedTask],
        });

        setIsComplete(!isComplete);
        refetch();
    };


    const handleDeleteTask = async () => {
        const listRef = doc(db, 'taskLists', listId);
        await updateDoc(listRef, {
            tasks: arrayRemove(task),
        });
        refetch()
    };

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                py: 1,
                gap: 1,
            }}
        >
            <Checkbox
                checked={isComplete}
                onChange={handleToggleComplete}
                color="primary"
                inputProps={{ 'aria-label': 'Mark task as complete' }}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems:"start", overflow: 'hidden' }}>
                <Typography
                    variant="body2"
                    sx={{
                        textDecoration: isComplete ? 'line-through' : 'none',
                        color: isComplete ? 'gray' : 'inherit',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    {task.name}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: 'gray',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Due: {task.dueDate}
                </Typography>
            </Box>

            <IconButton color="error" onClick={handleDeleteTask}>
                <DeleteIcon />
            </IconButton>
        </Box>

    );
};

export default TaskItem;
