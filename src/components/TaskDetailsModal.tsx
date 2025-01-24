import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface TaskDetailsModalProps {
    open: boolean;
    onClose: () => void;
    task: any;
    listId: string;
    refetch: () => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({ open, onClose, task, listId, refetch }) => {
    const [name, setName] = useState(task.name);
    const [dueDate, setDueDate] = useState(task.dueDate);
    const [description, setDescription] = useState(task.description || '');
    const [activityLog, setActivityLog] = useState<string[]>(task.activityLog || []);

    const handleUpdateTask = async () => {
        const listRef = doc(db, 'taskLists', listId);

        const listSnapshot = await getDoc(listRef);
        const currentTasks = listSnapshot.data()?.tasks || [];

        const updatedTask = {
            ...task,
            name,
            dueDate,
            description,
        };

        const newActivity = `Updated task "${task.name}" at ${new Date().toLocaleString()}`;
        const updatedActivityLog = [...(task.activityLog || []), newActivity];
        updatedTask.activityLog = updatedActivityLog;

        await updateDoc(listRef, {
            tasks: [...currentTasks.filter((t: any) => t.name !== task.name), updatedTask],
        });

        setActivityLog(updatedActivityLog);
        refetch();
        onClose();
    };
    console.log("..onclose", onClose);

    return (
        <Modal open={open} onClose={onClose}>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    bgcolor: 'white',
                    p: 4,
                    borderRadius: 2,
                    width: '80%',
                    maxHeight: '80%',
                    overflowY: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ flex: 3, pr: 4 }}>
                        <Typography variant="h6" gutterBottom>
                            Edit Task Details
                        </Typography>
                        <TextField
                            label="Task Name"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Due Date"
                            type="date"
                            fullWidth
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            sx={{ mb: 2 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Typography variant="subtitle1" gutterBottom>
                            Description
                        </Typography>
                        <ReactQuill
                            theme="snow"
                            value={description}
                            onChange={setDescription}
                            style={{ height: '200px', marginBottom: '16px' }}
                        />
                    </Box>

                    {/* Activity Log Section */}
                    <Box sx={{ flex: 2, pl: 4, borderLeft: '1px solid #ccc' }}>
                        <Typography variant="h6" gutterBottom>
                            Activity Log
                        </Typography>
                        <Box sx={{ overflowY: 'auto', maxHeight: '300px' }}>
                            {activityLog.map((log, index) => (
                                <Typography key={index} variant="body2" sx={{ mb: 1 }}>
                                    {log}
                                </Typography>
                            ))}
                        </Box>
                    </Box>
                </Box>

                {/* Update and Cancel Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button variant="contained" color="primary" onClick={handleUpdateTask}>
                        Update Task
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={() => onClose()}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default TaskDetailsModal;
