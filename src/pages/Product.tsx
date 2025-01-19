import { useContext } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer";
import { CartContext } from "../context/cart";
import products from "../data/Products.json";

const Product = () => {
  const { productId } = useParams();
  const { setCart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(productId!));

  if (!product) {
    return <h1 className="text-center text-2xl">Product not found</h1>;
  }

  const addToCart = () => {
    setCart((prevCart: any) => {
      const existingProduct = prevCart.items[product.id];
      if (existingProduct) {
        return {
          ...prevCart,
          items: {
            ...prevCart.items,
            [product.id]: {
              ...existingProduct,
              quantity: existingProduct.quantity + 1,
            },
          },
          totalItems: prevCart.totalItems + 1,
        };
      }
      return {
        ...prevCart,
        items: {
          ...prevCart.items,
          [product.id]: {
            id: product.id,
            name: product.name,
            image: product.image,
            price: product.price,
            quantity: 1,
          },
        },
        totalItems: prevCart.totalItems + 1,
      };
    });
  };

  return (
    <div className="p-0 m-0 w-[100vw] box-border">
      <Navbar />

      <div className="flex flex-col md:flex-row mt-10 p-20 gap-6">
        <div className="w-full md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-lg text-gray-600">NOK {product.price}</p>
          <p className="text-gray-700">{product.description}</p>
          <div className="flex items-center gap-2">
            <span className="text-yellow-500">★ {product.rating}</span>
            <span className="text-sm text-gray-500">(Based on reviews)</span>
          </div>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            onClick={addToCart}
          >
            Add to Cart
          </button>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold">Comments</h2>
            {product.reviews && product.reviews.length > 0 ? (
              <div className="space-y-4 mt-4">
                {product.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 border rounded-lg bg-gray-100"
                  >
                    <p className="text-gray-800 font-medium">
                      {review.comment}
                    </p>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>- {review.author}</span>
                      <span>★ {review.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-2">No comments available.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
