import React, { useState } from "react";
import { supplierRegister } from "../services/api";
import type { SupplierResponse } from "../services/api";
import "../styles/SupplierRegister.css";


const SupplierRegister: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    product: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await supplierRegister(form);
      const data: SupplierResponse = res.data;
      setSuccess(data.message);
      setError("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Supplier Registration</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="product"
            placeholder="Product Supplied"
            value={form.product}
            onChange={handleChange}
            required
          />

          <button type="submit">Register</button>
        </form>

        <p className="footer-text">
          Already registered? <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
};

export default SupplierRegister;
