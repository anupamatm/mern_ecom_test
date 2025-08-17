import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../state/CartContext";
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
                <tr key={item.product._id}>
                  <td>{item.product.name}</td>
                  <td>₹{item.product.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.product._id, Number(e.target.value))
                      }
                    />
                  </td>
                  <td>₹{item.product.price * item.quantity}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.product._id)}>✕</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="cart-summary">
            <h3>Total: ₹{total}</h3>
            <button className="btn-clear" onClick={clearCart}>Clear Cart</button>
            <button className="btn-checkout" onClick={() => navigate("/checkout")}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}
