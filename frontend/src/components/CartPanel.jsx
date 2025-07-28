import { useCart } from "../context/CartContext";

function CartPanel() {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart } =
    useCart();

  if (cart.length === 0)
    return (
      <div className="p-4 bg-white rounded shadow text-center text-red-600">
        Cart is empty.
      </div>
    );

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">🛒 Cart Summary</h2>
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
      </div>
    </div>
  );
}

export default CartPanel;
