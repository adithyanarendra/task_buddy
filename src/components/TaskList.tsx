import React, { useState, useMemo } from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Modal,
    Box,
    Fab,
    Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const calculateLuminance = (color: string) => {
        const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
        const match = color.match(regex);

        if (match) {
            const s = parseFloat(match[2]) / 100;
            const l = parseFloat(match[3]) / 100;

            const luminance = (l + 0.05) / (1.05 - s * (l > 0.5 ? 1 - l : l));
            return luminance * 21.3 + 4.6;
        }
        return 0;
    };

    const generatePastelDarkColor = () => {
        const baseHue = Math.floor(Math.random() * 360);
        const saturation = 30 + Math.random() * 20; // Slightly muted saturation for pastel effect
        const lightness = 40 + Math.random() * 20; // Darker lightness for the pastel look

        return `hsl(${baseHue}, ${saturation}%, ${lightness}%)`;
    };

    const getTextColor = (backgroundColor: string) => {
        const luminance = calculateLuminance(backgroundColor);
        return luminance < 128 ? 'white' : 'black';
    };

    const generateSubtleBackground = (bgColor: string) => {
        const regex = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/;
        const match = bgColor.match(regex);

        if (match) {
            const hue = match[1];
            const saturation = match[2];
            let lightness = parseFloat(match[3]);

            // Decrease the lightness to create a subtler color
            lightness = Math.max(lightness - 10, 30); // Don't go below 30% lightness

            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }

        return bgColor; // Default return if something goes wrong
    };

    const randomColor = useMemo(() => generatePastelDarkColor(), []);
    const subtleColor = useMemo(() => generateSubtleBackground(randomColor), [randomColor]);
    const textColor = useMemo(() => getTextColor(subtleColor), [subtleColor]);



    const handleDeleteList = async () => {
        try {
            await deleteDoc(doc(db, 'taskLists', list.id));
            fetchTaskLists();
            setOpenDeleteModal(false);
        } catch (error) {
            console.error('Error deleting list:', error);
        }
    };

    return (
        <Accordion
            sx={{
                backgroundColor: randomColor,
                mb: 2,
                borderRadius: 3,
                overflow: 'hidden',
                '&:last-of-type': {
                    borderRadius: 3,
                },
                '&:before': {
                    display: 'none',
                },
                '& .MuiAccordionSummary-root': {
                    backgroundColor: subtleColor,
                    color: textColor,
                    borderRadius: 'inherit',
                },
            }}
        >
            {/* Accordion Header */}
            <AccordionSummary
                expandIcon={
                    <ExpandMoreIcon
                        sx={{
                            color: list.tasks.length ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                            pointerEvents: list.tasks.length ? 'auto' : 'none',
                        }}
                    />
                }
                aria-controls={`panel-${list.id}-content`}
                id={`panel-${list.id}-header`}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    px: 2,
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 'bold', flex: 1 }}>
                    {list.name}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Fab
                        color="primary"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenCreateTaskModal(true);
                        }}
                        sx={{ backgroundColor: '#fff', color: randomColor }}
                    >
                        <AddIcon />
                    </Fab>
                    <Fab
                        color="error"
                        size="small"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpenDeleteModal(true);
                        }}
                        sx={{ backgroundColor: '#fff', color: 'red' }}
                    >
                        <DeleteIcon />
                    </Fab>
                </Box>
            </AccordionSummary>

            {/* Accordion Body */}
            <AccordionDetails>
                {list.tasks.length > 0 ? (
                    list.tasks.map((task: any) => (
                        <TaskItem key={task.id} task={task} listId={list.id} refetch={fetchTaskLists} textColor={textColor} />
                    ))
                ) : (
                    <Typography variant="body2" sx={{ color: textColor, textAlign: 'center' }}>
                        No tasks yet. Add one to get started!
                    </Typography>
                )}
            </AccordionDetails>

            {/* Create Task Modal */}
            <CreateTaskModal
                open={openCreateTaskModal}
                onClose={() => setOpenCreateTaskModal(false)}
                listId={list.id}
                refetch={fetchTaskLists}
            />

            {/* Delete Confirmation Modal */}
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
        </Accordion>
    );
};

export default TaskList;
