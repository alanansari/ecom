import { useContext } from "react";
import Categories from "./Categories";
import SearchBar from "./SearchBar";
import Account from "../../assets/icons/account.svg";
import Cart from "../../assets/icons/cart.svg";
import { CartContext } from "../../context/cart";
import { Link } from "react-router";

const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <nav className='bg-white fixed px-4 py-2 gap-4 flex box-border top-0 w-full z-50 shadow-[0px_5px_8px_1px_rgba(0,_0,_0,_0.1)]'>
      <Link to="/" className='text-sm md:text-2xl font-bold'>ARNGREN.net</Link>
      <Categories />
      <SearchBar />
      <a href="#" className="flex flex-nowrap items-center md:gap-2 md:px-4 box-border"><img src={Account} className="w-8 h-8" alt="account" /><div className="hidden md:block">Profile</div></a>
      <Link to="/cart" className="flex flex-nowrap items-center md:gap-2 md:px-4 box-border"><img src={Cart} className="w-8 h-8" alt="account" /><div className="hidden md:flex w-fit text-nowrap">Cart ({cart.totalItems})</div></Link>
    </nav>
  )
};

export default Header;
