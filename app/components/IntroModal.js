import { useState } from 'react';

const Modal = ({ isOpen, onClose, content }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          width: '300px',
          textAlign: 'center',
        }}
      >
        <h2>Introduction</h2>
        <p>{content}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;