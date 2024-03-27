import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const LoginForm = () => {
  const { signIn } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userWithRole = await signIn(formData.email, formData.password);
      enqueueSnackbar("Successfully signed in!", { variant: "success" });

      switch (userWithRole.role) {
        case "doctor":
          navigate("/doctor");
          break;
        case "patient":
          navigate("/client");
          break;
        case "insuranceProvider":
          navigate("/provider");
          break;
      }
    } catch (error) {
      enqueueSnackbar(`Failed to sign in: ${error.message}`, {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 border border-gray-300 rounded-lg">
        <div className="mb-6 text-center">
          <div className="flex justify-center">
            <span className="text-[#747264] text-4xl">⚕</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 my-4">
            Login to view your dashboard
          </h2>
          <p className="text-gray-600">
            Need to make an account?{" "}
            <a href="/register" className="text-[#747264] hover:underline">
              Register
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            name="email"
            placeholder="Email address"
            onChange={handleChange}
            value={formData.email}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            className="w-full p-4 border rounded-lg bg-gray-50 border-gray-300 focus:ring-[#747264] focus:border-[#747264]"
            required
          />

          <button
            type="submit"
            className="w-full p-4 bg-[#747264] text-white rounded-lg hover:bg-[#3C3633]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;