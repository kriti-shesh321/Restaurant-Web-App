import { useContext, useEffect, useState } from "react";
import MenuContext from "../../context/Menu/MenuContext.jsx";
import { Link } from "react-router-dom";
import CartContext from "../../context/Cart/CartContext.jsx";

const ExploreFood = () => {
  const { onlineMenu } = useContext(MenuContext);
  const { addToCart } = useContext(CartContext);
  const [menuData, setMenuData] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const data = await onlineMenu(8);
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div className="font-text1 bg-white py-20">
      <div className="mx-5 md:mx-20 lg:mx-32 space-y-10">

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-5 md:gap-0">
          <h1 className="md:basis-1/2 text-lg md:text-3xl lg:text-5xl font-bold text-black">Experience a diverse range of flavourful dishes</h1>
          <Link
            to="/menu"
            className="bg-black text-white px-2 md:px-3 py-1 md:py-2 border hover:scale-110 transition-transform hover:bg-cream hover:text-black hover:border hover:border-black"
          >
            Checkout Full Menu
          </Link>
        </div>

        <div className="flex flex-wrap gap-y-5 lg:gap-y-10 justify-evenly md:justify-between text-center md:text-left">

          {menuData && menuData.map((dish) => (
            <div key={dish.id} className="flex flex-col w-72 gap-2">
              <div className="relative bg-cream group">
                <button onClick={() => addToCart(dish.id, 1)} className="absolute bottom-5 left-20 bg-black text-white px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:border-2 hover:border-maroon">
                  Add To Cart
                </button>
                <img
                  src={dish.imageURL}
                  alt={dish.name}
                  className="h-56 group-hover:opacity-50 transition-opacity duration-300"
                />
              </div>
              <h3 className="text-xl font-medium">{dish.name}</h3>
              <p className="text-gray-700">{dish.description}</p>
              <p className="font-bold md:font-medium">₹ {dish.price}</p>
            </div>
          ))
          }

        </div>
      </div>
    </div>
  );
};

export default ExploreFood;