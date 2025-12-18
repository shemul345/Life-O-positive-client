import React from 'react';
import notFoundAnimation from '../../assets/json/forbidden.json';
import { Link } from 'react-router';
import Lottie from 'lottie-react';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Lottie
                animationData={notFoundAnimation}
                loop={true}
                autoplay={true}
                style={{ width: 200, height: 200 }}
            />

            <h1 className="text-3xl font-bold text-red-500 mt-4">
                Lost in Space?
            </h1>

            <p className="text-lg text-gray-600 mt-2">
                The page you're looking for has drifted away into the void.
            </p>

            <div className="my-3 space-x-3">
                <Link to="/" className="btn btn-primary text-white">
                    Go to Home
                </Link>
                <Link to="/dashboard" className="btn btn-secondary">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default NotFound;