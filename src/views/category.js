import React, { useEffect, useState } from "react";
import './products.css';
import axios from "axios";

const Category = () => {
    const [category, setCategory] = useState([]);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await axios.get('http://localhost:3003/categories');
                setCategory(response.data);
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };
        fetchCategory();
    }, []);


    return (
        <div>
        <button>Add</button> {/* Gọi hàm handleAddProduct */}
            <h2>Category Management</h2>
            <table>
                <thead>
                    <tr>
                        <th>Category Id</th>
                        <th>Name Category</th>
                        <th>Image</th>
                        <th>Revise</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {category.map((category) => (
                        <tr key={category.category_id}>
                        <td>{category.category_id}</td>
                        <td>{category.name_category}</td>   
                        <td>
                      </td>                                                 
                        <td>
              <button>Revise</button>
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
export default Category;
