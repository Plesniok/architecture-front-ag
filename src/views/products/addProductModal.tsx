import React, { useState } from 'react';
import RequestSender from '../../services/requestSender';
import { ServiceResponse } from '../../models/responseData';

const AddProductModal = ({ isOpen, onClose }) => {
  const [productName, setProductName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  
  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleCategoryIdChange = (event) => {
    setCategoryId(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const addProductResponse: ServiceResponse<null> | null = 
      await RequestSender.post<null>(
        `product`,
        {
          "name": productName,
          "categoryId": categoryId
        }
      );

      if (addProductResponse?.httpStatus !== 200 && addProductResponse?.data !== undefined){
        alert("Error during login: " + addProductResponse?.httpStatus)
      }

    onClose(); // Close the modal after submitting
  };

  return (
    <div className={`modal ${isOpen ? 'add-product-button-opened' : 'add-product-button-closed'}`}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="productName">Product Name:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={handleProductNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="categoryId">Category ID:</label>
            <input
              type="number"
              id="categoryId"
              value={categoryId}
              onChange={handleCategoryIdChange}
            />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
};

const AddProductButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <button onClick={openModal}>Add Product</button>
      <AddProductModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default AddProductButton;
