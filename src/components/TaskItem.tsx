import React, { useState } from 'react';

import { Box, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { arrayRemove, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import TaskDetailsModal from './TaskDetailsModal';

interface TaskItemProps {
    task: any;
    listId: string;
    textColor: string;
    refetch: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, listId, textColor, refetch }) => {
    const [isComplete, setIsComplete] = useState(task.isComplete || false);
    const [openModal, setOpenModal] = useState(false);

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

    const handleDeleteTask = async (e: React.MouseEvent) => {
        e.stopPropagation();
        const listRef = doc(db, 'taskLists', listId);
        await updateDoc(listRef, {
            tasks: arrayRemove(task),
        });
        refetch();
    };

    console.log("...modal state", openModal);


    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto',
                alignItems: 'center',
                py: 1,
                gap: 1,
            }}
            onClick={() => setOpenModal(true)}
        >
            <Checkbox
                checked={isComplete}
                onChange={handleToggleComplete}
                color="primary"
                inputProps={{ 'aria-label': 'Mark task as complete' }}
                onClick={(e) => e.stopPropagation()}
            />

            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start', overflow: 'hidden', cursor: "pointer" }}>
                <Typography
                    variant="body2"
                    sx={{
                        textDecoration: isComplete ? 'line-through' : 'none',
                        color: isComplete ? 'gray' : textColor,
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
                        color: textColor,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Due: {task.dueDate}
                </Typography>
            </Box>

            <IconButton
                color="error"
                onClick={handleDeleteTask}
            >
                <DeleteIcon />
            </IconButton>
            <TaskDetailsModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                task={task}
                listId={listId}
                refetch={refetch}
            />
        </Box>
    );
};

export default TaskItem;
