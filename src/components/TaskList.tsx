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
import { Droppable, Draggable } from 'react-beautiful-dnd';

import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import TaskItem from './TaskItem';
import CreateTaskModal from './CreateTaskModal';

import { db } from '../firebaseConfig';
import { deleteDoc, doc } from '@firebase/firestore';
import { generatePastelDarkColor, generateSubtleBackground, getTextColor } from '../helpers/Utils';

interface TaskListProps {
    list: any;
    fetchTaskLists: () => void;
}

const TaskList: React.FC<TaskListProps> = ({ list, fetchTaskLists }) => {
    const [openCreateTaskModal, setOpenCreateTaskModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

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

            <AccordionDetails>
                <Droppable key={list?.id} droppableId={list?.id}>
                    {(provided) => (
                        <Box
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
                        >
                            {list?.tasks?.map((task: any, index: number) => (
                                <Draggable key={task.id} draggableId={task.id} index={index}>
                                    {(provided) => (
                                        <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={{ mb: 1 }}
                                        >
                                            <TaskItem
                                                task={task}
                                                listId={list.id}
                                                refetch={fetchTaskLists}
                                                textColor={textColor}
                                                provided={provided}
                                                innerRef={provided.innerRef}
                                            />
                                        </Box>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Box>
                    )}
                </Droppable>
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
