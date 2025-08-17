import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext";
import { API_BASE } from "../api/http";
import "../styles/CartPage.css";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate(); 

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty. <Link to="/">Go shopping</Link></p>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="cart-table-container">
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={`desktop-${item.product._id}`}>
                    <td className="product-cell">
                      <div className="product-info">
                        <img 
                          src={item.product.images && item.product.images.length > 0 ? 
                            (item.product.images[0].startsWith('http') ? item.product.images[0] : `${API_BASE}${item.product.images[0]}`) 
                            : '/placeholder.png'}
                          alt={item.product.name}
                          className="product-image"
                          onError={(e) => {
                            e.target.src = '/placeholder.png';
                          }}
                        />
                        <span>{item.product.name}</span>
                      </div>
                    </td>
                    <td>₹{item.product.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.product._id, Math.max(1, Number(e.target.value)))
                        }
                        aria-label={`Quantity for ${item.product.name}`}
                      />
                    </td>
                    <td>₹{(item.product.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button 
                        onClick={() => removeFromCart(item.product._id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="cart-mobile">
            {cart.map((item) => (
              <div key={`mobile-${item.product._id}`} className="cart-item-card">
                <div className="product-header">
                  <img 
                    src={item.product.images && item.product.images.length > 0 ? 
                      (item.product.images[0].startsWith('http') ? item.product.images[0] : `${API_BASE}${item.product.images[0]}`) 
                      : '/placeholder.png'}
                    alt={item.product.name}
                    className="product-image"
                    onError={(e) => {
                      e.target.src = '/placeholder.png';
                    }}
                  />
                  <h4 className="product-title">{item.product.name}</h4>
                </div>
                <div className="cart-item-row">
                  <span className="cart-item-label">Price:</span>
                  <span className="cart-item-value">₹{item.product.price.toFixed(2)}</span>
                </div>
                <div className="cart-item-row">
                  <span className="cart-item-label">Quantity:</span>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.product._id, Math.max(1, Number(e.target.value)))
                    }
                    aria-label={`Quantity for ${item.product.name}`}
                    className="cart-item-input"
                  />
                </div>
                <div className="cart-item-row">
                  <span className="cart-item-label">Total:</span>
                  <span className="cart-item-value">₹{(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => removeFromCart(item.product._id)}
                  aria-label={`Remove ${item.product.name} from cart`}
                  className="remove-btn"
                >
                  Remove Item
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div>
              <strong>Subtotal: </strong>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="cart-actions">
              <button 
                className="btn-clear" 
                onClick={clearCart}
                aria-label="Clear shopping cart"
              >
                Clear Cart
              </button>
              <button 
                className="btn-checkout" 
                onClick={() => navigate('/checkout')}
                aria-label="Proceed to checkout"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
