import axios from 'axios';
import './Category.css'; // Updated CSS file with new class names
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';

function Product() {
    const [products, setProducts] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const category_id = queryParams.get('category');  
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get(`http://localhost:3003/products/category/${category_id}`);
                if (response.status === 200) {
                    setProducts(response.data);
                }
            } catch (error) {
                console.log('Error fetching products:', error.message);
            }
        }
        if (category_id) fetchProducts();
    }, [category_id]);

    return (
        <div>
            <div >
                {products.length > 0 && 
                    products.map((product) => (
                        <Grid key={product.product_id} onClick={() => navigate(`/products/${product.product_id}`)} style={{ cursor: 'pointer' }}>
                            <div >
                                <img
                                    src={product.image_product} 
                                    alt={product.name_product}
                                />
                                <p>{product.name_product}</p>
                                <p >${product.price}</p>
                                <button>Add to Cart</button>
                            </div>
                        </Grid>
                    ))
                }
            </div>
        </div>
    );
}

export default Product;
