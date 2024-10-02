// LoadingOverlay.js
import React from 'react';
import { useLoading } from './LoadingContext';
import './LoadingOverlay.css';

const LoadingOverlay = () => {
  const { loading } = useLoading();

  if (!loading) return null;
  return (
    <div className="loading-overlay">
      <h1>...جارٍ التنفيذ</h1><div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    </div>
  );
};

export default LoadingOverlay;
