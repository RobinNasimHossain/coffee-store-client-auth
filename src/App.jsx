import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import CoffeeCard from "./components/CoffeeCard"; // Import CoffeeCard component
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const App = () => {
  const lodederCoffee = useLoaderData(); // Fetch the coffee data
  const [coffees, setCoffees] = useState(lodederCoffee);

  return (
    <>
      <div className="text-center p-7 m-3 bg-green-500 font-bold text-violet-600 rounded">
        Hot Hot Coffee : {coffees.length}
      </div>

      <div className="m-10">
        {/* Coffee Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee._id}
              coffee={coffee}
              coffees={coffees}
              setCoffees={setCoffees}
            />
          ))}
        </div>

        {/* Button to Add Coffee */}
        <div className="flex justify-center w-full mt-8">
          <Link
            className="sm:w-auto bg-red-500 font-bold text-white py-4 px-8 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-indigo-200 text-center"
            to="/addCoffee"
          >
            Add A Coffee
          </Link>
        </div>
      </div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default App;
