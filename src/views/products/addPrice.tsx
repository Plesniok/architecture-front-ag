import React, { useState } from 'react';
import RequestSender from '../../services/requestSender';
import { ServiceResponse } from '../../models/responseData';

const AddPriceModal = ({ isOpen, onClose, productId }) => {
  const [priceValue, setpriceId] = useState('');
  
  const handlePriceNameChange = (event) => {
    setPriceName(event.target.value);
  };

  const handlepriceIdChange = (event) => {
    setpriceId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const addPriceResponse: ServiceResponse<null> | null = 
      await RequestSender.post<null>(
        `price/${productId}`,
        {
          "value": priceValue
        }
      );

      if (addPriceResponse?.httpStatus !== 200 && addPriceResponse?.data !== undefined){
        alert("Error during login: " + addPriceResponse?.httpStatus)
      }

    onClose(); // Close the modal after submitting
  };

  return (
    <div className={`modal ${isOpen ? 'add-price-button-opened' : 'add-price-button-closed'}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Price</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="priceValue">price value:</label>
            <input
              type="number"
              id="priceValue"
              value={priceValue}
              onChange={handlepriceIdChange}
            />
          </div>
          <button type="submit">Add Price</button>
        </form>
      </div>
    </div>
  );
};

const AddPriceButton = ({productId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Add Price</button>
      <AddPriceModal isOpen={isModalOpen} onClose={closeModal} productId={productId} />
    </div>
  );
};

export default AddPriceButton;
