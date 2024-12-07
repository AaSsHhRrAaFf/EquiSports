
import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/loading.json';
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <Lottie 
        animationData={loadingAnimation}
        loop={true}
        style={{ width: 150, height: 150 }}
      />
    </div>
  );
}

export default LoadingSpinner;
