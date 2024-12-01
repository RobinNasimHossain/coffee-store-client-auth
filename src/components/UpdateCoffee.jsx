import { Link, useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { useState } from "react";

const UpdateCoffee = () => {
  const coffee = useLoaderData();
  const {
    _id,
    photo = "",
    name = "",
    chef = "",
    taste = "",
    details = "",
    supplier = "",
    category = "",
  } = coffee;

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    const form = e.target;
    const name = form.name.value.trim();
    const chef = form.chef.value.trim();
    const supplier = form.supplier.value.trim();
    const category = form.category.value.trim();
    const taste = form.taste.value.trim();
    const details = form.details.value.trim();
    const photo = form.photo.value.trim();

    // Check for empty fields
    const missingFields = [];
    if (!name) missingFields.push("Name");
    if (!chef) missingFields.push("Chef");
    if (!supplier) missingFields.push("Supplier");
    if (!category) missingFields.push("Category");
    if (!taste) missingFields.push("Taste");
    if (!details) missingFields.push("Details");
    if (!photo) missingFields.push("Photo");

    if (missingFields.length > 0) {
      Swal.fire({
        title: "Error!",
        text: `The following fields are required: ${missingFields.join(", ")}`,
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    // Validate photo URL
    try {
      new URL(photo);
    } catch (_) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid URL for the photo.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    const UpdateCoffee = {
      name,
      chef,
      supplier,
      category,
      taste,
      details,
      photo,
    };

    // API Call
    fetch(`http://localhost:4500/coffee/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UpdateCoffee),
    })
      .then((res) =>
        res.json().then((data) => {
          if (data.modifiedCount) {
            Swal.fire({
              title: "Success!",
              text: "Coffee Updated Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
          }
        })
      )
      .catch((err) => {
        Swal.fire({
          title: "Error!",
          text: "Failed to update coffee. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-purple-500">
        <div className="bg-slate-400 shadow-lg rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-2xl rounded mb-6 text-center font-bold text-black bg-green-300 p-5">
            Update Coffee: {name}
          </h2>
          <form onSubmit={handleUpdateSubmit} className="space-y-4">
            {/* Row 1: Name and Chef */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter coffee name"
                  defaultValue={name}
                  className={`w-full px-3 py-2 border ${
                    !name && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !name && (
                  <p className="text-red-500 text-sm">Name is required</p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="chef"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Chef
                </label>
                <input
                  type="text"
                  id="chef"
                  name="chef"
                  placeholder="Enter chef name"
                  defaultValue={chef}
                  className={`w-full px-3 py-2 border ${
                    !chef && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !chef && (
                  <p className="text-red-500 text-sm">Chef is required</p>
                )}
              </div>
            </div>
            {/* Row 2: Supplier and Taste */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="supplier"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Supplier
                </label>
                <input
                  type="text"
                  id="supplier"
                  name="supplier"
                  placeholder="Enter supplier name"
                  defaultValue={supplier}
                  className={`w-full px-3 py-2 border ${
                    !supplier && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !supplier && (
                  <p className="text-red-500 text-sm">Supplier is required</p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="taste"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Taste
                </label>
                <input
                  type="text"
                  id="taste"
                  name="taste"
                  placeholder="Enter taste profile"
                  defaultValue={taste}
                  className={`w-full px-3 py-2 border ${
                    !taste && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !taste && (
                  <p className="text-red-500 text-sm">Taste is required</p>
                )}
              </div>
            </div>
            {/* Row 3: Category and Details */}
            <div className="flex gap-4">
              <div className="w-1/2">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  placeholder="Enter category"
                  defaultValue={category}
                  className={`w-full px-3 py-2 border ${
                    !category && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !category && (
                  <p className="text-red-500 text-sm">Category is required</p>
                )}
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="details"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Details
                </label>
                <input
                  type="text"
                  id="details"
                  name="details"
                  placeholder="Enter coffee details"
                  defaultValue={details}
                  className={`w-full px-3 py-2 border ${
                    !details && formSubmitted
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring focus:ring-indigo-200`}
                />
                {formSubmitted && !details && (
                  <p className="text-red-500 text-sm">Details are required</p>
                )}
              </div>
            </div>
            {/* Photo URL */}
            <div className="form-control">
              <label
                htmlFor="photo"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Photo URL
              </label>
              <input
                type="text"
                id="photo"
                name="photo"
                placeholder="Enter photo URL"
                defaultValue={photo}
                className={`w-full px-3 py-2 border ${
                  !photo && formSubmitted ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring focus:ring-indigo-200`}
              />
              {formSubmitted && !photo && (
                <p className="text-red-500 text-sm">Photo URL is required</p>
              )}
            </div>
            <button
              type="submit"
              value="Update Coffee"
              className="w-full bg-indigo-500 font-bold text-white py-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
            >
              Update Coffee
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateCoffee;
