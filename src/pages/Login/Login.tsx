import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
    const navigate = useNavigate();
    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });

            console.log('User signed in:', user);
            alert(`Welcome, ${user.displayName}!`);
            navigate('/home');
        } catch (error) {
            console.error('Error during login:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mt: 10, height: '100vh', }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome to Task Manager
                </Typography>
                <Typography variant="body1">
                    Sign in to manage your tasks efficiently.
                </Typography>
            </Box>
            <Button
                variant="contained"
                startIcon={<Google />}
                onClick={handleGoogleSignIn}
                sx={{ width: '100%', py: 1.5, fontSize: '1rem' }}
            >
                Sign in with Google
            </Button>
        </Container>
    );
};

export default Login;
