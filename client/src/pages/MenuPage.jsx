import { useState } from "react";
import MenuListing from "../components/Menupage/MenuListing";
import OnlineMenu from "../components/Menupage/OnlineMenu";

const MenuPage = () => {
  const [showOnlineMenu, setShowOnlineMenu] = useState(true);

  return (
    <>
      <div className="font-text1 w-full font-bold text-xl px-5 lg:px-48 pt-12 pb-5">
        <button
          onClick={() => setShowOnlineMenu(prevState => !prevState)}
          className={`w-40 bg-cream shadow-lg border-y border-l border-maroon hover:scale-105 ${showOnlineMenu && 'bg-maroon text-white border-black'}`}
        >
          Order Online
        </button>
        <button
          onClick={() => setShowOnlineMenu(prevState => !prevState)}
          className={`w-40 bg-cream shadow-lg border-y border-r border-maroon hover:scale-105 ${!showOnlineMenu && 'bg-maroon text-white border-black'}`}
        >
          Menu List
        </button>
      </div>

      <div className="px-5 lg:px-48 pb-20">
        {
          showOnlineMenu
            ? <OnlineMenu />
            : <MenuListing />
        }
      </div>
    </>
  );
};

export default MenuPage;