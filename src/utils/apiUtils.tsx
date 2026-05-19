import axios from 'axios';

export const apiRequest = async (endpoint: string, method: string, data?: any) => {
  try {
    const response = await axios({
      url: endpoint,
      method,
      data
    });
    console.log('Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Propagate the error so the caller can handle it
  }
};