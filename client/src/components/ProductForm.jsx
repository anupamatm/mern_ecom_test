import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http, { API_BASE } from "../api/http";
import { PRODUCT_CATEGORIES } from "../constants/categories";
import "../styles/ProductForm.css";

export default function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = id && id !== "new";

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    images: [], // always full URLs (string[])
  });
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  // Load existing product for edit
  useEffect(() => {
    if (isEdit) {
      http.get(`/products/${id}`)
        .then(({ data }) => {
          setForm({
            ...data,
            images: data.images || [], // already full Cloudinary URLs
          });
        })
        .catch(() => setError("Failed to load product"));
    }

    // Cleanup function to revoke any blob URLs when component unmounts
    return () => {
      form.images.forEach(image => {
        if (image && image.startsWith('blob:')) {
          URL.revokeObjectURL(image);
        }
      });
    };
  }, [isEdit, id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
  
    try {
      setUploading(true);
      
      // Upload to server first
      const formData = new FormData();
      files.forEach((f) => formData.append("images", f));
      
      const { data } = await http.post("/uploads", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      // Only update form with server URLs (no blob URLs)
      const uploadedUrls = data.urls.map((url) => 
        url.startsWith("http") ? url : `${API_BASE}${url}`
      );
      
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      
    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to upload images. Please try again.");
    } finally {
      setUploading(false);
    }
  };
  

  const handleRemoveImage = (index) => {
    // Revoke the blob URL if it's a blob URL to prevent memory leaks
    const imageToRemove = form.images[index];
    if (imageToRemove && imageToRemove.startsWith('blob:')) {
      URL.revokeObjectURL(imageToRemove);
    }
    
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        images: form.images, // send as-is (full URLs)
      };
      

      if (isEdit) {
        await http.put(`/products/${id}`, payload);
      } else {
        await http.post("/products", payload);
      }

      navigate("/admin/products");
    } catch (err) {
      setError(err.response?.data?.message || "Save failed");
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>
      {error && <div className="error">{error}</div>}

      <form className="product-form" onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Select a category</option>
          {PRODUCT_CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
        />

        <label>Upload Images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileUpload}
        />
        {uploading && <p>Uploading...</p>}

        {/* Preview section */}
        <div className="preview">
          {form.images.map((url, i) => (
            <div key={i} className="preview-item">
              <img src={url} alt="preview" />
              <button
                type="button"
                className="remove-btn"
                onClick={() => handleRemoveImage(i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}
