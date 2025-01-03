const MenuListing = () => {
  const menuCategories = ["Apetizers", "Soups", "Beef", "Chicken", "Veg", "Seafood"];

  const menu = [
    {
      id: 1,
      name: "Egg Roll",
      description: "lorem ipsum",
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

  const groupedMenu = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-red-950 font-title text-cream px-10 md:px-20 py-10 mt-10">
      <h1 className="text-5xl font-bold mb-10 md:text-center">Our Menu</h1>

      <div className="grid md:grid-cols-2 gap-10 md:gap-16">

        {Object.keys(groupedMenu).map((category) => (
          <div key={category} className="">

            <h2 className="text-2xl font-bold pb-2 mb-4 border-b">{category}</h2>
            <ul className="space-y-2">
              {groupedMenu[category].map((dish) => (
                <li
                  key={dish.id}
                  className="flex justify-between text-xl pb-2"
                >
                  <span className="font-medium">{dish.name}</span>
                  <span className="text-green-600 font-semibold">
                    ₹ {parseFloat(dish.price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}

      </div>
    </div>
  );
};
export default MenuListing;