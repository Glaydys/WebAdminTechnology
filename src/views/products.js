import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './products.css';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3003/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);


  return (
    <div>
      <button onClick={()=>{navigate('/products/FormAddProduct')}}>Add</button> {/* Gọi hàm handleAddProduct */}
      <h2>Product Management</h2>
      <table>
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Category ID</th>
            <th>Name product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Image</th>
            <th>Revise</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id}>
              <td>{product.product_id}</td>
              <td>{product.category_id}</td>
              <td>{product.name_product}</td>
              <td>
                {product.price !== undefined && product.price !== null
                  ? product.price.toLocaleString('vi-VN') + ' VNĐ'
                  : 'Price not available'}
              </td>
              <td>{product.quantity}</td>
              <td>
                <img src={`${product.image_product}`} alt={product.name_product} style={{ width: '100px' }} />
              </td>
              <td>
              <button onClick={() => navigate(`/reviseProduct/${product.product_id}`)}>Revise</button>
              </td>
              <td>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
