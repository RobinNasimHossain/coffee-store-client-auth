import React, { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const SignInForm = () => {
  const { signIn } = useContext(AuthContext);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error on input change
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password } = formData;
    const newErrors = {};

    // Validate email and password
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    signIn(email, password)
      .then((res) => {
        console.log("User signed in:", res.user);
        toast.success("Sign-in successful!");
        setFormData({ email: "", password: "" }); // Clear form
        const lastSignInTime = res?.user?.metadata?.lastSignInTime;
        const loginInfo = { email, lastSignInTime };

        fetch(`http://localhost:4500/users`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to update user info in database");
            }
            return response.json();
          })
          .then((data) => {
            console.log("Sign-in info updated in DB:", data);
          })
          .catch((error) => {
            console.error("Error updating sign-in info:", error);
          });
      })
      .catch((err) => {
        console.error("Sign-in error:", err);
        toast.error("Invalid email or password.");
        setErrors({ password: "Invalid email or password" });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-teal-500 to-green-500">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-white shadow-lg rounded-lg w-full max-w-sm p-6">
        <h2 className="text-2xl font-bold text-center text-indigo-600">
          Sign In
        </h2>
        <form className="space-y-4 mt-6" onSubmit={handleSubmit}>
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring focus:ring-indigo-200 focus:outline-none`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Sign In
          </button>
          <button className="w-full bg-indigo-500 text-white py-3 rounded-lg font-bold hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-200">
            <Link to="/signup">SignUp</Link>
          </button>
        </form>

        {/* Forgot Password Link */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Forgot your password?{" "}
          <a
            href="#"
            className="text-indigo-500 hover:underline focus:outline-none focus:ring focus:ring-indigo-200"
          >
            Reset it here
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;
