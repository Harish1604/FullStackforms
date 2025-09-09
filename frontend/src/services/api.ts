import axios from "axios";

// Create axios instance
const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Expected response structure from backend
export interface SupplierResponse {
  message: string;
  supplier?: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    product: string;
    status: string;
    createdAt: string;
  };
}

// Supplier registration API call
export const supplierRegister = (data: {
  name: string;
  email: string;
  phone: string;
  password: string;
  product: string;
}) => API.post<SupplierResponse>("/auth/register", data);

export interface CategoryResponse {
  message: string;
  category?: {
    _id: string;
    categoryName: string;
    parentCategoryId?: string;
    status: string;
    createdAt: string;
  };
}

export const createCategory = (data: {
  categoryName: string;
  parentCategoryId?: string;
  status: string;
}) => API.post<CategoryResponse>("/categories", data);

export const getCategories = () => API.get<CategoryResponse[]>("/categories");
