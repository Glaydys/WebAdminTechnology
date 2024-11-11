import axios from 'axios';
import './Category.css';
import React, { useEffect, useState } from 'react';
import { Stack } from '@mui/material';
import { useParams } from 'react-router-dom';

function Productdetails() {
    const { id } = useParams();  
    const [product, setProduct] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await axios.get(`http://localhost:3003/products/${id}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (response.status === 200) setProduct(response.data);
            } catch (error) {
                console.log(error?.message);
            }
        }
        fetchProduct();
    }, [id]);

    return (
        <div className="product-details-container">
            {product && (  
                <Stack spacing={3}>
                    <img
                        src={product.image_product} 
                        alt={product.name_product}
                    />
                    <Stack>
                        <p className="product-name">{product.name_product}</p>
                        <p className="product-price">${product.price}</p>
                        <p className="product-description">{product.description}</p>
                    </Stack>
                </Stack>
            )}
        </div>
    );
    
}
export default Productdetails;
