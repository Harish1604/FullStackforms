import React, { useEffect, useState } from "react";
import { createCategory, getCategories } from "../services/api";
import type { CategoryResponse } from "../services/api";
import "../styles/CategoryForm.css";
const CategoryForm: React.FC = () => {
  const [form, setForm] = useState({
    categoryName: "",
    parentCategoryId: "",
    status: "active",
  });
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await getCategories();
      setCategories(res.data);
    } catch {
      console.error("Failed to fetch categories");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.categoryName.length < 3) {
      setError("Category name must be at least 3 characters");
      return;
    }
    try {
      const res = await createCategory(form);
      setSuccess(res.data.message);
      setError("");
      setForm({ categoryName: "", parentCategoryId: "", status: "active" });
      loadCategories();
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create category");
      setSuccess("");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Create Category</h2>

        {error && <div className="error-msg">{error}</div>}
        {success && <div className="success-msg">{success}</div>}

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="categoryName"
            placeholder="Category Name"
            value={form.categoryName}
            onChange={handleChange}
            required
          />

          <select
            name="parentCategoryId"
            value={form.parentCategoryId}
            onChange={handleChange}
          >
            <option value="">-- Select Parent (Optional) --</option>
            {categories.map((cat) => (
              <option key={cat.category?._id} value={cat.category?._id}>
                {cat.category?.categoryName}
              </option>
            ))}
          </select>

          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <button type="submit">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;
