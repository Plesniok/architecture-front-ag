// src/Dashboard.tsx
import React, { useEffect, useState } from 'react';
import { ServiceResponse } from '../../models/responseData';
import RequestSender from '../../services/requestSender';
import { ProductLabel } from '../../models/productLabel';
import AddProductButton from './addProductModal';
import AddCategoryButton from './addCategory';
import AddPriceButton from './addPrice';
import { useNavigate } from 'react-router-dom';

const Products: React.FC = () => {
  const [userRole, setUserRole] = useState<String>("")
  const [productsList, setProductsList] = useState<Array<Product>>([])
  const [productLabel, setProductLabel] = useState<ProductLabel | null>(null)
  const navigate = useNavigate();

  useEffect(() => {
      fetchUserRole()

      fetchAllProducts()
      const allProductsRefreshInterval = setInterval(() =>{
      fetchAllProducts()
    }, 10000)

    return () => {
      clearInterval(allProductsRefreshInterval)
    }
    
  },[])

  const fetchAllProducts = async () => {
    const allProductsResponse: ServiceResponse<Array<Product>> | null = 
      await RequestSender.get<Array<Product>>(
        "products",
      );

      if (allProductsResponse?.httpStatus !== 200 && allProductsResponse?.data !== undefined){
        alert("Error during login: " + allProductsResponse?.httpStatus)
      }

      setProductsList(allProductsResponse?.data ?? [])
  }

  const fetchUserRole = async () => {
    const roleResponse: ServiceResponse<String | null> | null = 
      await RequestSender.get<String | null>(
        "user/role",
      );

      if (roleResponse?.httpStatus !== 200 && roleResponse?.data !== undefined){
        alert("Error during login: " + roleResponse?.httpStatus)
      }

      setUserRole(roleResponse?.data ?? "")
  }

  const toggleProductExpansion = async (productId: number) => {
    if(productId === productLabel?.id){
      setProductLabel(null)
      return null
    }

    const productLabelResponse: ServiceResponse<ProductLabel> | null = 
      await RequestSender.get<ProductLabel>(
        `product/${productId}/label`,
      );

      if (productLabelResponse?.httpStatus !== 200 && productLabelResponse?.data !== undefined){
        alert("Error during login: " + productLabelResponse?.httpStatus)
      }

      setProductLabel(productLabelResponse?.data ?? null)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
  }
  
  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <h1>Products</h1>
      <p>Welcome to the Products!</p>
      <AddCategoryButton/>
      <AddProductButton/>
      <ul className="product-list">
        {productsList.map(product => (
          <li key={product.id} className="product-item" onClick={() => toggleProductExpansion(product.id)}>
            <div className="product-details">
              <h2>{product.name}</h2>
              <AddPriceButton productId={product.id}/>
              {productLabel?.id === product.id 
              ? (
                <div className="expanded-details">
                  <p>Category name: {productLabel?.category?.name}</p>
                  <p>Value: {productLabel?.price?.value}</p>
                  <p>Valid from: {productLabel?.price?.validFrom?.toString()}</p>
                </div>
              )
              : <></>
            }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
