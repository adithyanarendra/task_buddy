import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, Container, Avatar } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { auth, db } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import TaskList from '../../components/TaskList';
import CreateListModal from '../../components/CreateListModal';

interface TaskList {
    id: string;
    name: string;
    tasks: any[];
}

const TaskHome: React.FC = () => {
    const [taskLists, setTaskLists] = useState<TaskList[]>([]);
    const [user, setUser] = useState<any>(null);
    const [userDetails, setUserDetails] = useState<any>(null);
    const [openCreateListModal, setOpenCreateListModal] = useState(false);

    // Fetch task lists from Firestore
    const fetchTaskLists = async () => {
        const taskListsSnapshot = await getDocs(collection(db, 'taskLists'));
        const taskListsData = taskListsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as TaskList[];
        setTaskLists(taskListsData);
    };

    // Listen to auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);

                // Fetch user details from Firestore
                const userRef = doc(db, 'users', currentUser.uid);
                const userDoc = await getDoc(userRef);
                setUserDetails(userDoc.data());
            } else {
                setUser(null);
                setUserDetails(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Run this effect to fetch the task lists when the component mounts
    useEffect(() => {
        if (user) {
            fetchTaskLists();
        }
    }, [user]);

    return (
        <Box>
            <AppBar position="sticky">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">Task Manager</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {userDetails && user && (
                            <>
                                <Avatar src={userDetails.photoURL} sx={{ mr: 1 }} />
                                <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
                                    {userDetails.displayName}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>

            <Container sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenCreateListModal(true)}
                    >
                        Create List
                    </Button>
                </Box>

                {taskLists.length === 0 ? (
                    <Typography variant="h6" align="center" sx={{ mt: 4, color: 'gray' }}>
                        No lists or tasks available. Create your first list to get started!
                    </Typography>
                ) : (
                    taskLists.map((list) => <TaskList key={list.id} list={list} fetchTaskLists={fetchTaskLists} />)
                )}
            </Container>

            <CreateListModal
                open={openCreateListModal}
                onClose={() => setOpenCreateListModal(false)}
                fetchTaskLists={fetchTaskLists}
            />
        </Box>
    );
};

export default TaskHome;
