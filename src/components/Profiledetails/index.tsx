import React from 'react';
import { useAuth } from '@/utils/auth';

const Profile: React.FC = () => {
    const { user } = useAuth();
    const userEmail = window.localStorage.getItem("email");
    const userPass = window.localStorage.getItem("password");
   
    console.log(window.localStorage.getItem("email"))

    return (
        <div>
            <h1>User Profile</h1>
        
            <p>Email : {userEmail}</p>
            <p>Password:{userPass}</p>
        </div>
    );
};

export default Profile;