import React, { useEffect, useState } from 'react';
import { Box, Button, Modal, TextField, Typography, List, ListItem, IconButton, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface ManageTagsModalProps {
    open: boolean;
    onClose: () => void;
}

const ManageTagsModal: React.FC<ManageTagsModalProps> = ({ open, onClose }) => {
    const [tags, setTags] = useState<string[]>([]);
    const [newTag, setNewTag] = useState('');

    const fetchTags = async () => {
        const tagsSnapshot = await getDocs(collection(db, 'tags'));
        const tagsData = tagsSnapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
        }));
        setTags(tagsData);
    };

    const handleAddTag = async () => {
        if (newTag.trim() === '') return;
        try {
            await addDoc(collection(db, 'tags'), { name: newTag });
            setNewTag('');
            fetchTags();
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleDeleteTag = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'tags', id));
            fetchTags();
        } catch (error) {
            console.error('Error deleting tag:', error);
        }
    };

    useEffect(() => {
        if (open) {
            fetchTags();
        }
    }, [open]);

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="manage-tags-title">
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
                    width: 400,
                }}
            >
                <Typography id="manage-tags-title" variant="h6" sx={{ mb: 2 }}>
                    Manage Tags
                </Typography>
                <TextField
                    fullWidth
                    label="New Tag"
                    variant="outlined"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth onClick={handleAddTag}>
                    Add Tag
                </Button>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 2}}>
                    {tags.map((tag) => (
                        <Chip color='secondary'
                            key={tag?.id}
                            label={tag?.name}
                            onDelete={() => handleDeleteTag(tag.id)}
                        />
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};

export default ManageTagsModal;
