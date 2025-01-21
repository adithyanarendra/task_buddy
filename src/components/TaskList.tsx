import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, Collapse, Box, Divider, Modal } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import TaskItem from './TaskItem';
import CreateTaskModal from './CreateTaskModal';

import { db } from '../firebaseConfig';
import { deleteDoc, doc } from '@firebase/firestore';

interface TaskListProps {
    list: any;
    fetchTaskLists: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ list, fetchTaskLists }) => {
    const [open, setOpen] = useState(false);
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDeleteList = async () => {
        try {
            await deleteDoc(doc(db, 'taskLists', list.id));
            await fetchTaskLists();
            setOpenDeleteModal(false);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {list.name}
                    </Typography>
                    <Box>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            sx={{ mr: 1 }}
                            onClick={() => setOpenCreateTaskModal(true)}
                        >
                            Add Task
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                            onClick={() => setOpen(!open)}
                        >
                            {open ? 'Collapse' : 'Expand'} Tasks
                        </Button>
                        <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<DeleteIcon />}
                            color="error"
                            onClick={() => setOpenDeleteModal(true)}
                        >
                            Delete List
                        </Button>
                    </Box>
                </Box>
                <Collapse in={open}>
                    <div>
                        {list.tasks.map((task: any) => (
                            <TaskItem key={task.id} task={task} listId={list.id} />
                        ))}
                    </div>
                </Collapse>
            </CardContent>

            <CreateTaskModal
                open={openCreateTaskModal}
                onClose={() => setOpenCreateTaskModal(false)}
                listId={list.id}
            />

            <Modal
                open={openDeleteModal}
                onClose={() => setOpenDeleteModal(false)}
                aria-labelledby="delete-list-modal-title"
                aria-describedby="delete-list-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        p: 3,
                        borderRadius: 2,
                        boxShadow: 24,
                        width: 300,
                    }}
                >
                    <Typography id="delete-list-modal-title" variant="h6" sx={{ mb: 2 }}>
                        Confirm Deletion
                    </Typography>
                    <Typography id="delete-list-modal-description" sx={{ mb: 3 }}>
                        Are you sure you want to delete the list "{list.name}"? This action cannot be undone.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="outlined" onClick={() => setOpenDeleteModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="error" onClick={handleDeleteList}>
                            Delete
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Card>
    );
};

export default TaskList;
