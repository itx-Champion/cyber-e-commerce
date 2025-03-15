import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Components/Loader';

const PagesNotFound = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <h1 className='text-6xl font-bold text-red-600 mb-4'>404</h1>
      <p className='text-xl text-gray-700 mb-8'>Page Not Found</p>
      <p className='text-lg text-gray-500 mb-4'>Please go to the Home Page.</p>
      <Link to="/">
        <button className="px-6 py-3 text-white bg-custom-gradient hover:bg-gray-500 font-semibold text-lg rounded-md">
          Go To Home
        </button>
      </Link>
    </div>
  );
};

export default PagesNotFound;
