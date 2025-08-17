import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http, { API_BASE } from "../api/http";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";
import "../styles/ProductPage.css";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth(); // ✅ get logged-in user

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    http.get(`/products/${id}`).then(({ data }) => {
      const imgs = (data.images || []).map((url) =>
        url.startsWith("http") ? url : `${API_BASE}${url}`
      );
      setProduct({ ...data, images: imgs });
      setMainImage(imgs[0] || "/placeholder.png");
    });
  }, [id]);

  if (!product) return <div className="loading">Loading...</div>;

  // ✅ Handle Add to Cart
  const handleAddToCart = () => {
     console.log("product",product);
    if (!user) {
      navigate("/login"); // redirect if not logged in
      return;
    }
   
    
    addToCart(product); // add if logged in
  };

  return (
    <div className="product-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        &larr; Back to Products
      </button>
      
      <div className="product-container">
        {/* Product Gallery */}
        <div className="product-gallery">
          <div className="main-image-container">
            <img 
              src={mainImage} 
              alt={product.name} 
              className="main-image"
              onError={(e) => {
                e.target.src = '/placeholder-product.png';
              }}
            />
            {product.stock <= 0 && <div className="out-of-stock-badge">Out of Stock</div>}
          </div>
          
          <div className="thumbnail-container">
            {product.images.map((img, i) => (
              <div 
                key={i} 
                className={`thumbnail ${img === mainImage ? 'active' : ''}`}
                onClick={() => setMainImage(img)}
              >
                <img 
                  src={img} 
                  alt={`${product.name}-${i}`}
                  onError={(e) => {
                    e.target.src = '/placeholder-product.png';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-header">
            <h1>{product.name}</h1>
            <div className="product-actions">
              <button className="icon-button" title="Add to Wishlist">
                ♡
              </button>
              <button className="icon-button" title="Share">
                ↪
              </button>
            </div>
          </div>
          
          <div className="price-section">
            <span className="current-price">₹{product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          
          <div className="stock-status">
            <span className={`status-dot ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}></span>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
            {product.stock > 0 && <span className="stock-count"> ({product.stock} available)</span>}
          </div>
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            {product.brand && (
              <div className="meta-item">
                <span className="meta-label">Brand:</span>
                <span className="meta-value">{product.brand}</span>
              </div>
            )}
          </div>
          
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || 'No description available.'}</p>
          </div>
          
          <div className="product-actions-bottom">
            <div className="quantity-selector">
              <button className="qty-btn" disabled={product.quantity <= 1}>
                -
              </button>
              <span className="qty-value">1</span>
              <button className="qty-btn">+</button>
            </div>
            
            <button
              className={`add-to-cart-btn ${product.stock <= 0 ? 'disabled' : ''}`}
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              🛒
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
          
          <div className="delivery-info">
            <div className="info-item">
              <span className="info-icon">🚚</span>
              <div>
                <div className="info-title">Free Delivery</div>
                <div className="info-desc">Get it by {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}</div>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">↩️</span>
              <div>
                <div className="info-title">Easy Returns</div>
                <div className="info-desc">30 days return policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
