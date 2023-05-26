import { API_URL } from "../utils/config";
import axios from "axios"
// Simulated API call to fetch restaurant profile data
export const fetchRestoProfile= async (idR) => {
    try {
      // Make an HTTP request to your API endpoint
      const response =  await axios.get(`${API_URL}/ProfilResto?id=${idR}`);
    
  
      // Return the fetched profile data
      return  response.data;
    } catch (error) {
      // Handle any errors that occurred during the API call
      throw new Error('Failed to fetch restaurant profile');
    }
  };