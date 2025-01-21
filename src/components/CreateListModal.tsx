import React, { useState } from 'react';
import { Modal, Box, TextField, Button, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface CreateListModalProps {
    open: boolean;
    onClose: () => void;
    fetchTaskLists: () => void;
}

const CreateListModal: React.FC<CreateListModalProps> = ({ open, onClose, fetchTaskLists }) => {
    const [listName, setListName] = useState('');

    const handleCreateList = async () => {
        if (listName.trim()) {
            const newList = { name: listName, tasks: [] };
            await addDoc(collection(db, 'taskLists'), newList);
            fetchTaskLists();
            setListName('');
            onClose();
        }
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
                    Create New List
                </Typography>
                <TextField
                    label="List Name"
                    variant="outlined"
                    fullWidth
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button variant="contained" onClick={handleCreateList} disabled={!listName.trim()}>
                        Create List
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default CreateListModal;
