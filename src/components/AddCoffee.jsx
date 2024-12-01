import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AddCoffee = () => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value;
    const chef = form.chef.value;
    const supplier = form.supplier.value;
    const category = form.category.value;
    const taste = form.taste.value;
    const details = form.details.value;
    const photo = form.photo.value;

    // Check if any field is empty
    if (
      !name ||
      !chef ||
      !supplier ||
      !category ||
      !taste ||
      !details ||
      !photo
    ) {
      Swal.fire({
        title: "Error!",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return; // Prevent form submission if any field is empty
    }

    // Validate name length (should be at least 3 characters)
    if (name.length < 3) {
      Swal.fire({
        title: "Error!",
        text: "Name must be at least 3 characters long.",
        icon: "error",
        confirmButtonText: "Okay",
      });
      return;
    }

    // Validate photo URL (check if it's a valid URL)
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

    const allCoffee = {
      name,
      chef,
      supplier,
      category,
      taste,
      details,
      photo,
    };

    console.log(allCoffee);

    // Add API call or other logic to handle `allCoffee` object
    fetch("http://localhost:4500/coffee", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(allCoffee),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
          if (data.insertedId) {
            Swal.fire({
              title: "Success!",
              text: "Coffee Added Successfully",
              icon: "success",
              confirmButtonText: "Cool",
            });
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-purple-500">
      <div className="bg-slate-400 shadow-lg rounded-lg p-6 max-w-lg w-full">
        <h2 className="text-2xl rounded mb-6 text-center font-bold text-black bg-green-300 p-5">
          Add Coffee Item
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
              />
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-indigo-200"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 font-bold text-white py-4 rounded-lg hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Add Coffee
          </button>
          <div className="flex justify-center w-full mt-4">
            <Link
              className="w-full bg-red-500 font-bold text-white py-4 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-indigo-200 text-center"
              to="/"
            >
              Back To Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCoffee;
