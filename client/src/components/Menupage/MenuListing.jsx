const MenuListing = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center pt-20 font-text1">
        <p className="text-gray-500 text-2xl">Menu not found.</p>
      </div>
    );
  }

  const groupedMenu = data.reduce((acc, item) => {
    if (!acc[item.category.name]) {
      acc[item.category.name] = [];
    }
    acc[item.category.name].push(item);
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