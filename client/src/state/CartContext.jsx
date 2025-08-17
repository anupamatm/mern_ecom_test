import { createContext, useContext, useReducer, useEffect } from "react";

const CartContext = createContext();

// Load cart from localStorage if available
const loadCart = () => {
  if (typeof window !== 'undefined') {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsed = JSON.parse(savedCart);
      // Ensure we always return an array, handling both old and new formats
      return Array.isArray(parsed) ? parsed : (parsed?.items || []);
    }
  }
  return [];
};

const initialState = loadCart();

function cartReducer(state = [], action) {
  const items = Array.isArray(state) ? state : [];
  
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = items.find((i) => i?.product?._id === action.payload?._id);
      if (existing) {
        return items.map((i) =>
          i?.product?._id === action.payload?._id
            ? { ...i, quantity: (i.quantity || 0) + 1 }
            : i
        ).filter(Boolean);
      }
      return [...items, { product: action.payload, quantity: 1 }].filter(Boolean);
    }

    case "REMOVE_FROM_CART":
      return items.filter((i) => i?.product?._id !== action.payload).filter(Boolean);

    case "UPDATE_QUANTITY":
      return items.map((i) =>
        i?.product?._id === action.payload?.id
          ? { ...i, quantity: Math.max(1, Number(action.payload?.quantity) || 1) }
          : i
      ).filter(Boolean);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(state));
    }
  }, [state]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  
  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };
  
  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });
  };
  
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  return (
    <CartContext.Provider
      value={{ cart: state, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
