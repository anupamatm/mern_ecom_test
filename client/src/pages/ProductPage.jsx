import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../api/http";  // 👈 no API_BASE
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";
import "../styles/ProductPage.css";
import { getAllImageUrls } from "../utils/images";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    http.get(`/products/${id}`).then(({ data }) => {
      const imgs = getAllImageUrls(data.images); // ✅ always Cloudinary URLs
      setProduct({ ...data, images: imgs });
      setMainImage(imgs[0] || "/placeholder.png");
    });
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  return (
    <div className="product-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>

      <div className="product-container">
        {/* Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img
              src={mainImage}
              alt={product.name}
              className="main-image"
              onError={(e) => {
                e.target.src = "/placeholder.png";
              }}
            />
            {product.stock <= 0 && (
              <div className="out-of-stock-badge">Out of Stock</div>
            )}
          </div>

          <div className="thumbnail-container">
            {product.images.map((img, i) => (
              <div
                key={i}
                className={`thumbnail ${img === mainImage ? "active" : ""}`}
                onClick={() => setMainImage(img)}
              >
                <img
                  src={img}
                  alt={`${product.name}-${i}`}
                  onError={(e) => {
                    e.target.src = "/placeholder.png";
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="product-details">
          <h1>{product.name}</h1>
          <div className="price-section">
            <span className="current-price">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ₹{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className="stock-status">
            <span
              className={`status-dot ${
                product.stock > 0 ? "in-stock" : "out-of-stock"
              }`}
            ></span>
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </div>

          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || "No description available."}</p>
          </div>

          <div className="product-actions-bottom">
            <button
              className={`add-to-cart-btn ${
                product.stock <= 0 ? "disabled" : ""
              }`}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              🛒 {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
