import axios from 'axios';
import { API_URL } from "../utils/config";
// Add phone number to a restaurant
const addPhone = async (restoId, phone) => {
  try {
    const response = await axios.put(`${API_URL}/addPhone/${restoId}`, { phone });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add phone number');
  }
};

// Delete phone number from a restaurant
const deletePhone = async (restoId) => {
  try {
    const response = await axios.delete(`${API_URL}/deletePhone/${restoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete phone number');
  }
};

// Add cuisine to a restaurant
const addCuisine = async (restoId, image, name) => {
  try {
    const response = await axios.post(`${API_URL}/addCuisine/${restoId}/cuisines`, { image, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add cuisine');
  }
};

// Delete cuisine from a restaurant
const deleteCuisine = async (restoId, cuisineId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteCuisine${restoId}/${cuisineId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete cuisine');
  }
};

// Add description to a restaurant
const addDescription = async (restoId, description) => {
  try {
    const response = await axios.put(`${API_URL}/addDescription/${restoId}`, { description });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add description');
  }
};

// Delete description from a restaurant
const deleteDescription = async (restoId) => {
  try {
    const response = await axios.delete(`${API_URL}/deleteDescription/${restoId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete description');
  }
};

export {
  addPhone,
  deletePhone,
  addCuisine,
  deleteCuisine,
  addDescription,
  deleteDescription,
};
