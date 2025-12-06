import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SocialLogin = () => {
    const { signInGoogle } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoogleSignIn = () => {
        signInGoogle()
            .then((result) => {
                // console.log(result.user)
                toast.success("You’re logged in! Enjoy your session", {
                    position: "top-center"
                });


                // Create user by social login
                const userInfo = {
                    email: result.user.email,
                    displayName: result.user.displayName,
                    photoURL: result.user.photoURL
                }

                axiosSecure.post('users', userInfo)
                    .then(res => {
                        console.log('user data has been stored', res.data)
                        navigate(location.state || '/')
                    })
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='text-center'>
            <div className='text-center text-lg text-gray-400 mb-1 font-semibold'>Or</div>
            <button onClick={handleGoogleSignIn}
                className="btn w-full bg-red-200 text-black border-[#e5e5e5]">
                <FcGoogle className='text-2xl' />
                Login with Google
            </button>
        </div>
    );
};

export default SocialLogin;