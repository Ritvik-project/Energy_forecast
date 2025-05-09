import React, { useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function Compare() {
  const [containers, setContainers] = useState([1, 2]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeContainer, setActiveContainer] = useState(null);

  const addContainer = () => {
    setContainers([...containers, containers.length + 1]);
  };

  const handleOpen = (containerId) => {
    setActiveContainer(containerId);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setActiveContainer(null);
  };

  return (
    <>
      <div className="compare">
        <div className="container-wrapper">
          {containers.map((item, index) => (
            <div key={index} className="box pop-in">
              <div>
                Location {item}
              </div>
              <button onClick={() => handleOpen(item)} className="remove-button">-</button>
            </div>
          ))}

          <button onClick={addContainer} className="add-button pop-in">
            ➕ Add Container
          </button>
        </div>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="overlay">
          <div className="modal">
            <h3>Container {activeContainer}</h3>
            <p>This is the popup for Location {activeContainer}.</p>
            <button onClick={handleClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Compare;
