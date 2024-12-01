import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import CoffeeCard from "../components/CoffeeCard"; // Import CoffeeCard component
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

const Home = () => {
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
      </div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </>
  );
};

export default Home;
