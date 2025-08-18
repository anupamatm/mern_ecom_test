import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/images";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const imageUrl = getImageUrl(product.images?.[0]); // ✅ safe access first image

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="card-link">
        <div className="card-image">
          <img 
            src={imageUrl} 
            alt={product.name} 
            onError={(e) => (e.target.src = "/placeholder.png")} 
          />
        </div>
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-price">₹{product.price}</p>
          <p className="card-category">{product.category}</p>
        </div>
      </Link>
    </div>
  );
}
