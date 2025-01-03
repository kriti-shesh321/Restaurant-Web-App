import { lazy, useState } from "react";
import { FaBasketShopping } from 'react-icons/fa6';

const OnlineMenu = () => {
  const [showGridView, setShowGridView] = useState(true);
  const [category, setCategory] = useState("All");
  const menuCategories = ["Apetizers", "Soups", "Beef", "Chicken", "Veg", "Seafood"];

  const menu = [
    {
      id: 1,
      name: "Egg Roll",
      description: "lorem ipsum Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis.",
      price: "100.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Apetizers"
    },
    {
      id: 2,
      name: "Fried Wonton",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Apetizers"
    },
    {
      id: 3,
      name: "Chicken Skewer",
      description: "lorem ipsum",
      price: "200.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Apetizers"
    },
    {
      id: 1,
      name: "Egg Drop Soup",
      description: "lorem ipsum",
      price: "120.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Soups",
    },
    {
      id: 2,
      name: "Wonton Soup",
      description: "lorem ipsum",
      price: "170.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Soups",
    },
    {
      id: 3,
      name: "Hot & Sour Soup",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Soups",
    },
    {
      id: 4,
      name: "Chicken Noodle Soup",
      description: "lorem ipsum",
      price: "220.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Soups",
    },
    {
      id: 1,
      name: "Egg Drop Soup",
      description: "lorem ipsum",
      price: "120.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Beef",
    },
    {
      id: 2,
      name: "Wonton Soup",
      description: "lorem ipsum",
      price: "170.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Beef",
    },
    {
      id: 3,
      name: "Hot & Sour Soup",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Beef",
    },
    {
      id: 1,
      name: "Egg Drop Soup",
      description: "lorem ipsum",
      price: "120.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Chicken",
    },
    {
      id: 2,
      name: "Wonton Soup",
      description: "lorem ipsum",
      price: "170.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Chicken",
    },
    {
      id: 3,
      name: "Hot & Sour Soup",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Chicken",
    },
    {
      id: 4,
      name: "Chicken Noodle Soup",
      description: "lorem ipsum",
      price: "220.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Chicken",
    },
    {
      id: 1,
      name: "Egg Drop Soup",
      description: "lorem ipsum",
      price: "120.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Vegetarian",
    },
    {
      id: 2,
      name: "Wonton Soup",
      description: "lorem ipsum",
      price: "170.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Vegetarian",
    },
    {
      id: 3,
      name: "Hot & Sour Soup",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Vegetarian",
    },
    {
      id: 4,
      name: "Chicken Noodle Soup",
      description: "lorem ipsum",
      price: "220.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Vegetarian",
    },
    {
      id: 5,
      name: "Spome soup",
      description: "lorem ipsum",
      price: "100.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Vegetarian",
    },
    {
      id: 1,
      name: "Egg Drop Soup",
      description: "lorem ipsum",
      price: "120.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Seafood",
    },
    {
      id: 2,
      name: "Wonton Soup",
      description: "lorem ipsum",
      price: "170.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Seafood",
    },
    {
      id: 3,
      name: "Hot & Sour Soup",
      description: "lorem ipsum",
      price: "150.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Seafood",
    },
    {
      id: 4,
      name: "Chicken Noodle Soup",
      description: "lorem ipsum",
      price: "220.0",
      imageUrl: "https://cdn.media.amplience.net/i/japancentre/recipes-1650-omurice-with-beef-and-demi-glace-sauce/Omurice-with-beef-and-demi-glace-sauce?$poi$&w=1200&h=630&sm=c&fmt=auto",
      availability: true,
      category: "Seafood",
    },
  ];

  return (
    <>
      <div className="w-full py-10 flex flex-col md:flex-row gap-3 justify-between border-gray-300 border-t">
        <input type="text" name="search" id="search" className="h-fit bg-white border px-2 py-1" placeholder="Search for a dish..." />

        <div className="flex flex-col-reverse lg:flex-row gap-3 md:gap-1 lg:gap-5 md:items-end">

          <div className="bg-gray-200 text-sm text-gray-500 w-fit leading-none border-2 border-gray-200 my-auto">
            <button
              class={`transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-2 py-1 ${showGridView && "active"}`}
              onClick={() => setShowGridView(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current w-4 h-4"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
            </button>
            <button
              class={`transition-colors duration-300 ease-in focus:outline-none hover:text-blue-400 focus:text-blue-400 px-2 py-1 ${!showGridView && "active"}`}
              onClick={() => setShowGridView(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="fill-current w-4 h-4"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
            </button>
          </div>

          <div className="flex md:items-center h-full">
            <div className="flex items-center text-gray-400 border-y border-l px-2 md:h-full">Category: </div>
            <select name="categoryFilter" id="categoryFilter" className="bg-white text-gray-700 h-full w-fit border-y border-r py-1" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value='All'>All</option>
              {
                menuCategories.map((category, index) => (
                  <option id={index} value={category}>{category}</option>
                ))
              }
            </select>
          </div>

        </div>
      </div>

      <div className={`grid font-text1  ${showGridView ? "md:grid-cols-3 gap-5 lg:gap-10" : "grid-cols-1"}`}>

        {
          menu.map((dish) => (
            <div id={dish.id} className={`flex py-5 md:p-5 ${showGridView ? "flex-col border shadow space-y-5" : "h-[180px] md:h-[200px] gap-5 lg:gap-10"}`}>
              <div className={showGridView ? "h-[180px] lg:h-[300px] relative flex justify-center group" : "h-full"}>
                <img src={dish.imageUrl} alt={dish.name} className={`shadow-lg transition-all duration-500 ${showGridView ? "absolute w-[90%] h-[85%] z-10 group-hover:size-full" : "max-w-fit w-[150px] md:w-[200px] h-full"}`} />
                <div
                  className={`absolute bottom-0 h-1/2 w-full bg-white transition-all duration-300 group-hover:bg-red-900 group-hover:h-full ${!showGridView && "hidden"}`}
                ></div>
              </div>
              <div className={`flex justify-between ${showGridView ? "flex-col lg:flex-row text-center lg:text-left items-center md:gap-2 lg:gap-0" : "flex-col items-start"}`}>
                <div>
                  <h2 className="tex-sm md:text-xl font-semibold">{dish.name}</h2>
                  <h3 className="text-sm md:text-xl font-semibold text-green-700">₹ {dish.price}</h3>
                  <p className={`text-xs md:text-md lg:text-lg font-medium text-gray-600 ${showGridView && "hidden"}`}>({dish.description})</p>
                </div>
                <button className="h-fit lg:w-fit flex justify-center text-xl px-5 lg:px-3 py-1 md:py-2 rounded bg-green-100 text-black border border-green-700 hover:bg-green-700 hover:text-white hover:shadow-md"><FaBasketShopping /></button>
              </div>
            </div>
          ))
        }

      </div>
    </>
  );
};

export default OnlineMenu;