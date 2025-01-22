import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface CreateTaskModalProps {
    open: boolean;
    onClose: () => void;
    refetch: () => void;
    listId: string;
}

const CreateTaskModal: React.FC<CreateTaskModalProps> = ({ open, onClose, refetch, listId }) => {
    const [taskName, setTaskName] = useState('');
    const [dueDate, setDueDate] = useState('');

    const handleCreateTask = async () => {
        const listRef = doc(db, 'taskLists', listId);
        const listDoc = await getDoc(listRef);
        const currentTasks = listDoc.exists() ? listDoc.data().tasks || [] : [];
        const newTask = { id: Date.now().toString(), name: taskName, dueDate };
        await updateDoc(listRef, {
            tasks: [...currentTasks, newTask],
        });
        refetch()
        setTaskName('');
        setDueDate('');
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: 3,
                borderRadius: 2,
                width: 400,
                boxShadow: 24,
            }}>
                <Typography variant="h6" gutterBottom>
                    Create New Task
                </Typography>
                <TextField
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <TextField
                    label="Due Date"
                    variant="outlined"
                    type="date"
                    fullWidth
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    sx={{ mb: 2 }}
                    slotProps={{ inputLabel: { shrink: true } }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                        variant="contained"
                        onClick={handleCreateTask}
                        disabled={!taskName.trim() || !dueDate.trim()}
                    >
                        Create Task
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateTaskModal;
