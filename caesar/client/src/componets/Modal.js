import React, { useState } from 'react';
import Modal from 'react-modal';
import BudgetTracker from './budgetTracker';
import './Modal.css';

export const ModalButton = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    const openModal = () => {
      setIsOpen(true);
    };
  
    const closeModal = () => {
      setIsOpen(false);
    };
  
    return (
      <div>
        <button className="modal-button" onClick={openModal}>
          Set Your Budget
        </button>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
        >
        <div className="modal">
          <div className="tracker-container">
            <BudgetTracker />
          </div>
          <button className='close-button' onClick={closeModal}>Close</button>
        </div>
        </Modal>
      </div>
    );
  };
