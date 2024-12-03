import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";

const Users = () => {
  const loadedUsers = useLoaderData(); // Loaded users from backend
  const [users, setUsers] = useState(loadedUsers);

  // Function to handle user deletion
  const handleUserDelete = (id) => {
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
        // Make a DELETE request to the backend
        fetch(`http://localhost:4500/users/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete user");
            }
            return res.json();
          })
          .then((data) => {
            if (data.deletedCount > 0) {
              Swal.fire({
                title: "Deleted!",
                text: "The user has been deleted.",
                icon: "success",
              });

              // Remove the user from the UI
              const remainingUsers = users.filter((user) => user._id !== id);
              setUsers(remainingUsers);
            }
          })
          .catch((err) => {
            console.error("Error deleting user:", err);
            Swal.fire({
              title: "Error!",
              text: "Failed to delete the user. Please try again.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4">Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2">#</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Created At</th>
              <th className="border border-gray-300 px-4 py-2">Last Login</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  {index + 1}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user?.createdAt || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.lastSignInTime || "N/A"}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex gap-2">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Edit
                  </button>
                  <button
                    onClick={() => handleUserDelete(user._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
