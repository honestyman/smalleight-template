// SplashScreen.js
import React, { useEffect, useState } from 'react';

const SplashScreen = ({ logo, onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 5000); // Adjust time to match the CSS animation delays and durations
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="splash-screen">
      <img src={logo} alt="Logo" className="logo" />
    </div>
  );
};

export default SplashScreen;
