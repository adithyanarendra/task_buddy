import React from "react";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleProvider } from "../firebaseConfig";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";


const SignIn: React.FC = () => {
    const [user, setUser] = React.useState<any>(null);
    const navigate = useNavigate()

    const handleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            console.log(result);

            console.log(user);

            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
            setUser(user);
            navigate('/tasks')
        } catch (error) {
            console.error("Error during sign-in:", error);
        }
    };

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error during sign-out:", error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {!user ? (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Sign In</h1>
                    <button
                        onClick={handleSignIn}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Sign in with Google
                    </button>
                </div>
            ) : (
                <div>
                    <h1 className="text-2xl font-bold mb-4">Welcome, {user.displayName}!</h1>
                    <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-16 h-16 rounded-full mb-4"
                    />
                    <button
                        onClick={handleSignOut}
                        className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                </div>
            )}
        </div>
    );
};

export default SignIn;
