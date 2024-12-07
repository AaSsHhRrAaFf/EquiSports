
import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import notFoundAnimation from '../assets/Animation - 1733612544288.json'; 
import { Fade } from 'react-awesome-reveal';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <Fade cascade damping={0.2}>
        <div className="w-full max-w-md">
          <Lottie 
            animationData={notFoundAnimation}
            loop={true}
            style={{ width: '100%', maxWidth: 400, margin: '0 auto' }}
          />
        </div>
        <h1 className="text-4xl font-bold text-center mt-8">Page Not Found</h1>
        <p className="text-gray-600 text-center mt-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/"
          className="btn btn-primary mt-6"
          data-tooltip-id="home-tooltip"
          data-tooltip-content="Return to homepage"
        >
          Go Home
        </Link>
      </Fade>
    </div>
  );
};

export default NotFoundPage;
