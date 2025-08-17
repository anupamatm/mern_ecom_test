import { Link } from "react-router-dom";
import { API_BASE } from "../api/http";
import "../styles/ProductCard.css";

export default function ProductCard({ product }) {
  const imageUrl =
    product.images?.length > 0
      ? (product.images[0].startsWith("http")
          ? product.images[0]
          : `${API_BASE}${product.images[0]}`)
      : "/placeholder.png";

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="card-link">
        <div className="card-image">
          <img src={imageUrl} alt={product.name} />
        </div>
        <div className="card-body">
          <h3 className="card-title">{product.name}</h3>
          <p className="card-price">₹{product.price}</p>
          <p className="card-category">{product.category}</p>
        </div>
      </Link>
      {/* <div className="card-footer">
        <button className="btn-add">Add to Cart</button>
      </div> */}
    </div>
  );
}
