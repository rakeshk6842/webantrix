import React from 'react'

export default function WebantrixLogo({ width = 70, height = 70 }) {
  return (
    <img 
      src="/webantrix_logo.png" 
      alt="Webantrix Logo" 
      width={width} 
      height={height}
      style={{
        display: 'block',
        objectFit: 'contain'
      }}
    />
  );
}
