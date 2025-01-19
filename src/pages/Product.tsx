import { useContext } from "react";
import { useParams } from "react-router";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer";
import { CartContext } from "../context/cart";
import products from "../data/Products.json";

const Product = () => {
  const { productId } = useParams();
  const { setCart, cart } = useContext(CartContext);

  const product = products.find((p) => p.id === parseInt(productId!));

  if (!product) {
    return <h1 className="text-center text-2xl">Product not found</h1>;
  }

  const productInCart = cart.items[product.id];

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

  const removeFromCart = () => {
    setCart((prevCart: any) => {
      const existingProduct = prevCart.items[product.id];
      if (existingProduct && existingProduct.quantity > 1) {
        return {
          ...prevCart,
          items: {
            ...prevCart.items,
            [product.id]: {
              ...existingProduct,
              quantity: existingProduct.quantity - 1,
            },
          },
          totalItems: prevCart.totalItems - 1,
        };
      } else {
        const newItems = { ...prevCart.items };
        delete newItems[product.id];

        return {
          ...prevCart,
          items: newItems,
          totalItems: prevCart.totalItems - 1,
        };
      }
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

          {/* Quantity and Add to Cart Logic */}
          <div className="flex items-center gap-4 mt-4">
            {productInCart ? (
              <>
                <button
                  className="border transition-all border-black text-sm font-semibold hover:bg-black hover:text-white p-2 px-4 rounded-full"
                  onClick={removeFromCart}
                >
                  -
                </button>
                <span className="text-lg font-semibold">{productInCart.quantity}</span>
                <button
                  className="border transition-all border-black text-sm font-semibold hover:bg-black hover:text-white p-2 px-4 rounded-full"
                  onClick={addToCart}
                >
                  +
                </button>
              </>
            ) : (
              <button
                className="border transition-all border-black text-sm font-semibold hover:bg-black hover:text-white p-2 px-4 rounded-full"
                onClick={addToCart}
              >
                Add to Cart
              </button>
            )}
          </div>

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
