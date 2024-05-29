import React, { useState } from 'react';
import RequestSender from '../../services/requestSender';
import { ServiceResponse } from '../../models/responseData';

const AddCategoryModal = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState('');
  
  const handleCategoryNameChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const addCategoryResponse: ServiceResponse<null> | null = 
      await RequestSender.post<null>(
        `category`,
        {
          "name": categoryName,
        }
      );

      if (addCategoryResponse?.httpStatus !== 200 && addCategoryResponse?.data !== undefined){
        alert("Error during login: " + addCategoryResponse?.httpStatus)
      }

    onClose(); // Close the modal after submitting
  };

  return (
    <div className={`modal ${isOpen ? 'add-product-button-opened' : 'add-product-button-closed'}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="categoryName">Category Name:</label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleCategoryNameChange}
            />
          </div>
          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

const AddCategoryButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Add Category</button>
      <AddCategoryModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddCategoryButton;
