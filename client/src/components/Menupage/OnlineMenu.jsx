import { useState, useEffect, useContext } from "react";
import { FaPlusCircle, FaMinusCircle, FaPlus } from "react-icons/fa";
import CartContext from "../../context/Cart/CartContext.jsx";
import beefPho from "../../assets/dishes/beefPho.jpg";
import grilledSalmonTeriyaki from "../../assets/dishes/grilledSalmonTeriyaki.jpg";
import lemongrassTea from "../../assets/dishes/lemongrassTea.jpg";
import misoSoup from "../../assets/dishes/misoSoup.jpg";
import padThai from "../../assets/dishes/padThai.jpg";

const OnlineMenu = ({ data, categories }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);
  const [showGridView, setShowGridView] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [filteredData, setFilteredData] = useState(data);

  const fallbackImages = [
    beefPho,
    grilledSalmonTeriyaki,
    lemongrassTea,
    misoSoup,
    padThai
  ];

  const getDishImage = (dishId) => {
    const index = dishId % fallbackImages.length;
    return fallbackImages[index];
  };

  useEffect(() => {
    if (!searchQuery && category === "All") {
      data && setFilteredData(data);
    }
    else if (searchQuery) {
      const filtered = category === "All" ?
        data.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())) :
        data.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) && item.category.name.toLowerCase() == category.toLowerCase()
        );
      setFilteredData(filtered);
    }
    else if (category !== "All") {
      const filtered = data.filter(item =>
        item.category.name.toLowerCase() === category.toLowerCase()
      );
      setFilteredData(filtered);
    }
  }
    , [searchQuery, category, data]);

  return (
    <>
      <div className="w-full py-10 flex flex-col md:flex-row gap-3 justify-between border-gray-300 border-t">
        <input
          type="text"
          name="search"
          id="search"
          className="h-fit bg-white border px-2 py-1"
          placeholder="Search for a dish..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex flex-col-reverse lg:flex-row gap-3 md:gap-1 lg:gap-5 md:items-end">

          <div className="bg-gray-200 text-sm text-gray-500 w-fit leading-none border-2 border-gray-200 my-auto">
            <button
              className={`transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-2 py-1 ${showGridView && "active"}`}
              onClick={() => setShowGridView(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button
              className={`transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-2 py-1 ${!showGridView && "active"}`}
              onClick={() => setShowGridView(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="fill-current w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex md:items-center h-full">
            <div className="flex items-center text-gray-400 border-y border-l px-2 md:h-full">Category: </div>
            <select name="categoryFilter" id="categoryFilter" className="bg-white text-gray-700 h-full w-fit border py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='All'>All</option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>{category.name}</option>
                ))
              }
            </select>
          </div>

        </div>
      </div>

      <div className={`grid font-text1  ${showGridView ? "md:grid-cols-3 gap-5 lg:gap-10" : "grid-cols-1"}`}>

        {filteredData && filteredData.length > 0 ? (

          filteredData.map((dish) => (
            <div key={dish.id} className={`flex py-5 md:p-5 ${showGridView ? "flex-col border shadow space-y-5" : "h-[180px] md:h-[200px] gap-5 lg:gap-10"}`}>
              <div className={showGridView ? "h-[180px] lg:h-[300px] relative flex justify-center group" : "h-full"}>
                <img
                  src={getDishImage(dish.id)}
                  alt={dish.name}
                  loading="lazy"
                  className={`shadow-lg transition-all duration-500 ${showGridView ? "absolute size-[90%] z-10 group-hover:size-full" : "max-w-fit w-[150px] md:w-[200px] h-full"}`}
                />
                <div
                  className={`absolute bottom-0 h-1/2 w-full bg-white transition-all duration-300 group-hover:bg-red-900 group-hover:h-full ${!showGridView && "hidden"}`}
                ></div>
              </div>
              <div className={`flex justify-between ${showGridView ? "flex-col lg:flex-row text-center lg:text-left items-center gap-2 lg:gap-0" : "flex-col items-start"}`}>
                <div>
                  <h2 className="tex-sm md:text-xl font-semibold">{dish.name}</h2>
                  <h3 className="text-sm md:text-xl font-semibold text-green-700">₹ {dish.price}</h3>
                  <p className={`text-xs md:text-md lg:text-lg font-medium text-gray-600 ${showGridView && "hidden"}`}>{dish.description}</p>
                </div>


                {cart?.cartItems && (() => {
                  const cartItem = cart.cartItems.find(item => item.menuItem?.id === dish.id);
                  return cartItem && cartItem?.quantity !== 0 ?
                    <div className="flex items-center space-x-1 border-2 border-green-500 rounded">
                      <button
                        onClick={() => {
                          if (cartItem?.quantity === 1) { removeFromCart(dish.id); }
                          else { addToCart(dish.id, -1); }
                        }}
                        className="py-1 px-2 md:p-2 text-green-500 hover:text-green-700"
                      >
                        <FaMinusCircle />
                      </button>
                      <span>{cartItem.quantity}</span>
                      <button
                        onClick={() => addToCart(dish.id, 1)}
                        className="py-1 px-2 md:p-2 text-green-500 hover:text-green-700"
                      >
                        <FaPlusCircle />
                      </button>
                    </div> :
                    <button
                      onClick={() => addToCart(dish.id, 1)}
                      className="flex justify-between items-center gap-x-2 border-2 border-green-500 rounded px-3 py-1 text-green-600 hover:text-green-700 hover:font-semibold"
                    >
                      Add <FaPlus className="text-sm" />
                    </button>;
                })()}


              </div>
            </div>
          ))

        ) : (

          <div className="w-full h-full flex items-center justify-center pt-20">
            <p className="text-gray-500 text-xl">No dishes found.</p>
          </div>

        )}

      </div>
    </>
  );
};

export default OnlineMenu;