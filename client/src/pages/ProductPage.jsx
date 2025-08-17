import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http, { API_BASE } from "../api/http";
import { useCart } from "../state/CartContext";
import { useAuth } from "../state/AuthContext";   // ✅ import auth
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
      {/* Left: Image Gallery */}
      <div className="product-images">
        <div className="main-image">
          <img src={mainImage} alt={product.name} />
        </div>
        <div className="thumbnail-row">
          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${product.name}-${i}`}
              className={img === mainImage ? "active" : ""}
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">₹{product.price}</p>
        <p className="category">Category: {product.category}</p>
        <p className="stock">
          {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
        </p>
        <p className="description">{product.description}</p>

        <button
          className="btn-add"
          onClick={handleAddToCart}
          disabled={product.stock <= 0}
        >
          {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
