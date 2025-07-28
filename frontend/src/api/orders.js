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
