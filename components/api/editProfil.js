import axios from 'axios';

// Add phone number to a restaurant
const addPhone = async (restoId, phone) => {
  try {
    const response = await axios.put(`/api/restaurants/${restoId}/phone`, { phone });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add phone number');
  }
};

// Delete phone number from a restaurant
const deletePhone = async (restoId) => {
  try {
    const response = await axios.delete(`/api/restaurants/${restoId}/phone`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete phone number');
  }
};

// Add cuisine to a restaurant
const addCuisine = async (restoId, image, name) => {
  try {
    const response = await axios.post(`/api/restaurants/${restoId}/cuisines`, { image, name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add cuisine');
  }
};

// Delete cuisine from a restaurant
const deleteCuisine = async (restoId, cuisineId) => {
  try {
    const response = await axios.delete(`/api/restaurants/${restoId}/cuisines/${cuisineId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete cuisine');
  }
};

// Add description to a restaurant
const addDescription = async (restoId, description) => {
  try {
    const response = await axios.put(`/api/restaurants/${restoId}/description`, { description });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to add description');
  }
};

// Delete description from a restaurant
const deleteDescription = async (restoId) => {
  try {
    const response = await axios.delete(`/api/restaurants/${restoId}/description`);
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
