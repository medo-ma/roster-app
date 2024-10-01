// LoadingOverlay.js
import React from 'react';
import { useLoading } from './LoadingContext';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  const { loading } = useLoading();

  if (!loading) return null;
  return (
    <div className="loading-overlay">
      Loading...
    </div>
  );
};

export default LoadingOverlay;
