import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function HoverPopup({ content }) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <Popup
        trigger={<button>Trigger</button>}
        position="right center"
        open={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <div>{content}</div>
      </Popup>
    </div>
  );
};
