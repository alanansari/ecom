import { useContext } from "react";
import { useNavigate } from "react-router";
import products from "../data/Products.json";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/variants";
import { CartContext } from "../context/cart";

const PopularProducts = () => {

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

  const settings = {
    accessibility: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="flex flex-col justify-center p-8 bg-gradient-to-r from-amber-400 to-emerald-400">
      <motion.div
        variants={fadeIn("up", 0.05)}
        initial="hidden"
        whileInView={"show"}
      >
        <div className="text-white text-4xl font-semibold">
          Popular Products
        </div>
        <div className="p-4">
          <Slider {...settings}>
            {products.filter((p)=>p.tags.includes('popular')).map((product) => (
              <div
                className="flex flex-col p-4 bg-white rounded-2xl shadow-md cursor-pointer"
                key={product.id}
                onClick={() => handleClick(product.id)}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
                <div className="text-lg font-semibold mt-2">{product.name}</div>
                <div className="text-sm text-gray-500">
                  {product.description}
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="text-lg font-bold mt-2 flex justify-center items-center">
                    NOK {product.price}
                  </div>
                  <button className="border transition-all border-black text-sm font-semibold hover:bg-black hover:text-white p-2 px-4 rounded-full mt-4 w-fit"
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </motion.div>
    </div>
  );
};

export default PopularProducts;
