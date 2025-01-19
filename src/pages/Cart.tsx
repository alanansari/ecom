import { useContext } from "react";
import Navbar from "../components/Navbar/Nav";
import Footer from "../components/Footer";
import { CartContext } from "../context/cart";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  const incrementQuantity = (productId: number) => {
    setCart((prevCart: any) => {
      const product = prevCart.items[productId];
      return {
        ...prevCart,
        items: {
          ...prevCart.items,
          [productId]: {
            ...product,
            quantity: product.quantity + 1,
          },
        },
        totalItems: prevCart.totalItems + 1,
      };
    });
  };

  const decrementQuantity = (productId: number) => {
    setCart((prevCart: any) => {
      const product = prevCart.items[productId];
      if (product.quantity === 1) {
        const { [productId]: removed, ...remainingItems } = prevCart.items; // Remove item from cart
        return {
          ...prevCart,
          items: remainingItems,
          totalItems: prevCart.totalItems - 1,
        };
      }
      return {
        ...prevCart,
        items: {
          ...prevCart.items,
          [productId]: {
            ...product,
            quantity: product.quantity - 1,
          },
        },
        totalItems: prevCart.totalItems - 1,
      };
    });
  };

  const deleteItem = (productId: number) => {
    setCart((prevCart: any) => {
      const { [productId]: removed, ...remainingItems } = prevCart.items; // Remove item completely
      return {
        ...prevCart,
        items: remainingItems,
        totalItems: prevCart.totalItems - 1,
      };
    });
  };

  const totalCost = Object.values(cart.items).reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="p-0 m-0 w-[100vw] box-border mt-12">
      <Navbar />

      <div className="flex flex-col md:flex-row p-4 gap-6 md:h-[85vh] ">
        <div className="w-full md:w-2/3">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          {Object.values(cart.items).length > 0 ? (
            <div className="space-y-4">
              {Object.values(cart.items).map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="text-lg font-medium">{item.name}</h3>
                      <p className="text-sm text-gray-500">NOK {item.price}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="px-3 py-1 bg-gray-300 rounded"
                      onClick={() => decrementQuantity(item.id)}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-300 rounded"
                      onClick={() => incrementQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => deleteItem(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>

        <div className="w-full md:w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Items</span>
              <span>{cart.totalItems}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Cost</span>
              <span>NOK {totalCost}</span>
            </div>
          </div>
          <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg">
            Checkout
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
