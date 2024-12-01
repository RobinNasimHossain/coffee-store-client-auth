import React, { useState } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa"; // Import Toastify's styles
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
const CoffeeCard = ({ coffee, setCoffees, coffees }) => {
  const { _id, name, chef, supplier, category, taste, details, photo } = coffee;
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:4500/coffee/${_id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              setIsDeleted(true);
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
              const remaining = coffees.filter((coffee) => coffee._id !== _id);
              setCoffees(remaining);
            } else {
              Swal.fire({
                title: "Error!",
                text: "Something went wrong. Please try again later.",
                icon: "error",
              });
            }
          })
          .catch((err) => {
            Swal.fire({
              title: "Error!",
              text: "Something went wrong. Please try again later.",
              icon: "error",
            });
            // Handle the error here, for example, log it to the console
            console.error(err);
          });
      }
    });
  };

  if (isDeleted) {
    return null; // Return null if the coffee item has been deleted
  }

  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={photo || "/placeholder.jpg"} alt={name} />
      </figure>
      <div className="flex w-full m-4 items-center justify-between">
        <div>
          <p>Name: {name}</p>
          <p>Chef: {chef}</p>
          <p>Taste: {taste}</p>
          <p>Details: {details}</p>
          <p>Supplier: {supplier}</p>
          <p>Category: {category}</p>
        </div>
        <div className="card-actions justify-end join join-vertical">
          <button className="btn join-item hover:bg-blue-600">
            <FaEye className="mr-2" />
          </button>
          <Link
            to={`updateCoffee/${_id}`}
            className="btn join-item hover:bg-green-600"
          >
            <FaEdit className="mr-2" />
          </Link>
          <button
            type="button"
            onClick={() => handleDelete(_id)} // Trigger handleDelete on button click
            className="btn join-item bg-red-500 text-white hover:bg-red-600"
          >
            <FaTrashAlt className="mr-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
