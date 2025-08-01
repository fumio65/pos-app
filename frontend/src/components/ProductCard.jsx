import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-xl shadow p-4 bg-white hover:scale-[1.02] transition">
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover rounded-md mb-2"
        />
      )}
      <h2 className="font-semibold text-lg">{product.name}</h2>
      <p className="text-sm text-gray-600">{product.description}</p>
      <p className="mt-2 font-bold text-blue-600">₱ {product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;
