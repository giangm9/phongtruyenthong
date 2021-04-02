
import React from "react"
import './scene/index';


function CenterPointer() {

  return (
    <svg
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      width="16" height="16"
      fill='rgba(255, 255, 255, 0.3)' viewBox="0 0 16 16">
      <circle cx="8" cy="8" r="8" />
    </svg>
  )
}