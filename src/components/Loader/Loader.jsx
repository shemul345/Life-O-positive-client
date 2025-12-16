import React from 'react';

const Loader = () => {
    return (
        <div className='text-center mt-32 mb-24'>
            <span className="loading loading-dots loading-xl"></span>
            <p className='text-2xl text-red-500 font-semibold'>Processing this page please wait....</p>
        </div>
    );
};

export default Loader;