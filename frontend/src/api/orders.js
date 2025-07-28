import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

export const createOrder = async (cartItems) => {
  try {
    const items = cartItems.map((item) => ({
      product: item.id,
      quantity: item.quantity,
    }));

    const response = await axios.post(`${BASE_URL}/orders/`, {
      items: items,
    });

    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Order creation failed" };
  }
};

export const updateOrderItem = async (id, quantity) => {
  return axios.put(`${BASE_URL}/order-items/${id}/`, { quantity });
};

export const deleteOrderItem = async (id) => {
  return axios.delete(`${BASE_URL}/order-items/${id}/`);
};

export const getUserOrders = (token) => {
  return axios.get('/api/my-orders/', {
    headers: { Authorization: `Bearer ${token}` },
  });
};