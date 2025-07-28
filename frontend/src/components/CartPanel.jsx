import { useCart } from "../context/CartContext";
import { createOrder } from "../api/orders";
import { useState } from "react";

function CartPanel() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleCheckout = async () => {
    setError("");
    setSuccessMsg("");
    if (cart.length === 0) {
      setError("Cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await createOrder(cart);
      setSuccessMsg(`Order #${response.order_id} placed successfully!`);
      clearCart();
    } catch (err) {
      const errorValues = Object.values(err);
      setError(errorValues.flat().join(", "));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🛒 Cart Summary</h2>

      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}

      {cart.length === 0 ? (
        <p className="text-red-500 text-center">Cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span className="font-medium">
                  {item.name} x{" "}
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    className="w-12 text-center border rounded ml-2"
                  />
                </span>
                <div>
                  ₱ {(item.price * item.quantity).toFixed(2)}{" "}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 ml-3 text-sm"
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 text-right">
            <p className="font-semibold">Total Items: {totalItems}</p>
            <p className="font-bold text-blue-700">Total: ₱ {totalPrice.toFixed(2)}</p>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {loading ? "Processing..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPanel;
