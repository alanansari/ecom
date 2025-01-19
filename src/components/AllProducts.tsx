import { useState, useContext } from "react";
import categories from "../data/Categories.json";
import products from "../data/Products.json";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";
import { useNavigate } from "react-router";
import { CartContext } from "../context/cart";

const AllProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { setCart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/product/${id}`);
  };

  const addToCart = (product: any) => {
    setCart((prevCart:any) => {
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
    <div className="py-4">
      <div className="p-4 text-3xl font-semibold">All Products</div>
      <div className="flex flex-nowrap overflow-x-auto gap-2 px-4 no-scrollbar">
        <div
          className={`py-1 px-2 rounded-md ${
            selectedCategory === "All" ? "bg-blue-400" : "bg-blue-100"
          } inline-block cursor-pointer`}
          onClick={() => setSelectedCategory("All")}
        >
          All
        </div>
        {categories.map((category) => (
          <div
            className={`py-1 px-2 rounded-md ${
              selectedCategory === category.name ? "bg-blue-400" : "bg-blue-100"
            } inline-block cursor-pointer text-nowrap`}
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.name}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-8">
        {products
          .filter(
            (p) => p.category === selectedCategory || selectedCategory === "All"
          )
          .map((product, index) => (
            <motion.div
              variants={fadeIn("up", 0.05 * index)}
              initial="hidden"
              whileInView={"show"}
              className="flex flex-col p-4 bg-white border shadow-md cursor-pointer"
              key={product.id}
              onClick={() => handleClick(product.id)}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-48 w-full object-cover"
              />
              <div className="text-lg font-semibold mt-2">{product.name}</div>
              <div className="text-sm text-gray-500">{product.description}</div>
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="text-lg font-bold mt-2 flex justify-center items-center">
                  NOK {product.price}
                </div>
                <button
                  className="border transition-all border-black text-sm font-semibold hover:bg-black hover:text-white p-2 px-4 rounded-full mt-4 w-fit"
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product);
                  }}
                >
                  Add to cart
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
