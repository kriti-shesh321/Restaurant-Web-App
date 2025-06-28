import { useEffect, useState, useContext } from "react";
import MenuContext from "../context/Menu/MenuContext.jsx";
import MenuListing from "../components/Menupage/MenuListing";
import OnlineMenu from "../components/Menupage/OnlineMenu";
import MenuCategoryContext from "../context/Menu/MenuCategoryContext.jsx";

const MenuPage = () => {
  const {onlineMenu, offlineMenu} = useContext(MenuContext);
  const {getMenuCategories} = useContext(MenuCategoryContext);

  const [showOnlineMenu, setShowOnlineMenu] = useState(true);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuData, setMenuData] = useState(null);
  
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = showOnlineMenu ? await onlineMenu() : await offlineMenu();
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    }; 
    fetchMenu();
  }, [showOnlineMenu]);

  useEffect(() => {
    try {
      const fetchMenuCategories = async () => {
        const categories = await getMenuCategories();
        setMenuCategories(categories);
      };
      fetchMenuCategories();
    } catch (error) {
      console.error("Error fetching menu categories:", error);
    }
  }, []);


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
            ? <OnlineMenu data={menuData} categories={menuCategories}/>
            : <MenuListing data={menuData}/>
        }
      </div>
    </>
  );
};

export default MenuPage;