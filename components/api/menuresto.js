import axios from 'axios';

const API_URL = 'http://your-backend-url.com/api'; // Replace with your backend API URL

// Delete a category from a restaurant's menu
export const deleteCategory = async (restoId, categoryId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteCategory/${restoId}/${categoryId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

// Delete an item from a category in a restaurant's menu
export const deleteItem = async (restoId, categoryId, itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteItem/${restoId}/categories/${categoryId}/items/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};
