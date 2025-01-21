import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface TaskItemProps {
    task: any;
    listId: string;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, listId }) => {
    const handleDeleteTask = async () => {
        const listRef = doc(db, 'taskLists', listId);
        await updateDoc(listRef, {
            tasks: arrayRemove(task),
        });
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
            <Typography variant="body2">{task.name} (Due: {task.dueDate})</Typography>
            <Button variant="outlined" color="error" size="small" onClick={handleDeleteTask}>
                Delete Task
            </Button>
        </Box>
    );
};

export default TaskItem;
