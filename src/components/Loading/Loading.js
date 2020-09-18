import React from 'react';
import './Loading.css';

function Loading() {
  return (
    <div className="loading">
      <div className="loading__inner">
        <div className="spinner"></div>
      </div>
    </div>
  );
}

export default Loading;
